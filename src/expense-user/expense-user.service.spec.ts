import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ExpenseUserService } from './expense-user.service';
import { ExpenseUser } from './expense-user.entity';

describe('ExpenseUserService', () => {
  let service: ExpenseUserService;
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
        ExpenseUserService,
        {
          provide: getRepositoryToken(ExpenseUser),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ExpenseUserService>(ExpenseUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return array of expense users', async () => {
    const list = [{ id: 'eu-1', expenseId: 'e-1', userId: 'u-1' }];
    mockRepository.find.mockResolvedValue(list);

    expect(await service.findAll()).toEqual(list);
    expect(mockRepository.find).toHaveBeenCalledWith({
      relations: ['expense', 'user'],
    });
  });

  it('findOne should return expenseUser if found', async () => {
    const item = { id: 'eu-1', expenseId: 'e-1', userId: 'u-1' };
    mockRepository.findOne.mockResolvedValue(item);

    expect(await service.findOne('eu-1')).toEqual(item);
  });

  it('findOne should throw NotFoundException if not found', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne('eu-missing')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('createExpenseUsers should save all user associations', async () => {
    const sharedBy = ['u-1', 'u-2'];
    mockRepository.create.mockImplementation((dto) => dto);
    mockRepository.save.mockImplementation((entities) =>
      Promise.resolve(entities),
    );

    const result = await service.createExpenseUsers('e-1', sharedBy);
    expect(result).toHaveLength(2);
    expect(mockRepository.save).toHaveBeenCalled();
  });
});
