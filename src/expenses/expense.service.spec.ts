import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from './expense.entity';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        {
          provide: getRepositoryToken(Expense),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all expenses with relations', async () => {
      const expenses = [{ id: 'exp-1', title: 'Lunch', cost: 15 }];
      mockRepository.find.mockResolvedValue(expenses);

      const result = await service.findAll();
      expect(result).toEqual(expenses);
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['expenseUsers'],
      });
    });
  });

  describe('findOne', () => {
    it('should return expense by ID if found', async () => {
      const expense = { id: 'exp-1', title: 'Lunch', cost: 15 };
      mockRepository.findOne.mockResolvedValue(expense);

      const result = await service.findOne('exp-1');
      expect(result).toEqual(expense);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'exp-1' },
        relations: ['expenseUsers'],
      });
    });

    it('should throw NotFoundException if expense is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('exp-unknown')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create and save an expense', async () => {
      const dto = {
        title: 'Dinner',
        date: '2026-10-31',
        cost: 40,
        originalCost: 40,
        paidBy: 'user-1',
        typeId: 'food',
        sharedBy: ['user-1', 'user-2'],
      };
      const created = { id: 'exp-2', ...dto };
      mockRepository.create.mockReturnValue(created);
      mockRepository.save.mockResolvedValue(created);

      const result = await service.create(dto);
      expect(result).toEqual(created);
    });
  });

  describe('update', () => {
    it('should update and save the expense', async () => {
      const existing = { id: 'exp-1', title: 'Lunch', cost: 15 };
      const dto = { title: 'Lunch Deluxe', cost: 20 };
      const updated = { ...existing, ...dto };

      mockRepository.findOne.mockResolvedValue(existing);
      mockRepository.save.mockResolvedValue(updated);

      const result = await service.update('exp-1', dto);
      expect(result.title).toBe('Lunch Deluxe');
    });
  });

  describe('delete', () => {
    it('should delete expense when found', async () => {
      const existing = { id: 'exp-1', title: 'Lunch', cost: 15 };
      mockRepository.findOne.mockResolvedValue(existing);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.delete('exp-1');
      expect(mockRepository.delete).toHaveBeenCalledWith('exp-1');
    });
  });
});
