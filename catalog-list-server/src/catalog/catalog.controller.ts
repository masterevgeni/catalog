import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { Catalog } from './catalog.schema';

@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) { }

  @Get()
  async findAll(): Promise<Catalog[]> {
    try {
      return await this.catalogService.findAll();
    }
    catch (error) {
      throw new BadRequestException(error?.errorResponse?.errmsg)
    }
  }

  @Post()
  async create(@Body() catalog: Catalog): Promise<Catalog> {
    try {
      return await this.catalogService.create(catalog);
    }
    catch (error) {
      throw new BadRequestException(error?.errorResponse?.errmsg)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() catalog: Partial<Catalog>): Promise<Catalog> {
    try {
      return this.catalogService.update(id, catalog);
    }
    catch (error) {
      throw new BadRequestException(error?.errorResponse?.errmsg)
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Catalog> {
    try {
      return await this.catalogService.delete(id);
    }
    catch (error) {
      throw new BadRequestException(error?.errorResponse?.errmsg)
    }
  }

  @Delete()
  async deleteMany(@Body() ids: string[]): Promise<void> {
    return await this.catalogService.deleteMany(ids);
  }
}