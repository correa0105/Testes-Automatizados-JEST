/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageProcol } from '../services/interfacesAndTypes/message-protocol';
import { PersistProcol } from '../services/interfacesAndTypes/persist-protocol';
import { CartItem } from './intefacesAndTypes/cart-item';
import { CustomerOrder } from './intefacesAndTypes/customer-protocol';
import { ShoppingCartProtocol } from './intefacesAndTypes/shopping-cart-protocol';
import { Order } from './Order';

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem[]> {
    return [];
  }
  addItem(item: CartItem): void {}
  removeItem(index: number): void {}
  total(): number {
    return 1;
  }
  totalWithDiscount(): number {
    return 0.5;
  }
  isEmpty(): boolean {
    return false;
  }
  clear(): void {}
}

class MessageMock implements MessageProcol {
  sendMessage(msg: string): void {}
}

class PersistMock implements PersistProcol {
  saveOrder(): void {}
}

class CustomerMock implements CustomerOrder {
  getName(): string {
    return '';
  }
  getIDN(): string {
    return '';
  }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messageMock = new MessageMock();
  const persistMock = new PersistMock();
  const customerMock = new CustomerMock();
  const sut = new Order(
    shoppingCartMock,
    messageMock,
    persistMock,
    customerMock,
  );

  return { sut, shoppingCartMock, messageMock, persistMock };
};

describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(true);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(false);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send an email to customer', () => {
    const { sut, messageMock } = createSut();
    const messageMockSpy = jest.spyOn(messageMock, 'sendMessage');
    sut.checkout();
    expect(messageMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, persistMock } = createSut();
    const persistMockSpy = jest.spyOn(persistMock, 'saveOrder');
    sut.checkout();
    expect(persistMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
});
