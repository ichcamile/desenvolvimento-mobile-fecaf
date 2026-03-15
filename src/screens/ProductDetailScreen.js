// src/screens/ProductDetailScreen.js
// Tela de detalhes do produto

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { buscarProdutoPorId } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }) {
  // Pega o ID do produto que veio como parâmetro da navegação
  const { produtoId } = route.params;

  // Estados locais com useState
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(0);

  // Função para buscar os detalhes do produto
  const carregarProduto = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await buscarProdutoPorId(produtoId);
      setProduto(dados);
    } catch (err) {
      setErro('Erro ao carregar detalhes do produto.');
    } finally {
      setCarregando(false);
    }
  };

  // useEffect: carrega o produto quando a tela abre
  useEffect(() => {
    carregarProduto();
  }, [produtoId]);

  // Mostra loading enquanto carrega
  if (carregando) {
    return <Loading mensagem="Carregando detalhes..." />;
  }

  // Mostra erro se falhou
  if (erro) {
    return <ErrorMessage mensagem={erro} onTentarNovamente={carregarProduto} />;
  }

  // Se não tem produto, não renderiza nada
  if (!produto) return null;

  // Calcula o preço com desconto
  const precoComDesconto = (
    produto.price - (produto.price * produto.discountPercentage) / 100
  ).toFixed(2);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Imagens do produto */}
      <View style={styles.imagemContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setImagemAtual(index);
          }}
        >
          {produto.images && produto.images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.imagem} />
          ))}
        </ScrollView>

        {/* Indicadores de imagem (bolinhas) */}
        {produto.images && produto.images.length > 1 && (
          <View style={styles.indicadores}>
            {produto.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicador,
                  imagemAtual === index && styles.indicadorAtivo,
                ]}
              />
            ))}
          </View>
        )}
      </View>

      {/* Informações do produto */}
      <View style={styles.infoContainer}>
        {/* Nome e marca */}
        <Text style={styles.marca}>{produto.brand || 'Sem marca'}</Text>
        <Text style={styles.nome}>{produto.title}</Text>

        {/* Avaliação */}
        <View style={styles.avaliacaoContainer}>
          <Text style={styles.estrela}>⭐</Text>
          <Text style={styles.avaliacaoTexto}>{produto.rating?.toFixed(1)}</Text>
        </View>

        {/* Preços */}
        <View style={styles.precoContainer}>
          <Text style={styles.precoOriginal}>US$ {produto.price?.toFixed(2)}</Text>
          <Text style={styles.precoDesconto}>US$ {precoComDesconto}</Text>
          <View style={styles.descontoBadge}>
            <Text style={styles.descontoTexto}>
              -{produto.discountPercentage?.toFixed(0)}% OFF
            </Text>
          </View>
        </View>

        {/* Descrição */}
        <Text style={styles.descricaoTitulo}>Descrição</Text>
        <Text style={styles.descricao}>{produto.description}</Text>

        {/* Informações adicionais */}
        <View style={styles.infoExtra}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Categoria</Text>
            <Text style={styles.infoValor}>{produto.category}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Estoque</Text>
            <Text style={styles.infoValor}>{produto.stock} unidades</Text>
          </View>
        </View>

        {/* Botão voltar */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotaoVoltar}>← Voltar para lista</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imagemContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imagem: {
    width: width,
    height: 300,
    resizeMode: 'contain',
  },
  indicadores: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  indicador: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 3,
  },
  indicadorAtivo: {
    backgroundColor: '#6C63FF',
    width: 20,
  },
  infoContainer: {
    padding: 20,
  },
  marca: {
    fontSize: 13,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  avaliacaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  estrela: {
    fontSize: 16,
    marginRight: 4,
  },
  avaliacaoTexto: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  precoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  precoOriginal: {
    fontSize: 16,
    color: '#bbb',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  precoDesconto: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#27ae60',
    marginRight: 10,
  },
  descontoBadge: {
    backgroundColor: '#e74c3c',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  descontoTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  descricaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 24,
    marginBottom: 8,
  },
  descricao: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  infoExtra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  infoValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  botaoVoltar: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 30,
  },
  textoBotaoVoltar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
