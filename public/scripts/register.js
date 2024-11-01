document.getElementById('regB').addEventListener('click', register);

async function register(event) {
    event.preventDefault();

    const email = document.getElementById('emailReg').value;
    const username = document.getElementById('usernameReg').value;
    const pass = document.getElementById('passReg').value;
    const passConf = document.getElementById('confpassReg').value;

    if (!email || !username || !pass || !passConf) {
        console.error("Preencha todos os campos");
        return;
    } else if (pass !== passConf) {
        console.error("Senhas não correspondem");
        return;
    }

    try {
        // Faz uma requisição para a rota '/register' usando o método HTTP POST
        const response = await fetch('/register', {
            method: 'POST', // Define o método HTTP como POST
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
            },
            // Converte o objeto com `email`, `username` e `password` em uma string JSON para ser enviada no corpo da requisição
            body: JSON.stringify({ email, username, password: pass }) 
        });
    
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) { 
            // Se `response.ok` for falso, significa que houve um erro (status de resposta não está na faixa 200-299)
            throw new Error('Erro ao registrar usuário'); // Lança um erro para o bloco `catch`
        }
    
        // Aguarda a resposta no formato JSON, que contém a confirmação do servidor
        const data = await response.json();
        console.log('Usuário registrado com sucesso:', data); // Exibe uma mensagem de sucesso e os dados recebidos
    } catch (error) {
        // Se houve um erro, exibe a mensagem no console
        console.error(error);
    }
    
}
