import { Test, TestingModule } from '@nestjs/testing';
import { DebtsController } from './debts.controller';
import { DebtsService } from './debts.service';

describe('DebtsController', () => {
  let controller: DebtsController;
  let service: DebtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebtsController],
      providers: [DebtsService],
    }).compile();

    controller = module.get<DebtsController>(DebtsController);
    service = module.get<DebtsService>(DebtsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should call service.create', () => {
    const dto = { amount: 10, creditorId: 'u-1', debtorId: 'u-2' };
    expect(controller.create(dto)).toEqual(service.create(dto));
  });

  it('findAll should return message', () => {
    expect(controller.findAll()).toBe('This action returns all debts');
  });

  it('findOne should return debt info', () => {
    expect(controller.findOne(1)).toBe('This action returns a #1 debt');
  });

  it('update should update debt', () => {
    const dto = { amount: 20 };
    expect(controller.update(1, dto)).toEqual(service.update(1, dto));
  });

  it('remove should delete debt', () => {
    expect(controller.remove(1)).toBe('This action removes a #1 debt');
  });
});
