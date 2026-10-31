import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { ExpenseUserService } from '../expense-user/expense-user.service';

describe('ExpenseController', () => {
  let controller: ExpenseController;
  let mockExpenseService: any;
  let mockExpenseUserService: any;

  beforeEach(async () => {
    mockExpenseService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    mockExpenseUserService = {
      createExpenseUsers: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        {
          provide: ExpenseService,
          useValue: mockExpenseService,
        },
        {
          provide: ExpenseUserService,
          useValue: mockExpenseUserService,
        },
      ],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return all expenses', async () => {
    mockExpenseService.findAll.mockResolvedValue([]);
    expect(await controller.findAll()).toEqual([]);
  });

  it('create should create expense and link shared users', async () => {
    const dto = {
      title: 'Dinner',
      date: '2026-10-31',
      cost: 40,
      originalCost: 40,
      paidBy: 'user-1',
      typeId: 'food',
      sharedBy: ['user-1', 'user-2'],
    };
    const created = { id: 'exp-1', ...dto };
    mockExpenseService.create.mockResolvedValue(created);
    mockExpenseService.findOne.mockResolvedValue(created);
    mockExpenseUserService.createExpenseUsers.mockResolvedValue([]);

    const result = await controller.create(dto);
    expect(result).toEqual(created);
    expect(mockExpenseUserService.createExpenseUsers).toHaveBeenCalledWith(
      'exp-1',
      ['user-1', 'user-2'],
    );
  });

  it('delete should call expenseService.delete', async () => {
    mockExpenseService.delete.mockResolvedValue(undefined);
    await controller.delete('exp-1');
    expect(mockExpenseService.delete).toHaveBeenCalledWith('exp-1');
  });
});
