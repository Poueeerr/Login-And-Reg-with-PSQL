document.getElementById('logB').addEventListener('click', login);

async function login(event) {
    event.preventDefault();

    const username = document.getElementById('usernameLog').value;
    const pass = document.getElementById('passLog').value;

    if (!username || !pass) {
        console.error('Preencha todos os campos');
        return;
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password: pass })
        });

        if (!response.ok) {
            throw new Error('Erro ao encontrar usuário');
        }

        const data = await response.json();
        
        // Armazene o token JWT retornado
        if (data.token) {
            localStorage.setItem('token', data.token); // Salva o token no localStorage
            console.log('Usuário logado com sucesso:', data);
            
            // Redirecione ou faça algo após o login
            window.location.href = 'dashboard.html'; 
        } else {
            console.error('Token não recebido');
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
    }
}

