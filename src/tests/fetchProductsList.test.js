import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui 
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('fetchProductsList retorna uma base de dados igual ao objeto computadorSearch', async () => {
    const resultObj = await fetchProductsList('computador');
    expect(resultObj).toEqual(computadorSearch);
  });

  it('fetchProductsList retorna a mensagem de erro "Termo de busca não informado" ao ser chamada sem parâmetro', async () => {
    try {
      await fetchProductsList();
    } catch (error) {
      expect(error.message).toBe('Termo de busca não informado');
    }
  })
});
