import { Product } from './Product';

const createSut = (name: string, price: number): Product => {
  return new Product(name, price);
};

describe('Product', () => {
  afterEach(() => jest.clearAllMocks());

  it('should contain the correct properties', () => {
    const sut = createSut('Teclado HyperX', 289.9);
    expect(sut).toHaveProperty('name', 'Teclado HyperX');
    expect(sut.price).toBeCloseTo(289.9);
  });
});
