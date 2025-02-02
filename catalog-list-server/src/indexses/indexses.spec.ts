import { Test, TestingModule } from '@nestjs/testing';
import { IndexingService } from './indexses.service';
import { getModelToken } from '@nestjs/mongoose';
import { Catalog } from '../catalog/catalog.schema';
import { Model } from 'mongoose';

describe('IndexingService', () => {
  let service: IndexingService;
  let model: Model<Catalog>;

  const mockCatalogModel = {
    find: jest.fn(),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(true),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndexingService,
        {
          provide: getModelToken(Catalog.name),
          useValue: mockCatalogModel,
        },
      ],
    }).compile();

    service = module.get<IndexingService>(IndexingService);
    model = module.get<Model<Catalog>>(getModelToken(Catalog.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('startIndexing', () => {
    it('should update the status of each catalog', async () => {
      const mockCatalogs = [
        { _id: '1', indexedAt: null, save: jest.fn() },
      ];

      (model.find as jest.Mock).mockResolvedValue(mockCatalogs);

      await service.startIndexing();

      expect(model.find).toHaveBeenCalled();
      expect(mockCatalogs[0].save).toHaveBeenCalled();
      expect(model.findByIdAndUpdate).toHaveBeenCalledTimes(2);
    });

    it('should handle errors during indexing', async () => {
      const mockCatalogs = [
        { _id: '1', indexedAt: null, save: jest.fn() },
      ];

      (model.find as jest.Mock).mockResolvedValue(mockCatalogs);
      mockCatalogs[0].save.mockRejectedValue(new Error('Save failed'));

      await service.startIndexing();

      expect(model.findByIdAndUpdate).toHaveBeenCalledTimes(2);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockCatalogs[0]._id.toString(),
        expect.objectContaining({ 
          indexingStatus: 'failed', 
          errorDetails: expect.stringContaining('Save failed')
        }),
      );
    });
  });
});
