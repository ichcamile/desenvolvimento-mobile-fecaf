// src/components/ErrorMessage.js
// Componente para exibir mensagens de erro com botão de tentar novamente

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ErrorMessage({ mensagem, onTentarNovamente }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😕</Text>
      <Text style={styles.texto}>{mensagem}</Text>
      {onTentarNovamente && (
        <TouchableOpacity style={styles.botao} onPress={onTentarNovamente}>
          <Text style={styles.textoBotao}>Tentar Novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  emoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
