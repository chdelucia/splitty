import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseUserController } from './expense-user.controller';
import { ExpenseUserService } from './expense-user.service';

describe('ExpenseUserController', () => {
  let controller: ExpenseUserController;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseUserController],
      providers: [
        {
          provide: ExpenseUserService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ExpenseUserController>(ExpenseUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return array', async () => {
    mockService.findAll.mockResolvedValue([]);
    expect(await controller.findAll()).toEqual([]);
  });

  it('findOne should return item', async () => {
    const item = { id: 'eu-1', expenseId: 'e-1', userId: 'u-1' };
    mockService.findOne.mockResolvedValue(item);
    expect(await controller.findOne('eu-1')).toEqual(item);
  });
});
