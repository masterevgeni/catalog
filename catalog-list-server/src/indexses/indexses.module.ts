import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Catalog, CatalogSchema } from '../catalog/catalog.schema';
import { IndexingService } from './indexses.service';
import { IndexingController } from './indexses.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }])],
  controllers: [IndexingController],
  providers: [IndexingService],
})
export class IndexingModule {}