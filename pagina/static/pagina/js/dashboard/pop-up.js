// Seleção de Elementos
const saldoAtualElement = document.getElementById("saldo-atual");
const despesaTotalElement = document.getElementById("despesa-total");
const selectedValueDespesas = document.getElementById("selected-value-despesas");
const valorDespesasInput = document.getElementById("valor-despesas");
const adicionarCategoriaButton = document.querySelector(".popup-despesas .btn");
const popupDespesas = document.querySelector(".popup-despesas");
const selectedValueEntradas = document.getElementById("selected-value-entradas");
const popupEntradas = document.querySelector(".popup-entradas");
const closeButton = document.querySelector('.close-btn-entradas');
 
 
const categoriaSelecionadaElemento = document.getElementById('selected-value-entradas');
const valorEntradasInput = document.getElementById('valor-entradas');
const adicionarCategoriaEntradasButton = document.querySelector(".popup-entradas .btn");
const adicionarCategoriaDespesasButton = document.querySelector(".popup-despesas .btn");
 
 
// Seleção de Elementos da Página
const categoriasGrafico = document.querySelectorAll(".expense-card .expense-item .expense-cor"),
    categoriasHistorico = document.querySelectorAll(".expense-summary .expense-item > .expense-cor"),
    nomeCategoriasGrafico = document.querySelectorAll(".expense-card .expense-item .expense-text > p"),
    nomeCategoriasHistorico = document.querySelectorAll(".expense-amount.categoria");
 
const popupAccountDetails = document.querySelector(".popup-account-details"),
    popupPerfil = document.querySelector(".popup-perfil"),
    popupFiltro = document.querySelector(".popup-filtro");
 
const btnAccountDetails = document.querySelector(".btn-account"),
    btnDespesas = document.querySelector(".btn-despesas"),
    btnEntradas = document.querySelector(".btn-entradas"),
    btnPerfil = document.querySelector(".btn-perfil"),
    btnFiltro = document.querySelectorAll(".btn-filtro");
 
const btnCloseDetails = document.querySelector(".close-btn-account"),
    btnCloseDespesas = document.querySelector(".close-btn-despesas"),
    btnCloseEntradas = document.querySelector(".close-btn-entradas"),
    btnCloseFiltro = document.querySelector(".close-btn-filtro");
 
// Funções de Pop-up
const togglePopup = (popupName) => popupName.classList.toggle("active");
 
btnAccountDetails.addEventListener("click", () => togglePopup(popupAccountDetails));
btnDespesas.addEventListener("click", () => togglePopup(popupDespesas));
btnEntradas.addEventListener("click", () => togglePopup(popupEntradas));
btnPerfil.addEventListener("click", () => togglePopup(popupPerfil));
btnFiltro.forEach(btn => btn.addEventListener("click", () => togglePopup(popupFiltro)));
 
btnCloseEntradas.addEventListener("click", () => togglePopup(popupEntradas));
btnCloseDespesas.addEventListener("click", () => togglePopup(popupDespesas));
btnCloseDetails.addEventListener("click", () => togglePopup(popupAccountDetails));
btnCloseFiltro.addEventListener("click", () => togglePopup(popupFiltro));
 
 
// Definições de Cores para Categorias
const categoriasColors = {
    "Alimentação": "blueviolet",
    "Lazer": "#FFA500",
    "Educação": "#FFA500",
    "Transporte": "#FF7F50",
    "Saúde": "#DC143C",
    "Outros": "#BC8F8F",
    "Salário": "#C71585",
    "Receita Extra": "#7B68EE",
    "Dividendos": "#3CB371",
    "Rendimentos": "#20B2AA",
};
// Variáveis de controle
let saldoAtual = 0;  
let despesasTotal = 0;
let rendaTotal = 0;
let historicoCompleto = [];
 
 
// Função para formatar valores no padrão brasileiro
function formatarValorBR(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
 
// Atualizar elementos no início
saldoAtualElement.textContent = formatarValorBR(saldoAtual);
despesaTotalElement.textContent = formatarValorBR(despesasTotal);
 
 
function formatarData() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
 
    return `${dia}/${mes}/${ano}`;
}
 
 
// Funções de Manipulação de Cor
categoriasGrafico.forEach((categoria, index) => {
    categoria.style.backgroundColor = categoriasColors[nomeCategoriasGrafico[index].textContent];
});
 
