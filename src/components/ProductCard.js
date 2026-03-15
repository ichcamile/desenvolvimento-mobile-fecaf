// src/components/ProductCard.js
// Componente de card do produto - usado na listagem

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ produto, onPress }) {
  // Calcula o preço com desconto
  const precoComDesconto = (
    produto.price - (produto.price * produto.discountPercentage) / 100
  ).toFixed(2);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Imagem do produto */}
      <Image source={{ uri: produto.thumbnail }} style={styles.imagem} />

      <View style={styles.info}>
        {/* Nome do produto */}
        <Text style={styles.nome} numberOfLines={2}>
          {produto.title}
        </Text>

        {/* Marca */}
        <Text style={styles.marca}>{produto.brand}</Text>

        {/* Preços */}
        <View style={styles.precoContainer}>
          <Text style={styles.precoOriginal}>US$ {produto.price.toFixed(2)}</Text>
          <Text style={styles.precoDesconto}>US$ {precoComDesconto}</Text>
        </View>

        {/* Badge de desconto */}
        <View style={styles.descontoBadge}>
          <Text style={styles.descontoTexto}>
            -{produto.discountPercentage.toFixed(0)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  imagem: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  marca: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  precoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  precoOriginal: {
    fontSize: 13,
    color: '#bbb',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  precoDesconto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  descontoBadge: {
    backgroundColor: '#e74c3c',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  descontoTexto: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
