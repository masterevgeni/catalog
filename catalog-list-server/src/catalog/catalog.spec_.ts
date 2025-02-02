import { Test, TestingModule } from '@nestjs/testing';
import { CatalogService } from './catalog.service';
import { getModelToken } from '@nestjs/mongoose';
import { Catalog, CatalogDocument } from './catalog.schema';
import { Model, Types } from 'mongoose';

describe('CatalogService', () => {
  let service: CatalogService;
  let model: Model<CatalogDocument>;

  const mockCatalogModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    deleteMany: jest.fn(),
    constructor: jest.fn().mockImplementation((catalog) => ({
      ...catalog,
      save: jest.fn().mockResolvedValue(catalog),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogService,
        {
          provide: getModelToken(Catalog.name),
          useValue: mockCatalogModel,
        },
      ],
    }).compile();

    service = module.get<CatalogService>(CatalogService);
    model = module.get<Model<CatalogDocument>>(getModelToken(Catalog.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new catalog', async () => {
      const newCatalog = {
        _id: new Types.ObjectId(),
        name: 'Test_Catalog',
        vertical: 'fashion',
        primary: false,
        indexedAt: new Date(),
        indexingStatus: 'not_started',
        scheduledAt: new Date(),
        completedAt: new Date(),
        errorDetails: null,
      };

      (model.findOne as jest.Mock).mockResolvedValue(null);
      (model.create as jest.Mock).mockResolvedValue(newCatalog); 

      const result = await service.create(newCatalog);

      expect(model.findOne).toHaveBeenCalledWith({ name: newCatalog.name, vertical: newCatalog.vertical, primary: true });
      expect(model.create).toHaveBeenCalledWith(newCatalog);
      expect(result).toEqual(newCatalog);
    });

    it('should update existing primary catalog to non-primary', async () => {
      const existingPrimaryCatalog = {
        _id: new Types.ObjectId(),
        name: 'Test_Catalog',
        vertical: 'fashion',
        primary: true,
      };

      const newCatalog = {
        _id: new Types.ObjectId(),
        name: 'Test_Catalog',
        vertical: 'fashion',
        primary: false,
      };

      (model.findOne as jest.Mock).mockResolvedValue(existingPrimaryCatalog);
      (model.create as jest.Mock).mockResolvedValue(newCatalog); 

      const result = await service.create(newCatalog);

      expect(model.findOne).toHaveBeenCalledWith({ name: newCatalog.name, vertical: newCatalog.vertical, primary: true });
      expect(existingPrimaryCatalog.primary).toBe(false);
      expect(model.create).toHaveBeenCalledWith(newCatalog);
      expect(result).toEqual(newCatalog);
    });
  });

  describe('findAll', () => {
    it('should return an array of catalogs', async () => {
      const mockCatalogs = [{ name: 'cccp' }];
      (model.find as jest.Mock).mockResolvedValue(mockCatalogs);

      const result = await service.findAll();

      expect (model.find).toHaveBeenCalled();
      expect(result).toEqual(mockCatalogs);
    });
  });

  describe('update', () => {
    it('should update a catalog', async () => {
      const updatedCatalog = { _id: new Types.ObjectId(), name: 'Updated_Catalog' };
      (model.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedCatalog);

      const result = await service.update(updatedCatalog._id.toString(), updatedCatalog);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(updatedCatalog._id, updatedCatalog, { new: true });
      expect(result).toEqual(updatedCatalog);
    });
  });

  describe('remove', () => {
    it('should remove a catalog', async () => {
      const catalogId = new Types.ObjectId();
      (model.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: catalogId });

      const result = await service.delete(catalogId.toString());

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(catalogId);
      expect(result).toEqual({ _id: catalogId });
    });
  });
});