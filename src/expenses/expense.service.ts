import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async findAll(): Promise<Expense[]> {
    return this.expenseRepository.find({ relations: ['expenseUsers'] });
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({
      where: { id },
      relations: ['expenseUsers'],
    });
    if (!expense) {
      throw new NotFoundException(`Expense with ID "${id}" not found`);
    }
    return expense;
  }

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const expense = this.expenseRepository.create({
      title: createExpenseDto.title,
      date: createExpenseDto.date,
      cost: createExpenseDto.cost,
      originalCost: createExpenseDto.originalCost,
      paidBy: createExpenseDto.paidBy,
      typeId: createExpenseDto.typeId,
    });
    return this.expenseRepository.save(expense);
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    const expense = await this.findOne(id);
    if (updateExpenseDto.title !== undefined) {
      expense.title = updateExpenseDto.title;
    }
    if (updateExpenseDto.date !== undefined) {
      expense.date = updateExpenseDto.date;
    }
    if (updateExpenseDto.cost !== undefined) {
      expense.cost = updateExpenseDto.cost;
    }
    if (updateExpenseDto.originalCost !== undefined) {
      expense.originalCost = updateExpenseDto.originalCost;
    }
    if (updateExpenseDto.paidBy !== undefined) {
      expense.paidBy = updateExpenseDto.paidBy;
    }
    if (updateExpenseDto.typeId !== undefined) {
      expense.typeId = updateExpenseDto.typeId;
    }
    return this.expenseRepository.save(expense);
  }

  async delete(id: string): Promise<void> {
    const expense = await this.findOne(id);
    await this.expenseRepository.delete(expense.id);
  }
}
