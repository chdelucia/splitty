import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserService', () => {
  let service: UserService;
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
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Alice',
          phone: '123456789',
        },
      ];
      mockRepository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user if found', async () => {
      const user: User = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Alice',
        phone: '123456789',
      };
      mockRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne(user.id);
      expect(result).toEqual(user);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const dto = { name: 'Bob', phone: '987654321' };
      const createdUser: User = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        ...dto,
      };

      mockRepository.create.mockReturnValue(createdUser);
      mockRepository.save.mockResolvedValue(createdUser);

      const result = await service.create(dto);
      expect(result).toEqual(createdUser);
      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(createdUser);
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      const existingUser: User = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Alice',
        phone: '123456789',
      };
      const updateDto = { name: 'Alice Updated' };
      const updatedUser = { ...existingUser, ...updateDto };

      mockRepository.findOne.mockResolvedValue(existingUser);
      mockRepository.save.mockResolvedValue(updatedUser);

      const result = await service.update(existingUser.id, updateDto);
      expect(result.name).toEqual('Alice Updated');
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a user when found', async () => {
      const existingUser: User = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Alice',
        phone: '123456789',
      };
      mockRepository.findOne.mockResolvedValue(existingUser);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.delete(existingUser.id);
      expect(mockRepository.delete).toHaveBeenCalledWith(existingUser.id);
    });
  });
});
