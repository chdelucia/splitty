import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseUserResolver } from './expense-user.resolver';
import { ExpenseUserService } from './expense-user.service';
import { UserService } from '../user/user.service';

describe('ExpenseUserResolver', () => {
  let resolver: ExpenseUserResolver;
  let mockExpenseUserService: any;
  let mockUserService: any;

  beforeEach(async () => {
    mockExpenseUserService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    mockUserService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseUserResolver,
        {
          provide: ExpenseUserService,
          useValue: mockExpenseUserService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<ExpenseUserResolver>(ExpenseUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('expensesUsers should return list', async () => {
    mockExpenseUserService.findAll.mockResolvedValue([]);
    expect(await resolver.expensesUsers()).toEqual([]);
  });

  it('participant should resolve user', async () => {
    const user = { id: 'u-1', name: 'User 1', phone: '123' };
    mockUserService.findOne.mockResolvedValue(user);

    const expenseUser = { id: 'eu-1', expenseId: 'e-1', userId: 'u-1' } as any;
    expect(await resolver.participant(expenseUser)).toEqual(user);
    expect(mockUserService.findOne).toHaveBeenCalledWith('u-1');
  });
});
