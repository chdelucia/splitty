import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: any;

  beforeEach(async () => {
    mockUserService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return array of users', async () => {
    const users = [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Alice',
        phone: '123456789',
      },
    ];
    mockUserService.findAll.mockResolvedValue(users);

    expect(await controller.findAll()).toEqual(users);
  });

  it('findOne should return a user by id', async () => {
    const user = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Alice',
      phone: '123456789',
    };
    mockUserService.findOne.mockResolvedValue(user);

    expect(await controller.findOne(user.id)).toEqual(user);
    expect(mockUserService.findOne).toHaveBeenCalledWith(user.id);
  });

  it('create should call service create', async () => {
    const dto = { name: 'Bob', phone: '987654321' };
    const createdUser = { id: '123e4567-e89b-12d3-a456-426614174001', ...dto };
    mockUserService.create.mockResolvedValue(createdUser);

    expect(await controller.create(dto)).toEqual(createdUser);
    expect(mockUserService.create).toHaveBeenCalledWith(dto);
  });

  it('update should call service update', async () => {
    const dto = { name: 'Bob Updated' };
    const updatedUser = {
      id: '123e4567-e89b-12d3-a456-426614174001',
      name: 'Bob Updated',
      phone: '987654321',
    };
    mockUserService.update.mockResolvedValue(updatedUser);

    expect(
      await controller.update('123e4567-e89b-12d3-a456-426614174001', dto),
    ).toEqual(updatedUser);
  });

  it('delete should call service delete', async () => {
    mockUserService.delete.mockResolvedValue(undefined);

    await controller.delete('123e4567-e89b-12d3-a456-426614174001');
    expect(mockUserService.delete).toHaveBeenCalledWith(
      '123e4567-e89b-12d3-a456-426614174001',
    );
  });
});
