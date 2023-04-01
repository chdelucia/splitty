import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseUserResolver } from './expense-user.resolver';

describe('ExpenseUserResolver', () => {
  let resolver: ExpenseUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseUserResolver],
    }).compile();

    resolver = module.get<ExpenseUserResolver>(ExpenseUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
