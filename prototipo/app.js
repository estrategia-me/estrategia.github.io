// SPA Lastro - protótipo navegável
// Dados simulados e navegação básica

const state = {
  user: null, // { perfil: 'Auditor' | 'Custodiante' | 'Administrador' | 'Gestor' }
  page: 'home',
  cicloSelecionado: null,
};

const perfis = [
  { nome: 'Auditor', icone: 'bi-shield-check' },
  { nome: 'Custodiante', icone: 'bi-bank' },
  { nome: 'Administrador', icone: 'bi-person-badge' },
  { nome: 'Gestor', icone: 'bi-briefcase' },
];

function render() {
  const app = document.getElementById('app');
  if (!state.user) {
    app.innerHTML = renderHome();
  } else {
    app.innerHTML = `
      <div class="container-fluid">
        <div class="row">
          <nav class="col-md-2 d-none d-md-block lastro-sidebar p-0">
            <div class="position-sticky pt-3">
              <ul class="nav flex-column">
                <li class="nav-item"><a class="nav-link ${state.page==='dashboard'?'active':''}" href="#" onclick="navigate('dashboard')"><i class="bi bi-speedometer2"></i> <span>Dashboard</span></a></li>
                <li class="nav-item"><a class="nav-link ${state.page==='ciclos'?'active':''}" href="#" onclick="navigate('ciclos')"><i class="bi bi-arrow-repeat"></i> <span>Ciclos</span></a></li>
                <li class="nav-item"><a class="nav-link ${state.page==='relatorios'?'active':''}" href="#" onclick="navigate('relatorios')"><i class="bi bi-file-earmark-bar-graph"></i> <span>Relatórios</span></a></li>
                <li class="nav-item"><a class="nav-link ${state.page==='validacao'?'active':''}" href="#" onclick="navigate('validacao')"><i class="bi bi-patch-check"></i> <span>Validação</span></a></li>
                <li class="nav-item"><a class="nav-link ${state.page==='usuarios'?'active':''}" href="#" onclick="navigate('usuarios')"><i class="bi bi-people"></i> <span>Usuários</span></a></li>
                <li class="nav-item mt-4"><a class="nav-link" href="#" onclick="logout()"><i class="bi bi-box-arrow-left"></i> <span>Sair</span></a></li>
              </ul>
              <div class="sidebar-profile">
                <i class="bi ${perfis.find(p=>p.nome===state.user.perfil).icone} fs-5 mb-2"></i>
                <div class="fw-medium">${state.user.perfil}</div>
              </div>
            </div>
          </nav>
          <main class="col-md-10 ms-sm-auto px-4 py-4">
            ${renderPage()}
          </main>
        </div>
      </div>
    `;
  }
}

