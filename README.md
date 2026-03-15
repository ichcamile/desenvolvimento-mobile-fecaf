# 🛍️ Catálogo Interativo Mobile

Aplicativo mobile desenvolvido em **React Native (Expo)** para exibição de produtos de uma loja online, com listagem por categorias (masculino e feminino), navegação entre telas e consumo de API REST.

## 📱 Funcionalidades

- ✅ **Tela de Login** com validação de campos (nome e email)
- ✅ **Listagem de Produtos** organizada por abas (Masculino / Feminino)
- ✅ **Filtro por Categorias**: Camisas, Sapatos, Relógios, Bolsas, Vestidos, Joias
- ✅ **Tela de Detalhes** com nome, imagem, descrição, preço e desconto
- ✅ **Logout** funcional com limpeza dos dados armazenados
- ✅ **Tratamento de erros** e estados de carregamento (loading)
- ✅ **Consumo de API REST** via Axios (DummyJSON)

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **React Native** | Framework para desenvolvimento mobile |
| **Expo** | Plataforma de desenvolvimento e build |
| **Axios** | Consumo de API REST |
| **Redux Toolkit** | Gerenciamento de estado global (autenticação) |
| **React Navigation** | Navegação entre telas (Stack Navigator) |

## 📁 Estrutura do Projeto

```
CatalogoMobile/
├── App.js                          # Arquivo principal (Provider + Navigator)
├── src/
│   ├── components/
│   │   ├── ProductCard.js          # Card de produto na listagem
│   │   ├── Loading.js              # Componente de carregamento
│   │   └── ErrorMessage.js         # Componente de erro
│   ├── screens/
│   │   ├── LoginScreen.js          # Tela de login
│   │   ├── ProductListScreen.js    # Tela de listagem de produtos
│   │   └── ProductDetailScreen.js  # Tela de detalhes do produto
│   ├── services/
│   │   └── api.js                  # Configuração do Axios e funções de API
│   ├── store/
│   │   ├── store.js                # Configuração do Redux Store
│   │   └── authSlice.js            # Slice de autenticação (login/logout)
│   └── navigation/
│       └── AppNavigator.js         # Configuração da navegação
├── package.json
└── README.md
```

## 🌐 API Utilizada

- **API**: [DummyJSON](https://dummyjson.com)
- **Endpoints**:
  - Listar por categoria: `GET /products/category/{categoria}`
  - Detalhes do produto: `GET /products/{id}`

### Categorias Masculinas
- `mens-shirts` — Camisas
- `mens-shoes` — Sapatos
- `mens-watches` — Relógios

### Categorias Femininas
- `womens-bags` — Bolsas
- `womens-dresses` — Vestidos
- `womens-jewellery` — Joias
- `womens-shoes` — Sapatos
- `womens-watches` — Relógios

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado (versão 18+)
- npm ou yarn
- Expo Go instalado no celular (iOS ou Android)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/CatalogoMobile.git

# 2. Acesse a pasta do projeto
cd CatalogoMobile

# 3. Instale as dependências
npm install

# 4. Execute o projeto
npx expo start
```

Após executar, escaneie o QR Code com o app **Expo Go** no celular.

## 📸 Telas do Aplicativo

### Tela de Login
- Campos de **Nome** e **Email** com validação
- Mensagens de erro para campos inválidos
- Botão "Entrar" para acessar o catálogo

### Tela de Listagem de Produtos
- Abas para **Masculino** e **Feminino**
- Chips de categorias para filtrar produtos
- Cards com imagem, nome, marca, preço original e com desconto
- Header com nome do usuário e botão de **Logout**

### Tela de Detalhes do Produto
- Carrossel de imagens do produto
- Nome, marca e avaliação
- Preço original, preço com desconto e percentual de desconto
- Descrição completa do produto
- Informações de categoria e estoque

## 👤 Autor

Camile Santana# 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.
