import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseUserService } from './expense-user.service';

describe('ExpenseUserService', () => {
  let service: ExpenseUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseUserService],
    }).compile();

    service = module.get<ExpenseUserService>(ExpenseUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
