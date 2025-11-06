/**
 * router.js
 * * Responsável pelo roteamento SPA (Single Page Application) e 
 * pela injeção dos templates HTML.
 */
console.log('router.js carregado com sucesso!');

// O elemento onde o conteúdo da página será injetado
const appContent = document.getElementById('app-content');

// * Template da Home Page (Index)
const homeTemplate = `
    <section class="hero">
        <div class="hero-content">
            <h1>Transforme Vidas Com Voluntariado!</h1>
            <p>Somos uma organização dedicada à inclusão social e ao apoio comunitário.</p>
            <div class="cta-buttons">
                <a href="#cadastro" class="btn-primary nav-link">Seja um Voluntário</a>
                <a href="#projetos" class="btn-secondary nav-link">Ver Projetos</a>
            </div>
        </div>
    </section>
    <section class="about-section">
        <h2>Por Que Voluntariar?</h2>
        <div class="about-content">
            <p style="grid-column: 1 / 7;">Acreditamos que a educação e o apoio social são pilares para a construção de um futuro melhor. Sua ajuda é fundamental para transformar nossa comunidade.</p>
            <p style="grid-column: 7 / -1;">Junte-se a nós e faça parte de um movimento que realmente faz a diferença. Contamos com você para espalhar a esperança!</p>
        </div>
    </section>
    <section class="impact-section">
        <h2>Nossas Causas</h2>
        <div class="impact-cards">
            <div class="card">
                <div class="card-icon">📚</div>
                <h3>Educação</h3>
                <p>Apoio escolar e mentoria para crianças e jovens carentes.</p>
            </div>
            <div class="card">
                <div class="card-icon">🏥</div>
                <h3>Saúde</h3>
                <p>Palestras e campanhas de conscientização e bem-estar.</p>
            </div>
            <div class="card">
                <div class="card-icon">🤝</div>
                <h3>Apoio Social</h3>
                <p>Distribuição de alimentos e roupas, auxílio a famílias.</p>
            </div>
        </div>
    </section>
`;

// * Template da Página de Projetos
const projetosTemplate = `
    <section class="hero-page">
        <h1>Nossos Projetos de Voluntariado</h1>
        <p>Descubra como nossas ações transformam vidas e como você pode participar.</p>
    </section>
    <section class="about-section">
        <h2>O que fazemos</h2>
        <div class="about-content">
            <h3 style="grid-column: 1 / 5;">Por Que Servimos?</h3>
            <p style="grid-column: 5 / -1;">O objetivo de nossos projetos é promover a inclusão social, oferecendo suporte educacional e comunitário para aqueles que mais precisam.</p>
        </div>
        <div class="impact-cards">
            <div class="card">
                <div class="card-icon">🎒</div>
                <h3>Programa de Reforço Escolar</h3>
                <p>Oferecemos aulas de reforço e mentoria para crianças em situação de vulnerabilidade.</p>
            </div>
            <div class="card">
                <div class="card-icon">🥫</div>
                <h3>Campanha do Agasalho e Alimentos</h3>
                <p>Campanhas de arrecadação de alimentos e roupas para famílias carentes.</p>
            </div>
            <div class="card">
                <div class="card-icon">🎨</div>
                <h3>Cultura e Inclusão</h3>
                <p>Atividades culturais, artísticas e esportivas que promovem a inclusão social.</p>
            </div>
        </div>
    </section>
    <section class="cta-content">
        <h2>Participe dos Nossos Projetos</h2>
        <div class="cta-buttons">
            <a href="#cadastro" class="btn-primary nav-link">Cadastre-se Já</a>
            <a href="#home" class="btn-secondary nav-link">Voltar ao Início</a>
        </div>
    </section>
`;

// * Template da Página de Cadastro
// ATENÇÃO: O HTML foi injetado aqui para simular o SPA.
const cadastroTemplate = `
    <section class="signup-section">
        <h2>Seja um Voluntário!</h2>
        <form id="volunteerForm">
            <fieldset>
                <legend>Dados Pessoais</legend>
                
                <div class="form-group">
                    <label for="nome">Nome Completo</label>
                    <input type="text" id="nome" class="validate-input" required minlength="3">
                    <small class="error-message">Nome inválido.</small>
                </div>
                
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" class="validate-input" required>
                    <small class="error-message">E-mail inválido.</small>
                </div>
            </fieldset>

            <fieldset>
                <legend>Áreas de Interesse</legend>
                <div class="form-group">
                    <label for="interesse">Principal Interesse</label>
                    <select id="interesse" class="validate-input" required>
                        <option value="">Selecione uma área</option>
                        <option value="Educação">Educação</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Apoio Social">Apoio Social</option>
                        <option value="Outro">Outro</option>
                    </select>
                    <small class="error-message">Selecione uma opção.</small>
                </div>

                <div class="form-group">
                    <label for="mensagem">Mensagem (Opcional)</label>
                    <textarea id="mensagem" rows="4"></textarea>
                </div>
            </fieldset>
            
            <div id="submitSuccess">
                Cadastro realizado com sucesso! Obrigado por se juntar à nossa causa!
            </div>
            
            <button type="submit" class="btn-primary">Enviar Cadastro</button>
        </form>
    </section>
`;

// 2. Mapeamento de Rotas
const routes = {
    '#home': { template: homeTemplate, title: 'Organização de Voluntários - Início' },
    '#projetos': { template: projetosTemplate, title: 'Organização de Voluntários - Projetos' },
    '#cadastro': { template: cadastroTemplate, title: 'Organização de Voluntários - Seja Voluntário' },
};

/**
 * Carrega e injeta o template HTML na div principal (#app-content).
 * @param {string} hash - O hash da URL (ex: #cadastro).
 */
export function loadContent(hash) {
    // Redireciona para #home se o hash não estiver mapeado
    const route = routes[hash] || routes['#home']; 

    // 1. Manipulação do DOM (Injeta o template)
    appContent.innerHTML = route.template;

    // 2. Atualiza o título da página
    document.title = route.title;

    // 3. Destaca o link ativo na navegação
    document.querySelectorAll('nav .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });

    // 4. Executa a função de validação APÓS carregar o formulário de cadastro
    if (hash === '#cadastro') {
        // Acessa a função exportada do main.js
        if (window.ValidationModule && window.ValidationModule.setupFormValidation) {
            window.ValidationModule.setupFormValidation();
        }
    }
}


// 5. Rotamento SPA (Baseado em Eventos)
// Evento disparado quando o hash da URL muda
window.addEventListener('hashchange', () => {
    loadContent(window.location.hash);
});

// 6. Conteúdo Inicial: Carrega a página inicial ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    // Tenta carregar o hash atual ou #home
    const initialHash = window.location.hash || '#home'; 
    loadContent(initialHash);
});