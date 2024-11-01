const db = require('./db.js');

try {
    db.connect();
} catch (e) {
    console.error("ERRO DE CONEXÃO COM PSQL", e);
}

