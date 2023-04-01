import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async findAll(): Promise<Expense[]> {
    return await this.expenseRepository.find();
  }

  async findOne(id: string): Promise<Expense> {
    return await this.expenseRepository.findOne({ where: { id: id } });
  }

  async create(expense: Expense): Promise<Expense> {
    return await this.expenseRepository.save(expense);
  }

  async update(id: string, expense: Expense): Promise<Expense> {
    await this.expenseRepository.update(id, expense);
    return await this.expenseRepository.findOne({ where: { id: id } });
  }

  async delete(id: string): Promise<void> {
    await this.expenseRepository.delete(id);
  }
}
