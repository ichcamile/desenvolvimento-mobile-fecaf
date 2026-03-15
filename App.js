// App.js
// Arquivo principal do aplicativo
// Aqui configuramos o Redux Provider e a Navegação

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    // O Provider do Redux envolve todo o app para compartilhar o estado global
    <Provider store={store}>
      <StatusBar style="light" />
      <AppNavigator />
    </Provider>
  );
}
