import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseResolver } from './expense.resolver';
import { ExpenseService } from './expense.service';
import { ExpenseUserService } from '../expense-user/expense-user.service';

describe('ExpenseResolver', () => {
  let resolver: ExpenseResolver;
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
      providers: [
        ExpenseResolver,
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

    resolver = module.get<ExpenseResolver>(ExpenseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('expenses should return array', async () => {
    mockExpenseService.findAll.mockResolvedValue([]);
    expect(await resolver.expenses()).toEqual([]);
  });
});
