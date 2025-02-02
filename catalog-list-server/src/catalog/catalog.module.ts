import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Catalog, CatalogSchema } from './catalog.schema';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }])],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}