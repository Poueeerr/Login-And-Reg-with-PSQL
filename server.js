const express = require('express');
const path = require('path');
const app = express();
const db = require('./public/scripts/db');
const jwt = require('jsonwebtoken');
const cors = require("cors")
const SECRET = 'hehe';


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];  
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.userId;
        next();
    });
}

app.get('/clientes', verifyJWT, async (req, res) => {
    const userId = req.userId; 

    try {
        const userQuery = 'SELECT username FROM users WHERE user_id = $1';
        const userResult = await db.query(userQuery, [userId]);

        if (userResult.rows.length > 0) {
            res.status(200).json(userResult.rows[0]);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter dados do usuário', error });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    try {
        const checkQuery = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const checkValues = [username, password];    
        const checkResult = await db.query(checkQuery, checkValues);

        if (checkResult.rows.length > 0) {
            const userId = checkResult.rows[0].user_id;
            const token = jwt.sign({ userId: userId }, SECRET, { expiresIn: 1800 });

            return res.json({ auth: true, token: token, userId: userId });
        } else {
            return res.status(401).json({ auth: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Erro ao logar usuário:', err);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const checkQuery = 'SELECT * FROM users WHERE email = $1 OR username = $2';
        const checkValues = [email, username];
        const checkResult = await db.query(checkQuery, checkValues);

        if (checkResult.rows.length > 0) {
            return res.status(400).json({ error: 'Email ou username já em uso' });
        }

        const queryText = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
        const values = [username, email, password];
        await db.query(queryText, values);

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

app.post('/logout', (req, res) => {
    res.status(200).json({ auth: false, token: null });
});


app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
