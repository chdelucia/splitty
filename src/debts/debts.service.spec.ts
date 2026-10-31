import { Test, TestingModule } from '@nestjs/testing';
import { DebtsService } from './debts.service';

describe('DebtsService', () => {
  let service: DebtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebtsService],
    }).compile();

    service = module.get<DebtsService>(DebtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create returns created debt info', () => {
    const dto = { amount: 50, creditorId: 'u-1', debtorId: 'u-2' };
    const res = service.create(dto);
    expect(res).toEqual({
      message: 'This action adds a new debt',
      debt: dto,
    });
  });

  it('findAll returns message', () => {
    expect(service.findAll()).toBe('This action returns all debts');
  });

  it('findOne returns formatted message', () => {
    expect(service.findOne(5)).toBe('This action returns a #5 debt');
  });

  it('update returns updated payload', () => {
    const updateDto = { amount: 100 };
    expect(service.update(5, updateDto)).toEqual({
      message: 'This action updates a #5 debt',
      update: updateDto,
    });
  });

  it('remove returns removal message', () => {
    expect(service.remove(5)).toBe('This action removes a #5 debt');
  });
});
