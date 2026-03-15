// src/screens/ProductListScreen.js
// Tela de listagem de produtos com seleção de categorias

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { buscarProdutosPorCategoria } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

// Categorias masculinas e femininas conforme o trabalho pede
const categoriasMasculinas = [
  { id: 'mens-shirts', nome: 'Camisas' },
  { id: 'mens-shoes', nome: 'Sapatos' },
  { id: 'mens-watches', nome: 'Relógios' },
];

const categoriasFemininas = [
  { id: 'womens-bags', nome: 'Bolsas' },
  { id: 'womens-dresses', nome: 'Vestidos' },
  { id: 'womens-jewellery', nome: 'Joias' },
  { id: 'womens-shoes', nome: 'Sapatos' },
  { id: 'womens-watches', nome: 'Relógios' },
];

export default function ProductListScreen({ navigation }) {
  // Estados locais com useState (conforme pedido)
  const [abaAtiva, setAbaAtiva] = useState('masculino'); // aba selecionada
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('mens-shirts');
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  // Pega os dados do usuário do Redux
  const usuario = useSelector((state) => state.auth.usuario);
  const dispatch = useDispatch();

  // Função para carregar os produtos da API
  const carregarProdutos = async (categoria) => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await buscarProdutosPorCategoria(categoria);
      setProdutos(dados);
    } catch (err) {
      setErro('Erro ao carregar os produtos. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  };

  // useEffect: carrega produtos sempre que a categoria muda
  useEffect(() => {
    carregarProdutos(categoriaSelecionada);
  }, [categoriaSelecionada]);

  // Quando muda de aba, seleciona a primeira categoria da aba
  const mudarAba = (aba) => {
    setAbaAtiva(aba);
    if (aba === 'masculino') {
      setCategoriaSelecionada('mens-shirts');
    } else {
      setCategoriaSelecionada('womens-bags');
    }
  };

  // Função de logout
  const handleLogout = () => {
    dispatch(logout());
  };

  // Categorias da aba ativa
  const categorias = abaAtiva === 'masculino' ? categoriasMasculinas : categoriasFemininas;

  return (
    <View style={styles.container}>
      {/* Header com nome do usuário e botão de logout */}
      <View style={styles.header}>
        <View>
          <Text style={styles.bemVindo}>Olá, {usuario?.nome}! 👋</Text>
          <Text style={styles.subtitulo}>Explore nosso catálogo</Text>
        </View>
        <TouchableOpacity style={styles.botaoLogout} onPress={handleLogout}>
          <Text style={styles.textoLogout}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Abas: Masculino / Feminino */}
      <View style={styles.abasContainer}>
        <TouchableOpacity
          style={[styles.aba, abaAtiva === 'masculino' && styles.abaAtiva]}
          onPress={() => mudarAba('masculino')}
        >
          <Text style={[styles.abaTexto, abaAtiva === 'masculino' && styles.abaTextoAtivo]}>
            👔 Masculino
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.aba, abaAtiva === 'feminino' && styles.abaAtiva]}
          onPress={() => mudarAba('feminino')}
        >
          <Text style={[styles.abaTexto, abaAtiva === 'feminino' && styles.abaTextoAtivo]}>
            👗 Feminino
          </Text>
        </TouchableOpacity>
      </View>

      {/* Categorias (chips/filtros) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriasScroll}
        contentContainerStyle={styles.categoriasContent}
      >
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoriaChip,
              categoriaSelecionada === cat.id && styles.categoriaChipAtivo,
            ]}
            onPress={() => setCategoriaSelecionada(cat.id)}
          >
            <Text
              style={[
                styles.categoriaTexto,
                categoriaSelecionada === cat.id && styles.categoriaTextoAtivo,
              ]}
            >
              {cat.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de Produtos */}
      {carregando ? (
        <Loading mensagem="Buscando produtos..." />
      ) : erro ? (
        <ErrorMessage
          mensagem={erro}
          onTentarNovamente={() => carregarProdutos(categoriaSelecionada)}
        />
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              produto={item}
              onPress={() => navigation.navigate('Detalhes', { produtoId: item.id })}
            />
          )}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.vazioContainer}>
              <Text style={styles.vazioTexto}>Nenhum produto encontrado.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#6C63FF',
  },
  bemVindo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitulo: {
    fontSize: 13,
    color: '#ddd',
    marginTop: 2,
  },
  botaoLogout: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  textoLogout: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  abasContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 15,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  aba: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  abaAtiva: {
    backgroundColor: '#6C63FF',
  },
  abaTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888',
  },
  abaTextoAtivo: {
    color: '#fff',
  },
  categoriasScroll: {
    maxHeight: 50,
    marginTop: 12,
  },
  categoriasContent: {
    paddingHorizontal: 16,
  },
  categoriaChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  categoriaChipAtivo: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  categoriaTexto: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  categoriaTextoAtivo: {
    color: '#fff',
  },
  lista: {
    paddingVertical: 10,
  },
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  vazioTexto: {
    fontSize: 16,
    color: '#999',
  },
});