function renderHome() {
  return `
    <div class="home-container d-flex align-items-center justify-content-center">
      <div class="home-card">
        <div class="text-center mb-4">
          <div class="lastro-logo mb-3"><i class="bi bi-shield-lock"></i> Lastro</div>
          <p class="text-muted mb-4">Plataforma XYZ para auditoria cíclica de CCBs dos fundos</p>
        </div>
        <div class="mb-4">
          <h6 class="text-center mb-3">Escolha um perfil para simular o acesso:</h6>
          <div class="d-grid gap-3">
            ${perfis.map(p=>`
              <button class="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2" onclick="login('${p.nome}')">
                <i class="bi ${p.icone}"></i> 
                <span>${p.nome}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <div class="text-center small text-muted">
          Protótipo navegável - Última atualização: 02/07/2025
        </div>
      </div>
    </div>
  `;
}

function renderPage() {
  switch(state.page) {
    case 'dashboard': return renderDashboard();
    case 'ciclos': return renderCiclos();
    case 'cicloDetalhe': return renderCicloDetalhe();
    case 'relatorios': return renderRelatorios();
    case 'validacao': return renderValidacao();
    case 'usuarios': return renderUsuarios();
    default: return renderDashboard();
  }
}

// Simulação de login
function login(perfil) {
  state.user = { perfil };
  state.page = 'dashboard';
  render();
}
function logout() {
  state.user = null;
  state.page = 'home';
  render();
}
function navigate(page) {
  state.page = page;
  render();
}

// Dashboard Geral
function renderDashboard() {
  return `
    <div class="mb-4">
      <h2 class="fw-bold mb-2"><i class="bi bi-speedometer2 me-2"></i>Dashboard Geral</h2>
      <p class="text-muted">Acompanhe o progresso das auditorias em tempo real</p>
    </div>
    <div class="row g-4 mb-4">
      <div class="col-lg-3 col-md-6">
        <div class="metric-card card">
          <div class="d-flex align-items-center">
            <div class="metric-icon" style="background: rgba(138, 5, 190, 0.1);">
              <i class="bi bi-archive fs-4" style="color: var(--nu-purple);"></i>
            </div>
            <div>
              <div class="fw-bold fs-3">12</div>
              <div class="text-muted small">Fundos auditados</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="metric-card card">
          <div class="d-flex align-items-center">
            <div class="metric-icon" style="background: rgba(16, 185, 129, 0.1);">
              <i class="bi bi-file-earmark-text fs-4" style="color: var(--nu-success);"></i>
            </div>
            <div>
              <div class="fw-bold fs-3">1.250</div>
              <div class="text-muted small">CCBs conciliadas</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="metric-card card">
          <div class="d-flex align-items-center">
            <div class="metric-icon" style="background: rgba(239, 68, 68, 0.1);">
              <i class="bi bi-exclamation-triangle fs-4" style="color: var(--nu-error);"></i>
            </div>
            <div>
              <div class="fw-bold fs-3">8</div>
              <div class="text-muted small">Divergências abertas</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="metric-card card">
          <div class="d-flex align-items-center">
            <div class="metric-icon" style="background: rgba(245, 158, 11, 0.1);">
              <i class="bi bi-clock-history fs-4" style="color: var(--nu-warning);"></i>
            </div>
            <div>
              <div class="fw-bold fs-3">72%</div>
              <div class="text-muted small">Ciclo atual</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="card p-4">
          <h5 class="fw-bold mb-3">Progresso do ciclo atual</h5>
          <div class="d-flex align-items-center mb-3">
            <div class="flex-grow-1 me-3">
              <div class="progress">
                <div class="progress-bar" style="width: 72%;" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <span class="fw-bold text-primary">72%</span>
          </div>
          <div class="small text-muted">
            <i class="bi bi-calendar-event me-1"></i>
            Previsão de término: 15/07/2025
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card p-4">
          <h5 class="fw-bold mb-3">Notificações</h5>
          <div class="d-flex flex-column gap-3">
            <div class="d-flex align-items-start">
              <div class="rounded-circle bg-warning bg-opacity-10 p-2 me-3">
                <i class="bi bi-exclamation-triangle text-warning"></i>
              </div>
              <div>
                <div class="small fw-medium">3 CCBs aguardando validação</div>
                <div class="small text-muted">Custodiante</div>
              </div>
            </div>
            <div class="d-flex align-items-start">
              <div class="rounded-circle bg-danger bg-opacity-10 p-2 me-3">
                <i class="bi bi-clock text-danger"></i>
              </div>
              <div>
                <div class="small fw-medium">2 divergências pendentes</div>
                <div class="small text-muted">Manifestação</div>
              </div>
            </div>
            <div class="d-flex align-items-start">
              <div class="rounded-circle bg-success bg-opacity-10 p-2 me-3">
                <i class="bi bi-file-earmark-check text-success"></i>
              </div>
              <div>
                <div class="small fw-medium">Relatório disponível</div>
                <div class="small text-muted">Download</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Ciclos
const ciclosMock = [
  { id: 1, nome: '2024/Q2', status: 'Ativo', inicio: '01/04/2024', fim: '30/06/2024' },
  { id: 2, nome: '2024/Q1', status: 'Encerrado', inicio: '01/01/2024', fim: '31/03/2024' },
];

function renderCiclos() {
  return `
    <div class="mb-4">
      <h2 class="fw-bold mb-2"><i class="bi bi-arrow-repeat me-2"></i>Ciclos de Auditoria</h2>
      <p class="text-muted">Gerencie e acompanhe todos os ciclos de auditoria</p>
    </div>
    <div class="card">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th class="fw-bold">Ciclo</th>
              <th class="fw-bold">Status</th>
              <th class="fw-bold">Início</th>
              <th class="fw-bold">Fim</th>
              <th class="fw-bold"></th>
            </tr>
          </thead>
          <tbody>
            ${ciclosMock.map(c=>`
              <tr>
                <td class="fw-medium">${c.nome}</td>
                <td><span class="badge bg-${c.status==='Ativo'?'success':'secondary'}">${c.status}</span></td>
                <td class="text-muted">${c.inicio}</td>
                <td class="text-muted">${c.fim}</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary" onclick="abrirCiclo(${c.id})">
                    <i class="bi bi-eye me-1"></i>Visualizar
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
function abrirCiclo(id) {
  state.cicloSelecionado = ciclosMock.find(c=>c.id===id);
  state.page = 'cicloDetalhe';
  render();
}

// Detalhes do Ciclo
const etapasCiclo = [
  { nome: 'Contratação', status: 'Concluída', data: '01/04/2024' },
  { nome: 'Upload Documentos', status: 'Concluída', data: '03/04/2024' },
  { nome: 'Cross-checking', status: 'Em andamento', data: '10/06/2024' },
  { nome: 'Relatórios', status: 'Pendente', data: '-' },
  { nome: 'Validações', status: 'Pendente', data: '-' },
  { nome: 'Encerramento', status: 'Pendente', data: '-' },
];
const ccbsMock = [
  { id: 'CCB-001', cedente: 'Banco A', valor: 'R$ 100.000', status: 'Conciliada', divergencia: 'Não' },
  { id: 'CCB-002', cedente: 'Banco B', valor: 'R$ 250.000', status: 'Divergente', divergencia: 'Sim' },
  { id: 'CCB-003', cedente: 'Banco C', valor: 'R$ 80.000', status: 'Conciliada', divergencia: 'Não' },
];
function renderCicloDetalhe() {
  const ciclo = state.cicloSelecionado;
  if (!ciclo) return '<div>Selecione um ciclo.</div>';
  return `
    <h2 class="mb-4"><i class="bi bi-calendar-check"></i> Detalhes do Ciclo ${ciclo.nome}</h2>
    <div class="mb-4">
      <strong>Status:</strong> <span class="badge bg-${ciclo.status==='Ativo'?'success':'secondary'}">${ciclo.status}</span>
      <span class="ms-3"><strong>Início:</strong> ${ciclo.inicio}</span>
      <span class="ms-3"><strong>Fim:</strong> ${ciclo.fim}</span>
    </div>
    <div class="mb-4">
      <h5>Etapas do Ciclo</h5>
      <ul class="list-group list-group-horizontal">
        ${etapasCiclo.map(e=>`<li class="list-group-item flex-fill text-center">
          ${e.nome}<br>
          <span class="badge bg-${e.status==='Concluída'?'success':e.status==='Em andamento'?'info':'secondary'} badge-status">${e.status}</span><br>
          <span class="small text-muted">${e.data}</span>
        </li>`).join('')}
      </ul>
    </div>
    <div>
      <h5>CCBs do Ciclo</h5>
      <div class="table-responsive">
        <table class="table table-bordered table-sm align-middle">
          <thead><tr><th>ID</th><th>Cedente</th><th>Valor</th><th>Status</th><th>Divergência</th><th>Ações</th></tr></thead>
          <tbody>
            ${ccbsMock.map(ccb=>`
              <tr>
                <td>${ccb.id}</td>
                <td>${ccb.cedente}</td>
                <td>${ccb.valor}</td>
                <td><span class="badge bg-${ccb.status==='Conciliada'?'success':'danger'}">${ccb.status}</span></td>
                <td>${ccb.divergencia}</td>
                <td><button class="btn btn-sm btn-outline-secondary">Detalhar</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <button class="btn btn-link mt-3" onclick="navigate('ciclos')"><i class="bi bi-arrow-left"></i> Voltar para ciclos</button>
  `;
}

// Relatórios
function renderRelatorios() {
  return `
    <div class="mb-4">
      <h2 class="fw-bold mb-2"><i class="bi bi-file-earmark-bar-graph me-2"></i>Relatórios</h2>
      <p class="text-muted">Visualize e baixe relatórios detalhados das auditorias</p>
    </div>
    <div class="card p-4 mb-4">
      <h5 class="fw-bold mb-3">Downloads Disponíveis</h5>
      <div class="d-flex gap-3">
        <button class="btn btn-primary d-flex align-items-center gap-2" onclick="alert('Download simulado!')">
          <i class="bi bi-file-earmark-pdf"></i>
          <span>PDF Analítico</span>
        </button>
        <button class="btn btn-outline-primary d-flex align-items-center gap-2" onclick="alert('Download simulado!')">
          <i class="bi bi-file-earmark-pdf"></i>
          <span>PDF Sumarizado</span>
        </button>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card p-4 text-center">
          <div class="metric-icon mx-auto mb-3" style="background: rgba(138, 5, 190, 0.1);">
            <i class="bi bi-archive fs-4" style="color: var(--nu-purple);"></i>
          </div>
          <div class="fw-bold fs-2 text-primary">1.250</div>
          <div class="text-muted">Ativos no ciclo</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-4 text-center">
          <div class="metric-icon mx-auto mb-3" style="background: rgba(16, 185, 129, 0.1);">
            <i class="bi bi-check-circle fs-4" style="color: var(--nu-success);"></i>
          </div>
          <div class="fw-bold fs-2 text-success">92%</div>
          <div class="text-muted">% Conciliados</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-4 text-center">
          <div class="metric-icon mx-auto mb-3" style="background: rgba(239, 68, 68, 0.1);">
            <i class="bi bi-exclamation-triangle fs-4" style="color: var(--nu-error);"></i>
          </div>
          <div class="fw-bold fs-2 text-danger">8</div>
          <div class="text-muted">Divergências</div>
          <div class="small text-muted mt-1">3 cadastrais, 5 valores</div>
        </div>
      </div>
    </div>
  `;
}

// Validação/Aprovação
const divergenciasMock = [
  { id: 1, ccb: 'CCB-002', tipo: 'Valor', status: 'Pendente', historico: [
    { data: '01/06/2024', acao: 'Aberta', por: 'Auditor' },
  ] },
];
function renderValidacao() {
  return `
    <h2 class="mb-4"><i class="bi bi-patch-check"></i> Validação / Aprovação</h2>
    <div class="table-responsive mb-4">
      <table class="table table-bordered align-middle">
        <thead><tr><th>CCB</th><th>Tipo</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>
          ${divergenciasMock.map(d=>`
            <tr>
              <td>${d.ccb}</td>
              <td>${d.tipo}</td>
              <td><span class="badge bg-warning text-dark">${d.status}</span></td>
              <td>
                <button class="btn btn-sm btn-success me-1" onclick="manifestar(${d.id},'Aprovada')"><i class="bi bi-check2"></i> Aprovar</button>
                <button class="btn btn-sm btn-danger me-1" onclick="manifestar(${d.id},'Rejeitada')"><i class="bi bi-x"></i> Rejeitar</button>
                <button class="btn btn-sm btn-secondary" onclick="manifestar(${d.id},'Comentada')"><i class="bi bi-chat"></i> Comentar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div>
      <h5>Histórico de manifestações</h5>
      <ul class="list-group">
        ${divergenciasMock[0].historico.map(h=>`<li class="list-group-item">${h.data}: ${h.acao} por ${h.por}</li>`).join('')}
      </ul>
    </div>
  `;
}
function manifestar(id, acao) {
  const d = divergenciasMock.find(x=>x.id===id);
  d.historico.push({ data: new Date().toLocaleDateString(), acao, por: state.user.perfil });
  alert(`Manifestação registrada: ${acao}`);
  render();
}

// Usuários e Perfis (opcional)
function renderUsuarios() {
  return `
    <h2 class="mb-4"><i class="bi bi-people"></i> Usuários e Perfis</h2>
    <div class="row g-4">
      ${perfis.map(p=>`
        <div class="col-md-3">
          <div class="card p-3 text-center">
            <i class="bi ${p.icone} fs-1 mb-2"></i>
            <div class="fw-bold">${p.nome}</div>
            <div class="small text-muted">${p.nome==='Auditor'?'Acesso total':p.nome==='Custodiante'?'Visualiza apenas seu fundo':'Acesso parcial'}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="mt-4">
      <span class="badge bg-primary">Auditor</span>
      <span class="badge bg-secondary">Custodiante</span>
      <span class="badge bg-info text-dark">Administrador</span>
      <span class="badge bg-dark">Gestor</span>
    </div>
  `;
}

// Inicialização
window.login = login;
window.logout = logout;
window.navigate = navigate;
window.abrirCiclo = abrirCiclo;
window.manifestar = manifestar;

document.addEventListener('DOMContentLoaded', render);
