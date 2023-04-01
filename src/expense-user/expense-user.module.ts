import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ExpenseUserController } from './expense-user.controller';
import { ExpenseUser } from './expense-user.entity';
import { ExpenseUserResolver } from './expense-user.resolver';
import { ExpenseUserService } from './expense-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseUser]), UserModule],
  controllers: [ExpenseUserController],
  providers: [ExpenseUserResolver, ExpenseUserService],
  exports: [ExpenseUserService],
})
export class ExpenseUserModule {}
