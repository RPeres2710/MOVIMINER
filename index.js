const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Iniciar o servidor Express
const app = express();

// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/moviminer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware para interpretar o corpo das requisições em JSON
app.use(bodyParser.json());

// Definição do modelo para os dados que queremos salvar no banco
const DadosSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
});

// Modelo do Mongoose baseado no schema
const Dados = mongoose.model('Dados', DadosSchema);

// Rota para salvar dados no banco
app.post('/dados', (req, res) => {
  const novoDado = new Dados(req.body);
  
  // Salva no banco de dados MongoDB
  novoDado.save()
    .then(() => res.status(201).json({ message: 'Dado salvo com sucesso' }))
    .catch(err => res.status(400).json({ message: 'Erro ao salvar dados', error: err }));
});

// Rota inicial para testar o servidor
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Iniciar o servidor na porta 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
