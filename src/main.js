import { searchCep } from './helpers/cepFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const section = document.querySelector('.products');

const loadingCreate = () => {
  const element = document.createElement('h2');
  element.className = 'loading';
  element.innerHTML = 'carregando...';
  section.appendChild(element);
};

const mostrarProductList = async () => {
  try {
    const listaProdutos = await fetchProductsList('computer');
    section.innerHTML = '';
    listaProdutos.forEach((product) => {
      const criaListaProdutos = createProductElement(product);
      section.appendChild(criaListaProdutos);
    });
  } catch (error) {
    section.innerHTML = '';
    const erro = document.createElement('h2');
    erro.className = 'error';
    erro.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    section.appendChild(erro);
  }
};

const localStorage = () => {
  const carrinho = document.querySelector('.cart__products');
  const salvarId = getSavedCartIDs();
  salvarId.forEach(async (id) => {
    const produto = await fetchProduct(id);
    const product = createCartProductElement(produto);
    carrinho.appendChild(product);
  });
};

const somaPreco = () => {
  let total = 0;
  const valorTotal = document.querySelector('.total-price');
  const salvarId = getSavedCartIDs();
  salvarId.forEach(async (id) => {
    const produto = await fetchProduct(id);
    console.log(produto);
    total += produto.price;
    valorTotal.innerHTML = total;
  });
};

window.onload = () => {
  loadingCreate();
  mostrarProductList();
  localStorage();
  somaPreco();
};
