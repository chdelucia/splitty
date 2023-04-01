import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ExpenseUser } from 'src/expense-user/expense-user.entity';
import { ExpenseUserService } from 'src/expense-user/expense-user.service';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';

@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly expenseUserService: ExpenseUserService,
  ) {}

  @Get()
  async findAll(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Expense> {
    return this.expenseService.findOne(id);
  }

  @Post()
  async create(@Body() expense: Expense): Promise<Expense> {
    const createdExpense = await this.expenseService.create(expense);
    await this.expenseUserService.createExpenseUsers(
      expense.id,
      expense.sharedBy,
    );

    return createdExpense;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() expense: Expense,
  ): Promise<Expense> {
    return this.expenseService.update(id, expense);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.expenseService.delete(id);
  }
}
