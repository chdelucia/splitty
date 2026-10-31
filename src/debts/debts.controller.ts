import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DebtsService } from './debts.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';

@ApiTags('debts')
@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new debt' })
  @ApiResponse({ status: 201, description: 'Created debt' })
  create(@Body() createDebtDto: CreateDebtDto) {
    return this.debtsService.create(createDebtDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all debts' })
  @ApiResponse({ status: 200, description: 'Return all debts' })
  findAll() {
    return this.debtsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get debt by ID' })
  @ApiResponse({ status: 200, description: 'Return debt details' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.debtsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update debt' })
  @ApiResponse({ status: 200, description: 'Updated debt' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDebtDto: UpdateDebtDto,
  ) {
    return this.debtsService.update(id, updateDebtDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete debt' })
  @ApiResponse({ status: 200, description: 'Deleted debt' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.debtsService.remove(id);
  }
}
