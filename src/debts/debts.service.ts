import { Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';

@Injectable()
export class DebtsService {
  create(createDebtDto: CreateDebtDto) {
    return {
      message: 'This action adds a new debt',
      debt: createDebtDto,
    };
  }

  findAll() {
    return `This action returns all debts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debt`;
  }

  update(id: number, updateDebtDto: UpdateDebtDto) {
    return {
      message: `This action updates a #${id} debt`,
      update: updateDebtDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} debt`;
  }
}
