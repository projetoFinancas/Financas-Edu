// Função para abrir/fechar o chat
function toggleChat() {
    const chat = document.querySelector('.chat');
    const chatBox = document.getElementById('chat-box');
 
    // Toggle para abrir e fechar
    chat.classList.toggle('active');
   
    // Se o chat for fechado, limppa o conteúdo e mostra o menu
    if (!chat.classList.contains('active')) {
        chatBox.innerHTML = '';        
        showMainMenu();
    }
}
 
// Função que adiciona as mensagens no chat
function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
 
    if (typeof message === 'string') {
        // Condicional para adicionar a imagem somente às mensagens do bot
        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="profile bot-profile"></div>
                <div class="msg"><p>${message}</p></div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="msg"><p>${message}</p></div>
            `;
        }
    }
 
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
 
 
// Variável para armazenar a escolha do usuário
let currentChoice = null;
let isProcessing = false;
 
// Função que envia a mensagem e interage com o backend
function sendMessage(message) {
   
 
    appendMessage('user', `Você escolheu: ${message}`);
 
    if (currentChoice === '2') {
       
        if (message === '1') {
            appendMessage('bot', "Você escolheu a opção: Dicas de Planejamento Financeiro");
            message = "1-1";
        } else if (message === '2') {
            appendMessage('bot', "Você escolheu a opção: Dicas para Reduzir Dívidas");
            message = "1-2";
        } else if (message === '3') {
            appendMessage('bot', "Você escolheu a opção: Dicas para Poupar e Investir");
            message = "1-3";
        } else if (message === '4') {
            appendMessage('bot', "Você escolheu a opção: Dicas de Consumo Consciente");
            message = "1-4";
        } else if (message === '5') {
            appendMessage('bot', "Você escolheu a opção: Dicas de Crédito");
            message = "1-5";
        } else {
            appendMessage('bot', "Opção inválida, por favor escolha uma opção válida.");
            isProcessing = false;
            return;
        }
    }
 
    // Envia a mensagem para o backend
    fetch('/chat-response/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCsrfToken(),
        },
        body: `message=${message}`,
    })
    .then(response => response.json())
    .then(data => {
        appendMessage('bot', data.response);
 
        // Se foi a opção "Assistente Financeiro", atualiza a escolha
        if (message === '2') {
            currentChoice = '2';
        } else {
            setTimeout(() => {
                showMainMenu(); // Exibe o menu principal após o delay
            }, 3000);
        }
     
    })
    .catch(error => {
        console.error('Erro:', error);
        appendMessage('bot', 'Desculpe, houve um erro. Tente novamente mais tarde.');
       
    });
}
 
// Função para mostrar o menu principal
function showMainMenu() {
    appendMessage('bot', `
        <p>Escolha uma das opções abaixo para começar:</p>
        <div class="options">
            <div class="option" onclick="sendMessage('1')">1 - Direcionamento sobre Endividamento</div>
            <div class="option" onclick="sendMessage('2')">2 - Assistente Financeiro</div>
        </div>
    `);
    currentChoice = null;
}
 
 
// Função para enviar mensagem do campo de input
function sendMessageFromInput() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message) {
        sendMessage(message);
        userInput.value = '';
    }
}
 
// Função para lidar com a tecla Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessageFromInput();
    }
}
 
// Função para obter o token CSRF do Django
function getCsrfToken() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrftoken') {
            return value;
        }
    }
    return '';
}
 
// Função para reiniciar o chat com o menu inicial
function resetChat() {
    showMainMenu();
}
 
// Quando a página for carregada, inicializa o chat e adiciona os eventos
window.onload = function() {
    document.addEventListener('DOMContentLoaded', () => {
        resetChat();
 
        // Seleciona elementos do DOM
        const userInput = document.getElementById('user-input');
        const sendButton = document.querySelector('.footer button');
 
        // Adiciona os eventos aos elementos
        if (userInput && sendButton) {
            userInput.addEventListener('keypress', handleKeyPress);
            sendButton.addEventListener('click', sendMessageFromInput);
        }
    });
};

// Atualizações

// Cria os Ícones
lucide.createIcons();

// Puxa os elementos do HTML
const popupPerfil = document.querySelector(".popup-perfil");
const btnPerfil = document.querySelector(".btn-perfil");

// Função de abertura e fechamento
const togglePopup = (popupName) => popupName.classList.toggle("active");

// Click no Ícone de Perfil
btnPerfil.addEventListener("click", () => togglePopup(popupPerfil));

const menuIcons = document.querySelector(".menu-icons");
const ulNav = document.querySelector(".nav .links-nav ul:not(.popup-perfil ul)");
const optionulNav = ulNav.querySelectorAll("li");

optionulNav.forEach(link => link.addEventListener("click", () => menuIcons.click()))

menuIcons.addEventListener('click', () => {
    ulNav.classList.toggle('active');
})