categoriasHistorico.forEach((categoria, index) => {
    categoria.style.backgroundColor = categoriasColors[nomeCategoriasHistorico[index].textContent];
});
 
//  Configuração do Campo de Entrada de Valor
const valorInput = document.getElementById("valor");
 
new Cleave(valorInput, {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: '.',
    numeralDecimalMark: ',',
    numeralDecimalScale: 2
});
 
// Atualização de Valores e Saldo
const salvarButton = document.querySelector(".popup-container .btn");
const rendaElement = document.getElementById("renda-total");
 
 
// Função para Salvar e Atualizar os Valores
salvarButton.addEventListener("click", () => {
    const valorFormatado = valorInput.value;
    const valorLimpo = valorFormatado.replace(/\./g, '').replace(',', '.');
    const valorAdicionado = parseFloat(valorLimpo);
 
    if (!isNaN(valorAdicionado) && valorAdicionado > 0) {
        rendaTotal += valorAdicionado;
        saldoAtual += valorAdicionado;
 
        rendaElement.textContent = formatarValorBR(rendaTotal);
        saldoAtualElement.textContent = formatarValorBR(saldoAtual);
 
        valorInput.value = '';
        togglePopup(popupAccountDetails);
    }
});
 
//  Habilitar/Desabilitar Botão de Salvar
valorInput.addEventListener("input", () => {
    const valorFormatado = valorInput.value;
    const valorLimpo = valorFormatado.replace(/\./g, '').replace(',', '.');
    const valorAdicionado = parseFloat(valorLimpo);
 
    salvarButton.disabled = isNaN(valorAdicionado) || valorAdicionado <= 0;
});
 
