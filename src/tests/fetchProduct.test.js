import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao chamar fetchProduct', () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('fetchProduct deveria retornar um produto', async () => {
    const result = await fetchProduct('MLB1405519561');
    expect(result).toEqual(product);
  });

  it('fetchProduct retorna um erro quando é chamado sem argumento', async () => {
    try {
       await fetchProduct();
    } catch (error) {
      expect(error.message).toBe('ID não informado');
    }
  });
});
