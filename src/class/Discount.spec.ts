import {
  Discount,
  NoDiscount,
  FiftyPercentDiscount,
  TenPercentDiscount,
} from './Discount';

const createSut = (className: new () => Discount): Discount => {
  return new className();
};

describe('Discount', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have no discount', () => {
    const sut = createSut(NoDiscount);
    expect(sut.calculate(10.99)).toBe(10.99);
  });

  it('should aplly 50% discount on price', () => {
    const sut = createSut(FiftyPercentDiscount);
    expect(sut.calculate(150)).toBeCloseTo(75);
  });

  it('should aplly 10% discount on price', () => {
    const sut = createSut(TenPercentDiscount);
    expect(sut.calculate(150)).toBeCloseTo(135);
  });
});
