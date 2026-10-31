import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseUserService } from './expense-user.service';
import { ExpenseUser } from './expense-user.entity';
import {
  CreateExpenseUserDto,
  UpdateExpenseUserDto,
} from './dto/create-expense-user.dto';

@ApiTags('expense-user')
@Controller('expense-user')
export class ExpenseUserController {
  constructor(private readonly expenseUserService: ExpenseUserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all expense-user relations' })
  @ApiResponse({
    status: 200,
    description: 'Return all expense users',
    type: [ExpenseUser],
  })
  findAll(): Promise<ExpenseUser[]> {
    return this.expenseUserService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create an expense-user relation' })
  @ApiResponse({
    status: 201,
    description: 'Created expense user',
    type: ExpenseUser,
  })
  create(
    @Body() createExpenseUserDto: CreateExpenseUserDto,
  ): Promise<ExpenseUser> {
    return this.expenseUserService.create(createExpenseUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an expense-user relation by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return expense user',
    type: ExpenseUser,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ExpenseUser> {
    return this.expenseUserService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an expense-user relation' })
  @ApiResponse({
    status: 200,
    description: 'Updated expense user',
    type: ExpenseUser,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateExpenseUserDto: UpdateExpenseUserDto,
  ): Promise<ExpenseUser> {
    return this.expenseUserService.update(id, updateExpenseUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an expense-user relation' })
  @ApiResponse({ status: 204, description: 'Deleted expense user' })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.expenseUserService.delete(id);
  }
}
