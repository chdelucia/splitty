import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
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
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('users query should return users', async () => {
    mockUserService.findAll.mockResolvedValue([]);
    const res = await resolver.users();
    expect(res).toEqual([]);
  });

  it('user query should return a user', async () => {
    const user = { id: 'uuid-1', name: 'John', phone: '123' };
    mockUserService.findOne.mockResolvedValue(user);
    expect(await resolver.user('uuid-1')).toEqual(user);
  });
});
