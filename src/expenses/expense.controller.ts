import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseUserService } from '../expense-user/expense-user.service';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/create-expense.dto';

@ApiTags('expenses')
@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly expenseUserService: ExpenseUserService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all expenses' })
  @ApiResponse({
    status: 200,
    description: 'Return all expenses',
    type: [Expense],
  })
  async findAll(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an expense by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return expense details',
    type: Expense,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Expense> {
    return this.expenseService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiResponse({
    status: 201,
    description: 'The expense has been successfully created',
    type: Expense,
  })
  async create(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const createdExpense = await this.expenseService.create(createExpenseDto);
    if (createExpenseDto.sharedBy && createExpenseDto.sharedBy.length > 0) {
      await this.expenseUserService.createExpenseUsers(
        createdExpense.id,
        createExpenseDto.sharedBy,
      );
    }
    return this.expenseService.findOne(createdExpense.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing expense' })
  @ApiResponse({
    status: 200,
    description: 'The expense has been successfully updated',
    type: Expense,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    const updated = await this.expenseService.update(id, updateExpenseDto);
    if (updateExpenseDto.sharedBy && updateExpenseDto.sharedBy.length > 0) {
      await this.expenseUserService.createExpenseUsers(
        id,
        updateExpenseDto.sharedBy,
      );
    }
    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an expense' })
  @ApiResponse({
    status: 204,
    description: 'The expense has been successfully deleted',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.expenseService.delete(id);
  }
}
