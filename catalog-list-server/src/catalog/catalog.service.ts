import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from './catalog.schema';

@Injectable()
export class CatalogService {
  constructor(@InjectModel(Catalog.name) private catalogModel: Model<CatalogDocument>) { }

  async findAll(): Promise<Catalog[]> {
    return this.catalogModel.find().exec();
  }

  async create(catalog: Catalog): Promise<Catalog> {
    const existingPrimary = await this.catalogModel.findOne({ vertical: catalog.vertical, primary: true });
    if (existingPrimary) {
      existingPrimary.primary = false;
      await existingPrimary.save();
    }
    return new this.catalogModel(catalog).save();
  }

  async update(id: string, catalog: Partial<Catalog>): Promise<Catalog> {
    return this.catalogModel.findByIdAndUpdate(id, catalog, { new: true }).exec();
  }

  async delete(id: string): Promise<Catalog> {
    return this.catalogModel.findByIdAndDelete(id).exec();
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.catalogModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}