import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseUser } from './expense-user.entity';
import {
  CreateExpenseUserDto,
  UpdateExpenseUserDto,
} from './dto/create-expense-user.dto';

@Injectable()
export class ExpenseUserService {
  constructor(
    @InjectRepository(ExpenseUser)
    private readonly expenseUserRepository: Repository<ExpenseUser>,
  ) {}

  async findAll(): Promise<ExpenseUser[]> {
    return this.expenseUserRepository.find({ relations: ['expense', 'user'] });
  }

  async findOne(id: string): Promise<ExpenseUser> {
    const expenseUser = await this.expenseUserRepository.findOne({
      where: { id },
      relations: ['expense', 'user'],
    });
    if (!expenseUser) {
      throw new NotFoundException(`ExpenseUser with ID "${id}" not found`);
    }
    return expenseUser;
  }

  async create(
    createExpenseUserDto: CreateExpenseUserDto,
  ): Promise<ExpenseUser> {
    const expenseUser = this.expenseUserRepository.create(createExpenseUserDto);
    return this.expenseUserRepository.save(expenseUser);
  }

  async createExpenseUsers(
    expenseId: string,
    sharedBy: string[],
  ): Promise<ExpenseUser[]> {
    const expenseUsers = sharedBy.map((userId) =>
      this.expenseUserRepository.create({ expenseId, userId }),
    );
    return this.expenseUserRepository.save(expenseUsers);
  }

  async update(
    id: string,
    updateExpenseUserDto: UpdateExpenseUserDto,
  ): Promise<ExpenseUser> {
    const expenseUser = await this.findOne(id);
    Object.assign(expenseUser, updateExpenseUserDto);
    return this.expenseUserRepository.save(expenseUser);
  }

  async delete(id: string): Promise<void> {
    const expenseUser = await this.findOne(id);
    await this.expenseUserRepository.delete(expenseUser.id);
  }
}
