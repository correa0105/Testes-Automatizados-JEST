import { IndividualCustomer, EnterpriseCustomer } from './Customer';

const createIndividualCustomer = (
  firtsName: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(firtsName, lastName, cpf);
};

const createEnterpriseCustomer = (
  name: string,
  cnpj: string,
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

describe('IndividualCustomer', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have firstName, lastName and cpf', () => {
    const sut = createIndividualCustomer('Lucas', 'Corrêa', '035.316.740-13');
    expect(sut).toHaveProperty('firstName', 'Lucas');
    expect(sut).toHaveProperty('lastName', 'Corrêa');
    expect(sut).toHaveProperty('cpf', '035.316.740-13');
  });

  it('should have methods, to get name and idn', () => {
    const sut = createIndividualCustomer('Lucas', 'Corrêa', '035.316.740-13');
    expect(sut.getName()).toBe('Lucas Corrêa');
    expect(sut.getIDN()).toBe('035.316.740-13');
  });
});

describe('EnterpriseCustomer', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have name and cnpj', () => {
    const sut = createEnterpriseCustomer('Cubic', '34.369.039/0001-00');
    expect(sut).toHaveProperty('name', 'Cubic');
    expect(sut).toHaveProperty('cnpj', '34.369.039/0001-00');
  });

  it('should have methods, to get name and idn', () => {
    const sut = createEnterpriseCustomer('Cubic', '34.369.039/0001-00');
    expect(sut.getName()).toBe('Cubic');
    expect(sut.getIDN()).toBe('34.369.039/0001-00');
  });
});
