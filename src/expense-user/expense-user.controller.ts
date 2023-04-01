import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ExpenseUserService } from './expense-user.service';

@Controller('expense-user')
export class ExpenseUserController {
  constructor(private readonly expenseUserService: ExpenseUserService) {}

  @Get()
  findAll(): Promise<any[]> {
    return this.expenseUserService.findAll();
  }

  @Post()
  create(@Body() data): Promise<any> {
    return this.expenseUserService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<any> {
    return this.expenseUserService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data): Promise<any> {
    return this.expenseUserService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.expenseUserService.delete(id);
  }
}
