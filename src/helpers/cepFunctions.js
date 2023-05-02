export const getAddress = async (cep) => {
  const endpoint = await Promise.any([
    fetch(`https://cep.awesomeapi.com.br/json/${cep}`),
    fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`),
  ]);
  if (!cep || !endpoint.ok) {
    throw new Error('CEP não encontrado');
  }
  const data = await endpoint.json();
  return data;
};

export const searchCep = async () => {
  const inputCep = document.querySelector('.cep-input');
  const enderecoCep = document.querySelector('.cart__address');
  try {
    const cep = await getAddress(inputCep.value);
    const enderecoRua = cep.address || cep.street;
    const enderecoBairro = cep.district || cep.neighborhood;
    const endereco = `${enderecoRua} - ${enderecoBairro} - ${cep.city} - ${cep.state}`;
    enderecoCep.innerHTML = endereco;
  } catch (error) {
    enderecoCep.innerHTML = 'CEP não encontrado';
  }
};
