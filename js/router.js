console.log("router.js carregado com sucesso!"); 
// (Coloque isso antes de qualquer outra linha de código)

/**
 * /js/router.js
 * Gerencia a navegação (SPA Básico) e os templates HTML.
 * O conteúdo dos templates está armazenado em strings para simular
 * o carregamento dinâmico sem a necessidade de arquivos separados.
 */

// Elemento onde o conteúdo da página será injetado
const appContent = document.getElementById('app-content');

// ----------------------------------------------------
// 1. Templates JavaScript
// ----------------------------------------------------

// Template da Home Page (Index)
const homeTemplate = `
    <section class="hero">
        <div class="hero-content">
            <h1>Transforme Vidas Com Voluntariado</h1>
            <p>Somos uma organização dedicada à inclusão social e ao atendimento de famílias carentes. Navegue pelas seções!</p>
            <a href="#cadastro" class="btn-primary nav-link">Quero Ser Voluntário</a>
        </div>
    </section>
    <section class="about">
        <h2>Nossa Missão</h2>
        <p>Através de uma rede de voluntários, levamos esperança e recursos para comunidades carentes.
        Acreditamos que a educação e o apoio social são pilares para um futuro mais justo.</p>
        <div class="cta-buttons" style="margin-top: 24px;">
            <a href="#projetos" class="btn-secondary nav-link">Ver Projetos</a>
        </div>
    </section>
`;

// Template da Página de Projetos
const projetosTemplate = `
    <section class="hero-page">
        <div class="hero-content">
            <h1>Nossos Projetos de Voluntariado</h1>
            <p>Descubra como nossas ações transformam vidas e como você pode fazer parte.</p>
        </div>
    </section>
    <section class="about-section">
        <div class="about-content">
            <div style="grid-column: 1 / span 12;">
                <h2>Projetos Atuais</h2>
                <p>Nossos projetos focam em educação, saúde e apoio comunitário. Junte-se a nós!</p>
            </div>
            
            <div class="impact-cards">
                <div class="card">
                    <div class="card-icon">📚</div>
                    <h3>Programa de Reforço Escolar</h3>
                    <p>Oferece aulas de reforço e mentoria para crianças e adolescentes em vulnerabilidade.</p>
                </div>
                <div class="card">
                    <div class="card-icon">🏡</div>
                    <h3>Apoio Comunitário</h3>
                    <p>Campanhas de arrecadação de alimentos e roupas, e auxílio na construção de moradias.</p>
                </div>
                <div class="card">
                    <div class="card-icon">🎨</div>
                    <h3>Oficinas Culturais</h3>
                    <p>Atividades culturais, artísticas e esportivas para promover integração e bem-estar.</p>
                </div>
            </div>
        </div>
    </section>
`;

// Template da Página de Cadastro
// O formulário original de cadastro.html é injetado aqui
const cadastroTemplate = `
    <section class="signup-section">
        <h2>Seja um Voluntário!</h2>
        
        <form id="volunteerForm">
            <fieldset>
                <legend>Dados Pessoais</legend>
                
                <div class="form-group">
                    <label for="nome">Nome Completo</label>
                    <input type="text" id="nome" class="validate-input" required data-error="O nome completo é obrigatório e deve ter pelo menos 3 letras.">
                    <small class="error-message"></small>
                </div>
                
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" class="validate-input" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" data-error="Insira um formato de e-mail válido (ex: seu.nome@email.com).">
                    <small class="error-message"></small>
                </div>
            </fieldset>

            <fieldset>
                <legend>Áreas de Interesse</legend>
                
                <div class="form-group">
                    <label for="interesse">Principal Interesse</label>
                    <select id="interesse" class="validate-input" required data-error="Selecione uma área de interesse para o voluntariado.">
                        <option value="">Selecione uma área</option>
                        <option value="educacao">Educação</option>
                        <option value="saude">Saúde</option>
                        <option value="social">Apoio Social</option>
                    </select>
                    <small class="error-message"></small>
                </div>
                
                <div class="form-group">
                    <label for="mensagem">Mensagem (Opcional)</label>
                    <textarea id="mensagem" rows="4"></textarea>
                </div>
            </fieldset>
            
            <div class="success-message" id="submitSuccess">
                Cadastro realizado com sucesso! Obrigado por se juntar a nós.
            </div>
            
            <button type="submit">Enviar Cadastro</button>
        </form>
    </section>
`;

// ----------------------------------------------------
// 2. Mapeamento de Rotas
// ----------------------------------------------------

const routes = {
    '#home': { template: homeTemplate, title: 'Organização de Voluntários - Início' },
    '#projetos': { template: projetosTemplate, title: 'Nossos Projetos' },
    '#cadastro': { template: cadastroTemplate, title: 'Seja Voluntário' }
};

/**
 * Carrega e injeta o template HTML na div principal (#app-content).
 * @param {string} hash - O hash da URL (ex: #cadastro).
 */
export function loadContent(hash) {
    const route = routes[hash] || routes['#home']; // Redireciona para home se a rota não existir

    // 1. Manipulação do DOM (Injeta o Template)
    appContent.innerHTML = route.template;

    // 2. Atualiza o título da página
    document.title = route.title;

    // 3. Destaca o link ativo na navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });

    // 4. Executa a função de validação APÓS carregar o formulário de cadastro
    if (hash === '#cadastro') {
        const { setupFormValidation } = window.ValidationModule;
        if (setupFormValidation) {
            setupFormValidation();
        }
    }
}

// ----------------------------------------------------
// 3. Roteamento SPA (Baseado em Eventos)
// ----------------------------------------------------

// Evento disparado quando o hash da URL muda
window.addEventListener('hashchange', () => {
    loadContent(window.location.hash);
});

// Evento disparado ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o menu hambúrguer funcione em qualquer página
    window.toggleMenu = () => {
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.toggle('show');
    };

    // Carrega o conteúdo inicial (usa a rota atual ou #home)
    const initialHash = window.location.hash || '#home';
    loadContent(initialHash);
});