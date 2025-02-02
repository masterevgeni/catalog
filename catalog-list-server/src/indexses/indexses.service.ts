import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from '../catalog/catalog.schema';
import * as cron from 'node-cron';

@Injectable()
export class IndexingService {
  constructor(@InjectModel(Catalog.name) private catalogModel: Model<CatalogDocument>) {
    this.scheduleIndexing();
  }

  async startIndexing(): Promise<void> {
    const catalogs = await this.catalogModel.find();
    
    await Promise.all(
      catalogs.map(async (catalog) => {
        await this.updateCatalogStatus(catalog._id.toString(), 'running');
        try {
          await this.indexCatalog(catalog);
          await this.updateCatalogStatus(catalog._id.toString(), 'completed');
        } catch (error) {
          console.error(`Error indexing catalog ${catalog._id}:`, error);
          await this.updateCatalogStatus(catalog._id.toString(), 'failed', error.message);
        }
      })
    );
  }

  private async indexCatalog(catalog: CatalogDocument): Promise<void> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      catalog.indexedAt = new Date();
      await catalog.save();
    } catch (error) {
      throw new Error(`Indexing failed for catalog ${catalog._id}: ${error.message}`);
    }
  }

  private async updateCatalogStatus(id: string, status: string, errorDetails?: string): Promise<void> {
    await this.catalogModel.findByIdAndUpdate(id, {
      indexingStatus: status,
      errorDetails: errorDetails || null,
      scheduledAt: new Date(),
      completedAt: status === 'completed' ? new Date() : null,
    }).exec();
  }

  private scheduleIndexing() {
    cron.schedule('0 1 * * *', async () => {
      console.log('Starting scheduled index process');
      await this.startIndexing();
    });
  }
}
