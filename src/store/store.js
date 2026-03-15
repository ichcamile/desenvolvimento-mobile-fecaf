// src/store/store.js
// Configuração do Redux Store

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Criamos a store do Redux com o slice de autenticação
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
