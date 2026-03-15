// src/navigation/AppNavigator.js
// Configuração da navegação do aplicativo

import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

// Criamos o Stack Navigator (navegação por pilha de telas)
const Stack = createStackNavigator();

export default function AppNavigator() {
  // Verifica se o usuário está logado usando o Redux
  const estaLogado = useSelector((state) => state.auth.estaLogado);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {estaLogado ? (
          // Se está logado, mostra as telas do app
          <>
            <Stack.Screen name="Produtos" component={ProductListScreen} />
            <Stack.Screen
              name="Detalhes"
              component={ProductDetailScreen}
              options={{
                headerShown: true,
                title: 'Detalhes do Produto',
                headerStyle: { backgroundColor: '#6C63FF' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
          </>
        ) : (
          // Se NÃO está logado, mostra a tela de login
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
