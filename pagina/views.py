from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import time
 
def index(request):
    return render(request, 'pagina/index.html')
 
def paginaInicial(request):
    return render(request, 'pagina/paginaInicial.html')
 
def dashboard(request):
    return render(request, 'pagina/dashboard.html')
 
def cadastro(request):
    return render(request, 'pagina/cadastro.html')

def pag(request):
    return render(request, 'pagina/pg1.html')

def pag2(request):
    return render(request, 'pagina/pg2.html')

def pag3(request):
    return render(request, 'pagina/pg3.html')
 
@csrf_exempt
def chat_response(request):
    if request.method == 'POST':
        user_input = request.POST.get('message', '')  
        print(f"Recebido do usuário: {user_input}")
 
        time.sleep(3)  # Atraso de 3 segundos na resposta
 
        # Lógica do chatbot
        if user_input == "1":
            response = "Você escolheu a opção 'Endividamento'. Acesse o site para mais informações: <a href='https://www.spcbrasil.org.br/blog/endividamento' target='_blank' class='pink-link' >Clique aqui para saber mais</a>"
        elif user_input == "2":
            response = """
                Você escolheu o Assistente Financeiro! Aqui estão as opções de dicas:<br>
                <div class="option" onclick="sendMessage('1')">1 - Dicas de Planejamento Financeiro</div>
                <div class="option" onclick="sendMessage('2')">2 - Dicas para Reduzir Dívidas</div>
                <div class="option" onclick="sendMessage('3')">3 - Dicas para Poupar e Investir</div>
                <div class="option" onclick="sendMessage('4')">4 - Dicas de Consumo Consciente</div>
                <div class="option" onclick="sendMessage('5')">5 - Dicas de Crédito</div>
            """
        elif user_input == "1-1":
            response = """
            <strong>Dicas de Planejamento Financeiro:</strong>
            <ul>
                <li><strong>Faça um orçamento mensal detalhado</strong>: Registre todas as suas receitas e despesas, para ter controle do seu dinheiro. 
                    <a href="https://www.todamateria.com.br/orcamento-familiar/" target="_blank" style="color: #bc1a8bd8;">Veja um exemplo de orçamento aqui.</a>
                </li>
                <li><strong>Siga o orçamento rigorosamente</strong>: Controle os gastos para não ultrapassar os limites estabelecidos. Evite imprevistos financeiros. 
                    <a href="https://www.contabeis.com.br/artigos/7769/como-fazer-um-orcamento-familiar-em-4-passos/" target="_blank" style="color: #bc1a8bd8;">Confira dicas sobre como seguir seu orçamento.</a>
                </li>
            </ul>
            """

        elif user_input == "1-2":
            response = """
            <strong>Dicas para Reduzir Dívidas:</strong>
            <ul>
                <li><strong>Priorize as dívidas com juros mais altos</strong>: Pague primeiro aquelas que estão acumulando mais juros, como cartões de crédito e empréstimos pessoais. 
                    <a href="https://www.serasa.com.br/educacao-financeira/dicas-para-reduzir-dividas/" target="_blank" style="color: #bc1a8bd8;">Veja mais sobre como reduzir dívidas.</a>
                </li>
                <li><strong>Renegocie suas dívidas</strong>: Tente negociar melhores condições de pagamento, como descontos ou parcelamentos mais suaves. 
                    <a href="https://www.abcdoabc.com.br/noticias/como-renegociar-dividas-e-conseguir-descontos-para-pagar-seu-cartao-de-credito-170869" target="_blank" style="color: #bc1a8bd8;">Entenda como renegociar suas dívidas de forma eficiente.</a>
                </li>
            </ul>
            """

        elif user_input == "1-3":
            response = """
            <strong>Dicas para Poupar e Investir:</strong>
            <ul>
                <li><strong>Reserve 10% da sua renda mensal</strong>: Poupar uma parte do seu rendimento é essencial para acumular reservas ou iniciar investimentos. 
                    <a href="https://www.investimentosenoticias.com.br/noticias/como-poupar-dinheiro-de-forma-sustentavel" target="_blank" style="color: #bc1a8bd8;">Aprenda como poupar de forma eficiente.</a>
                </li>
                <li><strong>Pesquise sobre opções de investimento</strong>: Comece a estudar sobre investimentos que podem trazer rendimentos para o futuro, como fundos de investimento ou ações. 
                    <a href="https://www.infomoney.com.br/onde-investir/" target="_blank" style="color: #bc1a8bd8;">Confira onde investir e por onde começar.</a>
                </li>
            </ul>
            """

        elif user_input == "1-4":
            response = """
            <strong>Dicas de Consumo Consciente:</strong>
            <ul>
                <li><strong>Evite compras impulsivas</strong>: Antes de fazer uma compra, reflita se realmente precisa do produto e se ele cabe no seu orçamento. 
                    <a href="https://www.novonegocio.com.br/consumo-consciente/" target="_blank" style="color: #bc1a8bd8;">Entenda mais sobre o consumo consciente.</a>
                </li>
                <li><strong>Avalie a necessidade antes de comprar</strong>: Dê preferência a compras planejadas, sempre verificando se o item é essencial ou se pode esperar. 
                    <a href="https://www.pontospara.com.br/blog/consumo-consciente/" target="_blank" style="color: #bc1a8bd8;">Veja mais sobre como avaliar suas compras.</a>
                </li>
            </ul>
            """

        elif user_input == "1-5":
            response = """
            <strong>Dicas de Crédito:</strong>
            <ul>
                <li><strong>Use o crédito com responsabilidade</strong>: Não compre itens que você não pode pagar à vista, use o crédito apenas quando necessário. 
                    <a href="https://www.serasa.com.br/educacao-financeira/como-usar-o-credito-com-responsabilidade/" target="_blank" style="color: #bc1a8bd8;">Aprenda a usar o crédito com sabedoria.</a>
                </li>
                <li><strong>Priorize os juros mais baixos</strong>: Compare taxas de juros antes de usar o crédito e sempre escolha as opções mais vantajosas. 
                    <a href="https://www.investimentosenoticias.com.br/noticias/como-comparar-taxas-de-juros-de-empréstimos" target="_blank" style="color: #bc1a8bd8;">Entenda como comparar as taxas de juros.</a>
                </li>
            </ul>
            """

        else:
            # retorna menu
            response = """
                <div class="message bot">
                    <div class="profile"></div>
                    <div class="msg">
                        <p>Escolha uma das opções abaixo para começar:</p>
                        <div class="options">
                            <div class="option" onclick="sendMessage('1')">1 - Direcionamento sobre Endividamento</div>
                            <div class="option" onclick="sendMessage('2')">2 - Assistente Financeiro</div>
                        </div>
                    </div>
                </div>
            """
       
       
        # Retorna a resposta como JSON
        return JsonResponse({"response": response})
 
    return JsonResponse({"error": "Método não permitido."}, status=405)