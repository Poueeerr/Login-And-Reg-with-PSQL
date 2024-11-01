
const token = localStorage.getItem('token');
if (!token) {
    alert('Você não está autenticado. Redirecionando para o login...');
    window.location.href = 'index.html';      
} 

async function getData() {
    try {
        const response = await fetch('/clientes', {
            method: 'GET',
            headers: {
                'x-access-token': token 
            }
        });

        if (response.status === 401) {
            console.error('Unauthorized: Invalid or expired token');
            localStorage.removeItem('token');
            window.location.href = 'index.html'; 
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function displayData() {
    const data = await getData(); 

    if (data) {
        displayUserData(data); 
    } else {
        console.error('No data to display');
    }
}

async function displayUserData(data) {
    const name = data.username;

    const rootDiv = document.getElementById('root');
    if (rootDiv) {
        rootDiv.textContent = `Bem-vindo, ${name}`;
    } else {
        console.error('Elemento com ID "root" não encontrado');
    }
}

displayData();

document.getElementById('logout').addEventListener('click', logout);
async function logout() {
    try {
        const response = await fetch('/logout', { method: 'POST' });
        const data = await response.json();
        
        if (data.auth === false) {
            localStorage.removeItem('token');
            window.location.href = 'index.html'; 
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
