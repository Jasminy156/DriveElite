import 'dotenv/config';
import express from 'express';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido no .env');
}

import db, { testConnection } from './src/config/db.js';
import usuariosRoutes from "./src/config/routes/usuarios.routes.js";
import carrosRoutes from "./src/config/routes/carros.routes.js";
import vendasRoutes from "./src/config/routes/vendas.routes.js";
// 1. Importe a nova rota de favoritos que vamos criar
import favoritosRoutes from "./src/config/routes/favoritos.routes.js"; 

import cors from 'cors';
import errorHandler from './src/middlewares/errorHandler.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.locals.db = db;

// Rotas Base
app.get('/', (req, res) => {
  res.status(200).send('Servidor do DriveElite rodando!');
});

app.get('/status', (req, res) => {
  res.status(200).json({
    projeto: 'Loja de carros de Luxo',
    nome: 'DriveElite',
    status: 'Em desenvolvimento',
    versao: '1.0.0',
    dataDeLancamentoPrevisto: '2026-04-22'
  });
});

// 2. Registro das Rotas Principais
app.use("/usuarios", usuariosRoutes);
app.use("/carros", carrosRoutes);
app.use("/vendas", vendasRoutes);
// 3. Nova rota de favoritos adicionada aqui
app.use("/favoritos", favoritosRoutes); 

app.use((req, res) => {
  res.status(404).send('Rota não encontrada');
});

app.use(errorHandler);

// Inicia o servidor APENAS após conectar ao banco
async function startServer() {
  const dbConnected = await testConnection();

  if (!dbConnected) {
    console.error('❌ Não foi possível conectar ao banco. Servidor não iniciado.');
    process.exit(1);
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor DriveElite rodando na porta ${PORT}`);
  })
};

startServer();