// Função para adicionar transação (entradas ou despesas)
function adicionarTransacao(tipo) {
    const categoriaSelecionada = document.getElementById(`selected-value-${tipo}`).textContent;
 
    // Verifique se a categoria foi corretamente selecionada
    if (!categoriaSelecionada || categoriaSelecionada === "Selecione uma categoria") {
        showNotification("Por favor, selecione uma categoria.");
        return;
    }
 
    const valorInput = document.getElementById(`valor-${tipo}`);
    const valorFormatado = valorInput.value;
    const valorLimpo = valorFormatado.replace(/\./g, "").replace(",", ".");
    const valor = parseFloat(valorLimpo);
 
    // Validação do valor
    if (isNaN(valor) || valor <= 0) {
        showNotification("Por favor, insira um valor válido.");
        return;
    }
 
    // Verificar saldo disponível para despesas
    if (tipo === "despesas" && valor > saldoAtual) {
        showNotification("O valor excede o saldo disponível.");
        return;
    }
 
    // Atualizar saldo
    if (tipo === "entradas") {
        saldoAtual += valor;
    } else if (tipo === "despesas") {
        saldoAtual -= valor;
        despesasTotal += valor;
    }
 
    // Atualizar exibição de saldo
    document.getElementById("saldo-atual").textContent = formatarValorBR(saldoAtual);
    document.getElementById("despesa-total").textContent = formatarValorBR(despesasTotal);
 
    // Criar a nova transação
    const novaTransacao = {
        categoria: categoriaSelecionada,
        data: formatarData(),
        valor,
        tipo,
    };
 
    // Adicionar ao histórico completo
    historicoCompleto.push(novaTransacao);
 
    // Criar o elemento para o histórico visível
    const novoItemHistorico = document.createElement("div");
    novoItemHistorico.classList.add("expense-item");
    novoItemHistorico.innerHTML = `
        <div class="expense-cor" style="background-color: ${categoriasColors[categoriaSelecionada] || "gray"}"></div>
        <div class="expense-text expense-row">
            <p class="expense-label">Categoria</p>
            <p class="expense-amount categoria">${categoriaSelecionada}</p>
        </div>
        <div class="expense-text expense-row">
            <p class="expense-label">Data</p>
            <p class="expense-amount">${novaTransacao.data}</p>
        </div>
        <div class="expense-text expense-row">
            <p class="expense-label">Valor</p>
            <p class="expense-amount price">${formatarValorBR(valor)}</p>
        </div>
    `;
 
    // Adicionar ao histórico visível apenas se o filtro permitir
    if (!filtroAtivo || categoriaSelecionada.toLowerCase() === categoriaEscolhida.toLowerCase()) {
        document.querySelector(".expense-summary").appendChild(novoItemHistorico);
    } else {
        // Notificar se o item foi adicionado
        showNotification(
            `A transação foi registrada, mas não está visível porque o filtro "${categoriaEscolhida}" está ativo.`,
            "info"
        );
    }
 
    // Atualizar o card de categoria
    const containerCategorias = document.querySelector(`.${tipo}-por-categoria .card-infos`);
    let cardCategoria = containerCategorias.querySelector(`.card[data-categoria="${categoriaSelecionada}"]`);
 
    // Criar o card se não existir
    if (!cardCategoria) {
        cardCategoria = document.createElement("div");
        cardCategoria.classList.add("card");
        cardCategoria.setAttribute("data-categoria", categoriaSelecionada);
        containerCategorias.appendChild(cardCategoria);
    }
 
    // Atualizar ou adicionar o valor no card da categoria
    const valorAtual = cardCategoria.querySelector(".category-value");
    const valorExistente = valorAtual ? parseFloat(valorAtual.textContent.replace("R$", "").replace(",", ".")) : 0;
    const novoValor = valorExistente + valor;
 
    cardCategoria.innerHTML = `
        <div class="category-color" style="background-color: ${categoriasColors[categoriaSelecionada] || "gray"}"></div>
        <div class="category-info">
            <p class="category-name">
                <span class="category-circle" style="background-color: ${categoriasColors[categoriaSelecionada] || "gray"}"></span>
                ${categoriaSelecionada} - <span class="category-value">${formatarValorBR(novoValor)}</span>
            </p>
        </div>
    `;
 
    // Limpar campos e fechar o pop-up
    document.getElementById(`selected-value-${tipo}`).textContent = "Selecione uma categoria";
    valorInput.value = "";
    document.querySelector(`.popup-container.${tipo}`).classList.remove("active");
 
    // Fechar o menu de categorias automaticamente após a seleção
    document.querySelector('.options').classList.remove('show');
}
 
 
// Adicionar evento para entradas
document.querySelector('.btn-despesa').addEventListener('click', () => {
    adicionarTransacao("entradas");
});
 
// Adicionar evento para despesas
adicionarCategoriaDespesasButton.addEventListener("click", () => {
    adicionarTransacao("despesas");
});
 
 
 
// Seletor de Categorias para Entradas
document.querySelector('.categoria-select').addEventListener('click', () => {
    document.querySelector('#options-entradas').classList.toggle('show');
});
 
const optionsEntradas = document.querySelectorAll('#options-entradas .option');
optionsEntradas.forEach(option => {
    option.addEventListener('click', () => {
        const selectedValue = option.querySelector('label').textContent;
        document.getElementById('selected-value-entradas').textContent = selectedValue;
        document.querySelector('#options-entradas').classList.remove('show');
    });
});
 
 
// Seletor de Categorias para Despesas
document.querySelector('.categoria-select').addEventListener('click', () => {
    document.querySelector('#options-despesas').classList.toggle('show');
});
 
const optionsDespesas = document.querySelectorAll('#options-despesas .option');
optionsDespesas.forEach(option => {
    option.addEventListener('click', () => {
        const selectedValue = option.querySelector('label').textContent;
        document.getElementById('selected-value-despesas').textContent = selectedValue;
        document.querySelector('#options-despesas').classList.remove('show');
    });
});
 
 
 
