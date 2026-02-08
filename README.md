# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Configuração do Supabase (Variáveis de Ambiente)

Este projeto utiliza o Supabase como backend. Para que a aplicação funcione corretamente, é necessário configurar as variáveis de ambiente.

### 1. Crie um arquivo `.env`

Na raiz do projeto, crie um arquivo chamado `.env` com o seguinte conteúdo:

```env
EXPO_PUBLIC_SUPABASE_URL=https://sua-url-do-supabase.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
 ```

Estrutura do Banco de Dados (SQL – Supabase)

A estrutura lógica do banco de dados utilizada pela aplicação está documentada por meio de scripts SQL, sem conter dados reais ou credenciais de acesso.

Os arquivos encontram-se no diretório:
```sqlSupabase/```

###  Tabelas 

O arquivo abaixo contém os comandos CREATE TABLE, constraints e índices que definem a estrutura das tabelas do sistema:

```sqlSupabase/sql_tabelas.sql```


Esse arquivo descreve entidades como usuários, missões, atividades físicas, registros de glicemia, medicação, humor diário e demais componentes necessários ao funcionamento da aplicação.

### Views

As views utilizadas pelo sistema estão descritas separadamente no arquivo:

```sqlSupabase/views.sql```

Esse arquivo contém apenas comandos CREATE VIEW ou CREATE OR REPLACE VIEW, responsáveis por organizar e simplificar consultas utilizadas pela aplicação.

Observação

Os arquivos SQL incluídos no projeto representam apenas a estrutura lógica do banco de dados, sendo utilizados para fins de documentação, reprodutibilidade e registro do software. Nenhum dado sensível ou informação de acesso ao Supabase é armazenado nesses scripts.