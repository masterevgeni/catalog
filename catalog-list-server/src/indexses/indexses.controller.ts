import { Controller, Post, Get } from '@nestjs/common';
import { IndexingService } from './indexses.service';

@Controller('indexing')
export class IndexingController {
  constructor(private readonly indexingService: IndexingService) {}

  @Post('start')
  startIndexing() {
    return this.indexingService.startIndexing();
  }

  @Get('status')
  getIndexingStatus() {
    // Logic to retrieve indexing status for all catalogs
  }
}