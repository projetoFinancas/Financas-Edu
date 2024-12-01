// Cria os Ícones
lucide.createIcons();

// Puxa os elementos do HTML
const popupPerfil = document.querySelector(".popup-perfil");
const btnPerfil = document.querySelector(".btn-perfil");

// Função de abertura e fechamento
const togglePopup = (popupName) => popupName.classList.toggle("active");

// Click no Ícone de Perfil
btnPerfil.addEventListener("click", () => togglePopup(popupPerfil));
