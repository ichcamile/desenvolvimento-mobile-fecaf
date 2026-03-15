// src/services/api.js
// Configuração do Axios para consumir a API DummyJSON

import axios from 'axios';

// Criamos uma instância do Axios com a URL base da API
const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000, // timeout de 10 segundos
});

// Função para buscar produtos por categoria
// Exemplo: buscarProdutosPorCategoria('mens-shirts')
export const buscarProdutosPorCategoria = async (categoria) => {
  try {
    const resposta = await api.get(`/products/category/${categoria}`);
    return resposta.data.products;
  } catch (erro) {
    console.error('Erro ao buscar produtos da categoria:', categoria, erro);
    throw erro;
  }
};

// Função para buscar detalhes de um produto pelo ID
// Exemplo: buscarProdutoPorId(1)
export const buscarProdutoPorId = async (id) => {
  try {
    const resposta = await api.get(`/products/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error('Erro ao buscar produto com ID:', id, erro);
    throw erro;
  }
};

export default api;