//FILTRO
//  Configuração do Filtro
document.addEventListener("DOMContentLoaded", function () {
    const categoriaOptions = document.querySelectorAll("#options-filtro input[type='radio']");
    const selectedValueFiltro = document.getElementById("selected-value-filtro");
    const popupFiltro = document.querySelector(".popup-filtro");
    const categoriaSelectButton = document.querySelector(".categoria-select");
    const optionsFiltro = document.getElementById("options-filtro");
    const btnVisualizar = document.querySelector(".popup-filtro .btn");
    const btnVerTodos = document.querySelector(".popup-filtro .btn-ver-todos");
 
    // Variáveis para o estado do filtro
    categoriaEscolhida = null;
    filtroAtivo = false;
 
    // Mostrar/ocultar opções de filtro
    categoriaSelectButton.addEventListener("click", function () {
        optionsFiltro.classList.toggle("show");
    });
 
    // Atualizar filtro ao selecionar categoria
    categoriaOptions.forEach(option => {
        option.addEventListener("change", function () {
            selectedValueFiltro.textContent = this.value;
            categoriaEscolhida = this.value;
        });
    });
 
    // Aplicar filtro
    btnVisualizar.addEventListener("click", function () {
        if (categoriaEscolhida) {
            filtroAtivo = true;
            filtrarHistoricoPorCategoria(categoriaEscolhida);
        }
    });
 
    // Mostrar todos os itens
    btnVerTodos.addEventListener("click", function () {
        filtroAtivo = false;
        mostrarTodosItens();
    });
 
    function mostrarTodosItens() {
        const expenseSummary = document.querySelector(".expense-summary");
        expenseSummary.innerHTML = "";
   
        // Renderizar todas as transações
        historicoCompleto.forEach(transacao => {
            const itemHistorico = document.createElement("div");
            itemHistorico.classList.add("expense-item");
            itemHistorico.innerHTML = `
                <div class="expense-cor" style="background-color: ${categoriasColors[transacao.categoria] || "gray"}"></div>
                <div class="expense-text expense-row">
                    <p class="expense-label">Categoria</p>
                    <p class="expense-amount categoria">${transacao.categoria}</p>
                </div>
                <div class="expense-text expense-row">
                    <p class="expense-label">Data</p>
                    <p class="expense-amount">${transacao.data}</p>
                </div>
                <div class="expense-text expense-row">
                    <p class="expense-label">Valor</p>
                    <p class="expense-amount price">${formatarValorBR(transacao.valor)}</p>
                </div>
            `;
            expenseSummary.appendChild(itemHistorico);
        });
   
        // Notificar o usuário que o filtro foi desativado
        showNotification("Filtro desativado. Exibindo todas as transações.", "info");
    }
   
 
 
    // Filtrar histórico por categoria
    function filtrarHistoricoPorCategoria(categoria) {
        const itensHistorico = document.querySelectorAll(".expense-summary .expense-item");
        let categoriaEncontrada = false;
 
        itensHistorico.forEach(item => {
            const categoriaItem = item.querySelector(".expense-amount.categoria").textContent.trim();
            if (categoriaItem.toLowerCase() === categoria.toLowerCase()) {
                item.style.display = "flex";
                categoriaEncontrada = true;
            } else {
                item.style.display = "none";
            }
        });
 
        if (!categoriaEncontrada) {
            showNotification("Nenhum item encontrado para a categoria " + categoria);
        }
    }
});
 
// Exibição Completa do Histórico
function mostrarTodosItens() {
    const itensHistorico = document.querySelectorAll(".expense-summary .expense-item");
    itensHistorico.forEach(item => {
        item.style.display = "flex";
    });
}
 
function showNotification(message, type = "info") {
    const container = document.getElementById("notification-container");
    if (!container) {
        console.error("Notification container not found.");
        return;
    }
 
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.textContent = message;
 
    container.appendChild(notification);
 
    // Remove a notificação após 7 segundos
    setTimeout(() => {
        notification.remove();
    }, 7000);
}

// Atualizações
lucide.createIcons();
