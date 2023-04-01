import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseUser } from './expense-user.entity';

@Injectable()
export class ExpenseUserService {
  constructor(
    @InjectRepository(ExpenseUser)
    private expenseUserRepository: Repository<ExpenseUser>,
  ) {}

  async findAll(): Promise<ExpenseUser[]> {
    return this.expenseUserRepository.find();
  }

  async create(data: ExpenseUser): Promise<ExpenseUser> {
    const expenseUser = this.expenseUserRepository.create(data);
    return this.expenseUserRepository.save(expenseUser);
  }

  async createExpenseUsers(expenseId: string, sharedBy: string[]) {
    const expenseUserPromises = sharedBy.map(async (user) => {
      const expenseUser = new ExpenseUser();
      expenseUser.expenseId = expenseId;
      expenseUser.userId = user;
      const data = this.expenseUserRepository.create(expenseUser);
      return this.expenseUserRepository.save(data);
    });
    await Promise.all(expenseUserPromises);
    return expenseUserPromises;
  }

  async findOne(id: number): Promise<ExpenseUser> {
    return this.expenseUserRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data): Promise<ExpenseUser> {
    await this.expenseUserRepository.update(id, data);
    return this.expenseUserRepository.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.expenseUserRepository.delete(id);
  }
}
