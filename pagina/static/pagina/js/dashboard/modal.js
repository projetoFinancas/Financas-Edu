document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('popupPerfil');
    const welcomeName = document.getElementById('welcomeName');
    const savedUsername = localStorage.getItem('username');

    console.log('Nome do usuário salvo no localStorage:', savedUsername);

    // Verifica se o nome do usuário está salvo e se não é "admin" (nome default)
    if (savedUsername && savedUsername.trim() !== '' && savedUsername !== 'admin') {
        welcomeName.textContent = savedUsername;
        modal.style.display = 'none'; 
    } else {
        modal.style.display = 'flex';
    }
});

// Função para salvar o nome do usuário
document.getElementById('saveUsername').addEventListener('click', function () {
    const username = document.getElementById('username').value.trim();
    
    if (username && username !== 'admin') { // Verifica se o nome não é vazio ou "admin"
        showNotification(`Olá, ${username}! Bem-vindo(a) ao dashboard.`, 'info');

        document.getElementById('welcomeName').textContent = username;
        localStorage.setItem('username', username); 
        
        document.getElementById('popupPerfil').style.display = 'none'; 
    } else {
        showNotification('Por favor, insira um nome válido que não seja "admin".', 'error');
    }
});

// Função para exibir a notificação
function showNotification(message, type) {
    let notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.classList.add('notification-container');
        document.body.appendChild(notificationContainer);
    }

    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Função para lidar com o logout e limpar o localStorage
document.querySelector('form[action="{% url \'logout\' %}"]').addEventListener('submit', function () {
    localStorage.removeItem('username'); 
    window.location.reload(); 
});
