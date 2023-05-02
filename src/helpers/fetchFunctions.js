export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
  }
  const endpoint = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await endpoint.json();
  return data;
};

export const fetchProductsList = async (termo) => {
  if (!termo) {
    throw new Error('Termo de busca não informado');
  }
  const endpoint = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${termo}`);
  const data = await endpoint.json();
  return data.results;
};
