import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';
import { ExpenseResolver } from './expense.resolver';
import { ExpenseController } from './expense.controller';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { ExpenseUserModule } from 'src/expense-user/expense-user.module';
import { ExpenseUser } from 'src/expense-user/expense-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense, User, ExpenseUser]),
    UserModule,
    ExpenseUserModule,
  ],
  providers: [ExpenseService, ExpenseResolver],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
