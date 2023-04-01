import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseUserController } from './expense-user.controller';

describe('ExpenseUserController', () => {
  let controller: ExpenseUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseUserController],
    }).compile();

    controller = module.get<ExpenseUserController>(ExpenseUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
