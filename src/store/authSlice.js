// src/store/authSlice.js
// Slice do Redux para controlar a autenticação do usuário

import { createSlice } from '@reduxjs/toolkit';

// Estado inicial: usuário não está logado
const initialState = {
  usuario: null,       // dados do usuário (nome e email)
  estaLogado: false,   // controla se o usuário está logado ou não
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action para fazer login - salva os dados do usuário
    login: (state, action) => {
      state.usuario = action.payload; // payload = { nome, email }
      state.estaLogado = true;
    },
    // Action para fazer logout - limpa os dados do usuário
    logout: (state) => {
      state.usuario = null;
      state.estaLogado = false;
    },
  },
});

// Exportamos as actions para usar nos componentes
export const { login, logout } = authSlice.actions;

// Exportamos o reducer para usar na store
export default authSlice.reducer;
