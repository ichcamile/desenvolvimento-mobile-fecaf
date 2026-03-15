// src/screens/LoginScreen.js
// Tela de Login com validação de campos

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

export default function LoginScreen() {
  // Estados locais para controlar os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [erroNome, setErroNome] = useState('');
  const [erroEmail, setErroEmail] = useState('');

  const dispatch = useDispatch();

  // Função para validar o email com regex simples
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Função chamada ao clicar no botão "Entrar"
  const handleLogin = () => {
    let valido = true;

    // Validação do nome
    if (nome.trim() === '') {
      setErroNome('Por favor, digite seu nome.');
      valido = false;
    } else if (nome.trim().length < 3) {
      setErroNome('O nome deve ter pelo menos 3 caracteres.');
      valido = false;
    } else {
      setErroNome('');
    }

    // Validação do email
    if (email.trim() === '') {
      setErroEmail('Por favor, digite seu email.');
      valido = false;
    } else if (!validarEmail(email)) {
      setErroEmail('Digite um email válido.');
      valido = false;
    } else {
      setErroEmail('');
    }

    // Se tudo estiver válido, faz o login
    if (valido) {
      dispatch(login({ nome: nome.trim(), email: email.trim() }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        {/* Título */}
        <Text style={styles.titulo}>🛍️ Catálogo Mobile</Text>
        <Text style={styles.subtitulo}>Faça login para continuar</Text>

        {/* Campo Nome */}
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={[styles.input, erroNome ? styles.inputErro : null]}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />
        {erroNome ? <Text style={styles.textoErro}>{erroNome}</Text> : null}

        {/* Campo Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, erroEmail ? styles.inputErro : null]}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {erroEmail ? <Text style={styles.textoErro}>{erroEmail}</Text> : null}

        {/* Botão Entrar */}
        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 5,
    backgroundColor: '#fafafa',
  },
  inputErro: {
    borderColor: '#e74c3c',
  },
  textoErro: {
    color: '#e74c3c',
    fontSize: 12,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
