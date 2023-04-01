/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './expenses/expense.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expenses/expense.entity';
import { Connection } from 'typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ExpenseUserModule } from './expense-user/expense-user.module';
import { DebtsModule } from './debts/debts.module';

@Module({
  imports: [
    ExpenseModule,
    UserModule,
    ExpenseUserModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "splitty",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([Expense, User]),
    DebtsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
  async onModuleInit() {
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      console.log('Connected to the database successfully.');
      await queryRunner.release();
    } catch (error) {
      console.log('Failed to connect to the database:', error);
    }
  }
}
