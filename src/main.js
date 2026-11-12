import './style.css';
import { MOCK_LEADS, NOTIFICATIONS, MODEL_METRICS, ADMIN_USERS } from './data.js';

// =========================================
// State
// =========================================
const state = {
  currentPage: 'login',
  currentUser: null,
  leads: [...MOCK_LEADS],
  filterCategory: 'all',
  searchQuery: '',
  sortCol: 'score',
  sortDir: 'desc',
  currentPage_num: 1,
  perPage: 6,
  notifOpen: false,
  selectedLead: null,
  predictResult: null,
};

// =========================================
// Router
// =========================================
function navigate(page) {
  state.currentPage = page;
  state.notifOpen = false;
  render();
}

// =========================================
// Helpers
// =========================================
function getCategoryColor(cat) {
  return { hot: '#f43f5e', warm: '#f59e0b', cold: '#38bdf8' }[cat] || '#6366f1';
}
function getCategoryEmoji(cat) {
  return { hot: '🔥', warm: '☀️', cold: '❄️' }[cat] || '⚡';
}
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}
function avatarBg(idx) {
  const palettes = [
    'linear-gradient(135deg,#6366f1,#8b5cf6)',
    'linear-gradient(135deg,#22d3ee,#06b6d4)',
    'linear-gradient(135deg,#f43f5e,#e11d48)',
    'linear-gradient(135deg,#f59e0b,#d97706)',
    'linear-gradient(135deg,#10b981,#059669)',
    'linear-gradient(135deg,#8b5cf6,#ec4899)',
    'linear-gradient(135deg,#06b6d4,#6366f1)',
    'linear-gradient(135deg,#f43f5e,#f59e0b)',
  ];
  return palettes[idx % palettes.length];
}
function simulatePrediction(fields) {
  const score = Math.min(99, Math.max(5,
    (fields.prevPurchase === 'yes' ? 30 : 0) +
    Math.round(fields.visits * 4.5) +
    Math.round(fields.interactions * 5) +
    (fields.email === 'high' ? 20 : fields.email === 'medium' ? 10 : 2) +
    Math.round(fields.timeSpent * 0.8) +
    Math.floor(Math.random() * 8)
  ));
  const category = score >= 70 ? 'hot' : score >= 45 ? 'warm' : 'cold';
  return {
    score, category,
    factors: [
      { name: 'Previous Purchase', pct: fields.prevPurchase === 'yes' ? 95 : 15 },
      { name: 'Website Visits', pct: Math.min(99, fields.visits * 10) },
      { name: 'Product Interactions', pct: Math.min(99, fields.interactions * 11) },
      { name: 'Email Engagement', pct: fields.email === 'high' ? 85 : fields.email === 'medium' ? 55 : 20 },
    ],
    recommendation: score >= 70
      ? 'Prioritise this lead for a personal follow-up call within 24 hours. High intent signals detected.'
      : score >= 45
        ? 'Send a targeted product demo invite and relevant case studies. Book a discovery call.'
        : 'Add to a nurture campaign with educational content. Re-evaluate in 30 days.',
  };
}

// =========================================
// Render Root
// =========================================
function render() {
  const app = document.getElementById('app');
  if (state.currentPage === 'login') {
    app.innerHTML = renderLogin();
    attachLoginListeners();
  } else {
    app.innerHTML = renderShell();
    attachShellListeners();
    renderPage();
  }
}

// =========================================
// LOGIN PAGE
// =========================================
function renderLogin() {
  return `
  <div class="login-bg">
    <div class="login-card">
      <div class="login-logo">
        <div class="login-logo-icon">⚡</div>
        <span class="login-logo-text">LeadIQ</span>
      </div>
      <h1 class="login-title">Welcome back</h1>
      <p class="login-subtitle">Sign in to your lead scoring dashboard</p>

      <div class="login-role-tabs" id="roleTabs">
        <button class="role-tab active" data-role="sales" id="tab-sales">Sales User</button>
        <button class="role-tab" data-role="admin" id="tab-admin">Admin</button>
      </div>

      <form id="loginForm">
        <div class="form-group">
          <label class="form-label" for="email">Email address</label>
          <input class="form-input" type="email" id="loginEmail" placeholder="you@company.com" value="sales@leadiq.app" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <input class="form-input" type="password" id="loginPassword" placeholder="••••••••" value="••••••••" required />
        </div>
        <button type="submit" class="btn-primary" id="loginBtn">Sign In →</button>
      </form>
      <p class="login-hint">Use any credentials to continue • <span id="demoHint">Demo mode active</span></p>
    </div>
  </div>`;
}
function attachLoginListeners() {
  let selectedRole = 'sales';
  document.querySelectorAll('.role-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedRole = tab.dataset.role;
    });
  });
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    btn.textContent = 'Signing in…';
    btn.disabled = true;
    setTimeout(() => {
      state.currentUser = { name: selectedRole === 'admin' ? 'Admin User' : 'Sneha Patel', role: selectedRole };
      navigate('dashboard');
    }, 800);
  });
}

// =========================================
// SHELL
// =========================================
function renderShell() {
  const user = state.currentUser;
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'leads', icon: '👥', label: 'All Leads', badge: state.leads.filter(l => l.category === 'hot').length },
    { id: 'predict', icon: '🤖', label: 'Score a Lead' },
    { id: 'model', icon: '📈', label: 'Model Performance' },
    ...(user.role === 'admin' ? [{ id: 'admin', icon: '⚙️', label: 'Admin Panel' }] : []),
  ];
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;
  return `
  <div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <div class="sidebar-logo-icon">⚡</div>
        <span class="sidebar-logo-text">LeadIQ</span>
      </div>
      <nav class="sidebar-nav">
        <span class="sidebar-section-label">Main</span>
        ${navItems.map(item => `
          <div class="nav-item ${state.currentPage === item.id ? 'active' : ''}" data-nav="${item.id}">
            <span class="nav-icon">${item.icon}</span>
            <span>${item.label}</span>
            ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
          </div>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user" id="logoutBtn" title="Click to logout">
          <div class="user-avatar">${getInitials(user.name)}</div>
          <div class="user-info">
            <div class="user-name">${user.name}</div>
            <div class="user-role">${user.role === 'admin' ? 'Administrator' : 'Sales User'} • Logout</div>
          </div>
        </div>
      </div>
    </aside>

    <div class="main-content">
      <header class="topbar">
        <span class="topbar-title" id="topbarTitle">${getPageTitle()}</span>
        <div class="topbar-search">
          <span class="search-icon">🔍</span>
          <input type="text" id="globalSearch" placeholder="Search leads…" value="${state.searchQuery}" />
        </div>
        <div class="topbar-actions">
          <div class="icon-btn" id="notifBtn" style="position:relative">
            🔔
            ${unreadCount ? `<span class="notif-dot"></span>` : ''}
            ${state.notifOpen ? renderNotifDropdown() : ''}
          </div>
          <div class="icon-btn">🌙</div>
        </div>
      </header>
      <div class="page-content" id="pageContent"></div>
    </div>
  </div>`;
}
function getPageTitle() {
  const titles = {
    dashboard: 'Dashboard',
    leads: 'All Leads',
    predict: 'Score a Lead',
    model: 'Model Performance',
    admin: 'Admin Panel',
  };
  return titles[state.currentPage] || 'LeadIQ';
}
function attachShellListeners() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });
  document.getElementById('logoutBtn').addEventListener('click', () => {
    state.currentUser = null;
    navigate('login');
  });
  const notifBtn = document.getElementById('notifBtn');
  if (notifBtn) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.notifOpen = !state.notifOpen;
      render();
    });
  }
  document.addEventListener('click', () => {
    if (state.notifOpen) { state.notifOpen = false; render(); }
  }, { once: true });
  const search = document.getElementById('globalSearch');
  if (search) {
    search.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (state.currentPage !== 'leads') navigate('leads');
      else renderPage();
    });
  }
}

// =========================================
// NOTIFICATIONS DROPDOWN
// =========================================
function renderNotifDropdown() {
  return `
  <div class="notif-dropdown" id="notifDropdown">
    <div class="notif-header">
      <span class="notif-header-title">Notifications</span>
      <span class="notif-mark-all">Mark all read</span>
    </div>
    <div class="notif-list">
      ${NOTIFICATIONS.map(n => `
        <div class="notif-item ${n.read ? '' : 'unread'}">
          ${n.read ? '' : '<div class="notif-dot-item"></div>'}
          <div>
            <div class="notif-text">${n.text}</div>
            <div class="notif-time">${n.time}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

// =========================================
// PAGE RENDER DISPATCHER
// =========================================
function renderPage() {
  const content = document.getElementById('pageContent');
  if (!content) return;
  const pages = {
    dashboard: renderDashboard,
    leads: renderLeads,
    predict: renderPredict,
    model: renderModel,
    admin: renderAdmin,
  };
  content.innerHTML = (pages[state.currentPage] || renderDashboard)();
  attachPageListeners();
}

// =========================================
// DASHBOARD PAGE
// =========================================
function renderDashboard() {
  const hot = state.leads.filter(l => l.category === 'hot').length;
  const warm = state.leads.filter(l => l.category === 'warm').length;
  const cold = state.leads.filter(l => l.category === 'cold').length;
  const total = state.leads.length;
  const avgScore = Math.round(state.leads.reduce((a, l) => a + l.score, 0) / total);

  const months = MODEL_METRICS.monthlyConversion;
  const maxTotal = Math.max(...months.map(m => m.total));

  return `
  <div class="stat-grid">
    <div class="stat-card c-indigo">
      <div class="stat-icon c-indigo">👥</div>
      <div class="stat-value">${total}</div>
      <div class="stat-label">Total Leads</div>
      <div class="stat-change up">↑ 12% this week</div>
    </div>
    <div class="stat-card c-hot">
      <div class="stat-icon c-hot">🔥</div>
      <div class="stat-value">${hot}</div>
      <div class="stat-label">Hot Leads</div>
      <div class="stat-change up">↑ 2 since yesterday</div>
    </div>
    <div class="stat-card c-cyan">
      <div class="stat-icon c-cyan">📊</div>
      <div class="stat-value">${avgScore}%</div>
      <div class="stat-label">Avg. Score</div>
      <div class="stat-change up">↑ 3.2 pts this month</div>
    </div>
    <div class="stat-card c-green">
      <div class="stat-icon c-green">✅</div>
      <div class="stat-value">91.2%</div>
      <div class="stat-label">Model Accuracy</div>
      <div class="stat-change up">XGBoost best</div>
    </div>
  </div>

  <div class="dashboard-grid">
    <div class="dashboard-left">
      <!-- Conversion Trend -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Conversion Trend</div>
            <div class="card-subtitle">Monthly leads converted vs. total</div>
          </div>
          <span class="card-action" data-nav="model">View report →</span>
        </div>
        <div class="chart-area">
          <div class="chart-bars">
            ${months.map(m => `
              <div class="chart-bar-group">
                <div style="display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end">
                  <div title="${m.converted} converted"
                       style="width:100%;border-radius:6px 6px 0 0;background:linear-gradient(to top,#6366f1,#818cf8);height:${Math.round((m.converted/maxTotal)*180)}px;cursor:pointer;transition:opacity 0.2s"
                       onmouseover="this.style.opacity='0.75'" onmouseout="this.style.opacity='1'">
                  </div>
                  <div class="chart-bar-label">${m.month}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Recent Hot Leads -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Hot Leads – Priority Queue</div>
            <div class="card-subtitle">Requires immediate action</div>
          </div>
          <span class="card-action" data-nav="leads">View all →</span>
        </div>
        ${state.leads.filter(l => l.category === 'hot').map((lead, idx) => `
          <div style="display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--border);" class="hot-lead-row" data-id="${lead.id}">
            <div class="lead-avatar" style="background:${avatarBg(idx)}">${getInitials(lead.name)}</div>
            <div style="flex:1;min-width:0">
              <div style="font-size:14px;font-weight:600;color:var(--text-primary)">${lead.name}</div>
              <div style="font-size:12px;color:var(--text-muted)">${lead.company} • ${lead.industry}</div>
            </div>
            <div>
              <div style="font-size:18px;font-weight:800;color:#fb7185;font-family:var(--font-mono)">${lead.score}%</div>
              <div class="badge badge-hot badge-pulse">🔥 HOT</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="dashboard-right">
      <!-- Lead Distribution Donut -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Lead Distribution</div>
        </div>
        <div class="donut-wrap" style="justify-content:center">
          <svg class="donut-svg" width="130" height="130" viewBox="0 0 130 130">
            ${renderDonut(hot, warm, cold)}
            <text x="65" y="61" text-anchor="middle" font-size="22" font-weight="800" fill="#f1f5f9">${total}</text>
            <text x="65" y="78" text-anchor="middle" font-size="11" fill="#94a3b8">Total</text>
          </svg>
          <div class="donut-legend">
            <div class="legend-item">
              <div class="legend-dot" style="background:#f43f5e"></div>
              <span>Hot</span>
              <span class="legend-value">${hot}</span>
            </div>
            <div class="legend-item">
              <div class="legend-dot" style="background:#f59e0b"></div>
              <span>Warm</span>
              <span class="legend-value">${warm}</span>
            </div>
            <div class="legend-item">
              <div class="legend-dot" style="background:#38bdf8"></div>
              <span>Cold</span>
              <span class="legend-value">${cold}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pipeline Funnel -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Sales Funnel</div>
        </div>
        <div class="funnel">
          ${[
            { label: 'Contacted', count: total, pct: 100, color: '#6366f1' },
            { label: 'Qualified', count: hot + warm, pct: Math.round(((hot+warm)/total)*100), color: '#22d3ee' },
            { label: 'Demo Booked', count: Math.round((hot+warm)*0.6), pct: Math.round(((hot+warm)*0.6/total)*100), color: '#f59e0b' },
            { label: 'Proposal', count: Math.round(hot*0.8), pct: Math.round((hot*0.8/total)*100), color: '#10b981' },
            { label: 'Closed Won', count: Math.round(hot*0.5), pct: Math.round((hot*0.5/total)*100), color: '#f43f5e' },
          ].map(s => `
            <div class="funnel-stage">
              <div class="funnel-label">${s.label}</div>
              <div class="funnel-bar-wrap">
                <div class="funnel-bar" style="width:${s.pct}%;background:${s.color}">${s.pct}%</div>
              </div>
              <div class="funnel-count">${s.count}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quick actions -->
      <div class="card">
        <div class="card-title" style="margin-bottom:14px">Quick Actions</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <button class="btn-add" style="justify-content:flex-start" data-nav="predict">🤖 Score a New Lead</button>
          <button class="filter-btn" style="width:100%;justify-content:flex-start" data-nav="leads">👥 View All Leads</button>
          <button class="filter-btn" style="width:100%;justify-content:flex-start" data-nav="model">📈 Model Performance</button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderDonut(hot, warm, cold) {
  const total = hot + warm + cold;
  const r = 50; const cx = 65; const cy = 65;
  const circumference = 2 * Math.PI * r;
  const segments = [
    { count: hot,  color: '#f43f5e' },
    { count: warm, color: '#f59e0b' },
    { count: cold, color: '#38bdf8' },
  ];
  let offset = -circumference / 4;
  return segments.map(s => {
    const dash = (s.count / total) * circumference;
    const gap = circumference - dash;
    const el = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="18"
      stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${offset}" />`;
    offset -= dash;
    return el;
  }).join('');
}

// =========================================
// LEADS PAGE
// =========================================
function renderLeads() {
  let leads = [...state.leads];

  // Filter
  if (state.filterCategory !== 'all') {
    leads = leads.filter(l => l.category === state.filterCategory);
  }
  // Search
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    leads = leads.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.company.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.industry.toLowerCase().includes(q)
    );
  }
  // Sort
  leads.sort((a, b) => {
    const dir = state.sortDir === 'asc' ? 1 : -1;
    if (state.sortCol === 'score') return dir * (a.score - b.score);
    if (state.sortCol === 'name') return dir * a.name.localeCompare(b.name);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(leads.length / state.perPage);
  const page = Math.min(state.currentPage_num, Math.max(1, totalPages));
  const paginated = leads.slice((page - 1) * state.perPage, page * state.perPage);

  return `
  <div class="card" style="padding-bottom:8px">
    <div class="table-toolbar">
      <div class="table-search">
        <span>🔍</span>
        <input type="text" id="leadSearch" placeholder="Search by name, company, email…" value="${state.searchQuery}" />
      </div>
      ${['all', 'hot', 'warm', 'cold'].map(cat => `
        <button class="filter-btn ${state.filterCategory === cat ? 'active' : ''}" data-filter="${cat}">
          ${cat === 'all' ? '🔎 All' : cat === 'hot' ? '🔥 Hot' : cat === 'warm' ? '☀️ Warm' : '❄️ Cold'}
        </button>
      `).join('')}
      <button class="btn-add" data-nav="predict">+ Score Lead</button>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th data-sort="name" class="${state.sortCol === 'name' ? 'sorted' : ''}">Lead <span class="sort-arrow">${state.sortCol === 'name' ? (state.sortDir === 'asc' ? '↑' : '↓') : '↕'}</span></th>
            <th>Company</th>
            <th>Source</th>
            <th>Industry</th>
            <th data-sort="score" class="${state.sortCol === 'score' ? 'sorted' : ''}">Score <span class="sort-arrow">${state.sortCol === 'score' ? (state.sortDir === 'asc' ? '↑' : '↓') : '↕'}</span></th>
            <th>Category</th>
            <th>Last Activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${paginated.length === 0
            ? `<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-title">No leads found</div><div class="empty-desc">Try adjusting your search or filters</div></div></td></tr>`
            : paginated.map((lead, idx) => `
            <tr>
              <td>
                <div class="td-name">
                  <div class="lead-avatar" style="background:${avatarBg(idx)}">${getInitials(lead.name)}</div>
                  <div>
                    <div>${lead.name}</div>
                    <div style="font-size:11px;color:var(--text-muted)">${lead.email}</div>
                  </div>
                </div>
              </td>
              <td>${lead.company}</td>
              <td>${lead.source}</td>
              <td>${lead.industry}</td>
              <td>
                <span class="td-score" style="color:${getCategoryColor(lead.category)}">${lead.score}%</span>
                <span class="score-bar-wrap">
                  <span class="score-bar" style="width:${lead.score}%;background:${getCategoryColor(lead.category)}"></span>
                </span>
              </td>
              <td>
                <span class="badge badge-${lead.category} ${lead.category === 'hot' ? 'badge-pulse' : ''}">
                  ${getCategoryEmoji(lead.category)} ${lead.category.toUpperCase()}
                </span>
              </td>
              <td style="color:var(--text-muted)">${lead.lastActivity}</td>
              <td>
                <div class="td-actions">
                  <button class="action-btn view" data-view="${lead.id}" title="View details">👁</button>
                  <button class="action-btn predict" data-predict="${lead.id}" title="Re-score">🤖</button>
                  <button class="action-btn del" data-del="${lead.id}" title="Delete">🗑</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span>Showing ${Math.min((page-1)*state.perPage+1, leads.length)}–${Math.min(page*state.perPage, leads.length)} of ${leads.length} leads</span>
      <div class="pag-btns">
        <button class="pag-btn" data-pag="prev" ${page <= 1 ? 'disabled' : ''}>‹</button>
        ${Array.from({length: totalPages}, (_, i) => `
          <button class="pag-btn ${i+1 === page ? 'active' : ''}" data-pag="${i+1}">${i+1}</button>
        `).join('')}
        <button class="pag-btn" data-pag="next" ${page >= totalPages ? 'disabled' : ''}>›</button>
      </div>
    </div>
  </div>

  ${state.selectedLead ? renderLeadModal(state.selectedLead) : ''}`;
}

function renderLeadModal(lead) {
  return `
  <div class="modal-overlay" id="modalOverlay">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">Lead Details</h2>
        <div class="modal-close" id="modalClose">✕</div>
      </div>
      <div class="modal-body">
        <div class="modal-score-hero ${lead.category}">
          <div style="font-size:40px;margin-bottom:8px">${getCategoryEmoji(lead.category)}</div>
          <div style="font-size:48px;font-weight:900;font-family:var(--font-mono);color:${getCategoryColor(lead.category)}">${lead.score}%</div>
          <div class="badge badge-${lead.category}" style="margin:8px auto;display:inline-flex">${lead.category.toUpperCase()}</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:8px">Conversion Probability</div>
        </div>

        <div class="modal-fields">
          <div class="modal-field">
            <div class="modal-field-label">Full Name</div>
            <div class="modal-field-value">${lead.name}</div>
          </div>
          <div class="modal-field">
            <div class="modal-field-label">Company</div>
            <div class="modal-field-value">${lead.company}</div>
          </div>
          <div class="modal-field">
            <div class="modal-field-label">Email</div>
            <div class="modal-field-value" style="font-size:12px">${lead.email}</div>
          </div>
          <div class="modal-field">
            <div class="modal-field-label">Phone</div>
            <div class="modal-field-value">${lead.phone}</div>
          </div>
          <div class="modal-field">
            <div class="modal-field-label">Source</div>
            <div class="modal-field-value">${lead.source}</div>
          </div>
          <div class="modal-field">
            <div class="modal-field-label">Industry</div>
            <div class="modal-field-value">${lead.industry}</div>
          </div>
          <div class="modal-field">
            <div class="modal-field-label">Website Visits</div>
            <div class="modal-field-value">${lead.websiteVisits}</div>
          </div>
          <div class="modal-field">
            <div class="modal-field-label">Email Engagement</div>
            <div class="modal-field-value">${lead.emailEngagement}</div>
          </div>
          <div class="modal-field">
            <div class="modal-field-label">Product Interactions</div>
            <div class="modal-field-value">${lead.productInteractions}</div>
          </div>
          <div class="modal-field">
            <div class="modal-field-label">Previous Purchase</div>
            <div class="modal-field-value">${lead.prevPurchase ? '✅ Yes' : '❌ No'}</div>
          </div>
        </div>

        <div style="margin-top:20px">
          <div class="result-factors-title" style="font-size:12px;font-weight:600;color:var(--text-muted);letter-spacing:0.8px;text-transform:uppercase;margin-bottom:12px">Key Factors</div>
          ${lead.factors.map(f => `
            <div class="factor-row">
              <div class="factor-name">${f.name}</div>
              <div class="factor-bar-wrap">
                <div class="factor-bar" style="width:${f.pct}%;background:${getCategoryColor(lead.category)}"></div>
              </div>
              <div class="factor-pct">${f.pct}%</div>
            </div>
          `).join('')}
        </div>

        <div class="result-recommendation" style="margin-top:20px">
          <div class="result-rec-label">🎯 Recommended Action</div>
          ${lead.recommendation}
        </div>
      </div>
    </div>
  </div>`;
}

// =========================================
// PREDICT PAGE
// =========================================
function renderPredict() {
  const r = state.predictResult;
  return `
  <div class="predict-layout">
    <!-- Form -->
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">🤖 Lead Scoring Engine</div>
          <div class="card-subtitle">Enter lead details to predict conversion probability</div>
        </div>
      </div>
      <form id="predictForm">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Lead Name</label>
            <input class="form-input" type="text" id="pName" placeholder="e.g. John Doe" />
          </div>
          <div class="form-group">
            <label class="form-label">Company</label>
            <input class="form-input" type="text" id="pCompany" placeholder="e.g. Acme Corp" />
          </div>
          <div class="form-group">
            <label class="form-label">Industry</label>
            <select class="form-select" id="pIndustry">
              <option value="">Select industry…</option>
              <option>SaaS</option><option>FinTech</option><option>HealthTech</option>
              <option>EdTech</option><option>Retail</option><option>Logistics</option>
              <option>Analytics</option><option>Construction</option><option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Lead Source</label>
            <select class="form-select" id="pSource">
              <option value="">Select source…</option>
              <option>Website</option><option>LinkedIn</option><option>Referral</option>
              <option>Cold Email</option><option>Webinar</option><option>Trade Show</option><option>Blog</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Email Engagement</label>
            <select class="form-select" id="pEmail">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Previous Purchase</label>
            <select class="form-select" id="pPrevPurchase">
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Website Visits <span id="visitsVal" style="color:var(--accent-glow);font-family:var(--font-mono)">0</span></label>
            <div class="range-wrap">
              <input type="range" class="range-input" id="pVisits" min="0" max="20" value="0" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Product Interactions <span id="interVal" style="color:var(--accent-glow);font-family:var(--font-mono)">0</span></label>
            <div class="range-wrap">
              <input type="range" class="range-input" id="pInteractions" min="0" max="15" value="0" />
            </div>
          </div>

          <div class="form-group span-2">
            <label class="form-label">Time Spent on Site (min) <span id="timeVal" style="color:var(--accent-glow);font-family:var(--font-mono)">0</span></label>
            <div class="range-wrap">
              <input type="range" class="range-input" id="pTime" min="0" max="60" value="0" />
            </div>
          </div>
        </div>

        <button type="submit" class="predict-btn" id="predictBtn">
          <span>⚡ Predict Conversion Score</span>
        </button>
      </form>
    </div>

    <!-- Result Panel -->
    <div>
      ${r ? renderPredictResult(r) : `
        <div class="card" style="text-align:center;padding:48px 24px">
          <div style="font-size:48px;margin-bottom:16px;opacity:0.4">🤖</div>
          <div style="font-size:15px;font-weight:600;color:var(--text-secondary);margin-bottom:8px">Score Not Calculated Yet</div>
          <div style="font-size:13px;color:var(--text-muted);line-height:1.6">Fill in the lead details on the left and click <strong style="color:var(--accent-glow)">Predict</strong> to see the ML model's output.</div>
        </div>
      `}
    </div>
  </div>`;
}

function renderPredictResult(r) {
  return `
  <div class="result-card ${r.category}">
    <div class="result-emoji">${getCategoryEmoji(r.category)}</div>
    <div class="result-label ${r.category}">${r.category.toUpperCase()} LEAD</div>
    <div class="result-prob ${r.category}">${r.score}%</div>
    <div class="result-prob-label">Conversion Probability</div>

    <div class="result-factors">
      <div class="result-factors-title">🧠 Key Factors (SHAP)</div>
      ${r.factors.map(f => `
        <div class="factor-row">
          <div class="factor-name">${f.name}</div>
          <div class="factor-bar-wrap">
            <div class="factor-bar" style="width:${f.pct}%;background:${getCategoryColor(r.category)}"></div>
          </div>
          <div class="factor-pct">${f.pct}%</div>
        </div>
      `).join('')}
    </div>

    <div class="result-recommendation">
      <div class="result-rec-label">🎯 Recommended Action</div>
      ${r.recommendation}
    </div>
  </div>`;
}

// =========================================
// MODEL PERFORMANCE PAGE
// =========================================
function renderModel() {
  const m = MODEL_METRICS;
  return `
  <div class="metrics-grid">
    ${[
      { label: 'Accuracy', value: m.accuracy + '%', color: '#6366f1' },
      { label: 'Precision', value: m.precision + '%', color: '#22d3ee' },
      { label: 'Recall', value: m.recall + '%', color: '#f59e0b' },
      { label: 'F1-Score', value: m.f1 + '%', color: '#10b981' },
    ].map(metric => `
      <div class="metric-card">
        <div class="metric-value" style="color:${metric.color}">${metric.value}</div>
        <div class="metric-label">${metric.label}</div>
      </div>
    `).join('')}
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
    <!-- ROC AUC -->
    <div class="card">
      <div class="card-title" style="margin-bottom:16px">ROC-AUC Score</div>
      <div style="text-align:center;padding:20px 0">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="60" fill="none" stroke="var(--bg-elevated)" stroke-width="16"/>
          <circle cx="80" cy="80" r="60" fill="none" stroke="url(#rocGrad)" stroke-width="16"
            stroke-dasharray="${m.rocAuc * 2 * Math.PI * 60} ${(1 - m.rocAuc) * 2 * Math.PI * 60}"
            stroke-dashoffset="${-2 * Math.PI * 60 / 4}"
            stroke-linecap="round"/>
          <defs>
            <linearGradient id="rocGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#6366f1"/>
              <stop offset="100%" stop-color="#22d3ee"/>
            </linearGradient>
          </defs>
          <text x="80" y="75" text-anchor="middle" font-size="26" font-weight="800" fill="#f1f5f9">${m.rocAuc}</text>
          <text x="80" y="95" text-anchor="middle" font-size="12" fill="#94a3b8">ROC-AUC</text>
        </svg>
        <div style="font-size:13px;color:var(--text-muted);margin-top:8px">XGBoost – Best performing model</div>
      </div>
    </div>

    <!-- Confusion Matrix -->
    <div class="card">
      <div class="card-title" style="margin-bottom:16px">Confusion Matrix</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;border-radius:var(--radius-md);overflow:hidden">
        <div class="cm-cell tp">
          <div class="cm-value" style="color:var(--accent-green)">${m.confusion.tp}</div>
          <div class="cm-label">True Positive</div>
        </div>
        <div class="cm-cell fp">
          <div class="cm-value" style="color:var(--accent-hot)">${m.confusion.fp}</div>
          <div class="cm-label">False Positive</div>
        </div>
        <div class="cm-cell fn">
          <div class="cm-value" style="color:var(--accent-hot)">${m.confusion.fn}</div>
          <div class="cm-label">False Negative</div>
        </div>
        <div class="cm-cell tn">
          <div class="cm-value" style="color:var(--accent-green)">${m.confusion.tn}</div>
          <div class="cm-label">True Negative</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Model Comparison -->
  <div class="card">
    <div class="card-header">
      <div>
        <div class="card-title">Algorithm Comparison</div>
        <div class="card-subtitle">ROC-AUC score comparison across all tested models</div>
      </div>
    </div>
    <div class="model-compare">
      ${m.models.map(model => `
        <div class="model-row ${model.best ? 'best' : ''}">
          <div class="model-name">${model.name}${model.best ? ' ⭐' : ''}</div>
          <div class="model-bar-wrap">
            <div class="model-bar" style="width:${model.bar}%;background:${model.color}"></div>
          </div>
          <div class="model-pct" style="color:${model.color}">${model.auc}</div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

// =========================================
// ADMIN PAGE
// =========================================
function renderAdmin() {
  return `
  <div class="admin-grid">
    <!-- User Management -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">User Management</div>
        <button class="btn-add" style="font-size:12px;padding:6px 12px">+ Add User</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            ${ADMIN_USERS.map(u => `
              <tr class="user-table-row">
                <td>
                  <div class="td-name">
                    <div class="lead-avatar" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);width:28px;height:28px;font-size:11px">${getInitials(u.name)}</div>
                    <div>
                      <div style="font-size:13px">${u.name}</div>
                      <div style="font-size:11px;color:var(--text-muted)">${u.email}</div>
                    </div>
                  </div>
                </td>
                <td><span class="badge ${u.role === 'Admin' ? 'badge-new' : ''}" style="${u.role !== 'Admin' ? 'background:rgba(255,255,255,0.05);color:var(--text-secondary);border:1px solid var(--border)' : ''}">${u.role}</span></td>
                <td><span class="user-status ${u.status}"></span>${u.status}</td>
                <td>
                  <div class="toggle-switch" data-toggle="${u.id}">
                    <div class="toggle-track ${u.active ? 'on' : ''}">
                      <div class="toggle-thumb"></div>
                    </div>
                    <span class="toggle-label">${u.active ? 'On' : 'Off'}</span>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Dataset Upload -->
    <div class="card">
      <div class="card-title" style="margin-bottom:16px">Dataset Management</div>
      <div class="upload-zone" id="uploadZone">
        <div class="upload-icon">📂</div>
        <div class="upload-title">Upload Dataset</div>
        <div class="upload-hint">Drag & drop a CSV or <span>browse files</span></div>
      </div>
      <div style="margin-top:16px;padding:14px;background:var(--bg-elevated);border-radius:var(--radius-md);border:1px solid var(--border)">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span style="font-size:13px;color:var(--text-secondary)">Current dataset</span>
          <span style="font-size:12px;color:var(--accent-green)">✓ Active</span>
        </div>
        <div style="font-size:14px;font-weight:600">lead_data_2026_v3.csv</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px">500 rows • 12 features • Uploaded Oct 25, 2026</div>
      </div>
    </div>

    <!-- System Settings -->
    <div class="card">
      <div class="card-title" style="margin-bottom:16px">System Settings</div>
      ${[
        { label: 'Enable Email Notifications', on: true },
        { label: 'Auto-retrain Model Monthly', on: true },
        { label: 'Allow CSV Export by Sales Users', on: false },
        { label: 'Show SHAP Explanations', on: true },
      ].map((s, i) => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:14px;color:var(--text-secondary)">${s.label}</span>
          <div class="toggle-switch" data-sys="${i}">
            <div class="toggle-track ${s.on ? 'on' : ''}">
              <div class="toggle-thumb"></div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Model Retraining -->
    <div class="card">
      <div class="card-title" style="margin-bottom:16px">Model Retraining</div>
      <div style="padding:16px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:var(--radius-md);margin-bottom:16px">
        <div style="font-size:13px;color:var(--accent-glow);font-weight:600;margin-bottom:4px">Last Retrained</div>
        <div style="font-size:14px;color:var(--text-primary)">November 1, 2026 at 09:14 AM</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px">XGBoost • 500 samples • 91.2% accuracy</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;justify-content:space-between;font-size:13px">
          <span style="color:var(--text-secondary)">Training samples</span>
          <span style="font-weight:600">400</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px">
          <span style="color:var(--text-secondary)">Test samples</span>
          <span style="font-weight:600">100</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px">
          <span style="color:var(--text-secondary)">Cross-validation folds</span>
          <span style="font-weight:600">5</span>
        </div>
      </div>
      <button class="btn-add" style="width:100%;justify-content:center;margin-top:16px" id="retrainBtn">
        🔄 Retrain Model Now
      </button>
    </div>
  </div>`;
}

// =========================================
// PAGE LISTENERS
// =========================================
function attachPageListeners() {
  // Dashboard nav links
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  // HOT lead row click
  document.querySelectorAll('.hot-lead-row').forEach(row => {
    row.addEventListener('click', () => {
      const lead = state.leads.find(l => l.id === parseInt(row.dataset.id));
      if (lead) { state.selectedLead = lead; renderPage(); }
    });
  });

  // Lead filters
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.filterCategory = btn.dataset.filter;
      state.currentPage_num = 1;
      renderPage();
    });
  });

  // Lead search
  const leadSearch = document.getElementById('leadSearch');
  if (leadSearch) {
    leadSearch.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      state.currentPage_num = 1;
      renderPage();
    });
  }

  // Table sort
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      if (state.sortCol === th.dataset.sort) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortCol = th.dataset.sort;
        state.sortDir = 'desc';
      }
      renderPage();
    });
  });

  // Pagination
  document.querySelectorAll('[data-pag]').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.pag;
      const leads = state.leads.length;
      const totalPages = Math.ceil(leads / state.perPage);
      if (val === 'prev') state.currentPage_num = Math.max(1, state.currentPage_num - 1);
      else if (val === 'next') state.currentPage_num = Math.min(totalPages, state.currentPage_num + 1);
      else state.currentPage_num = parseInt(val);
      renderPage();
    });
  });

  // View lead
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const lead = state.leads.find(l => l.id === parseInt(btn.dataset.view));
      if (lead) { state.selectedLead = lead; renderPage(); }
    });
  });

  // Modal close
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalClose) {
    modalClose.addEventListener('click', () => { state.selectedLead = null; renderPage(); });
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) { state.selectedLead = null; renderPage(); }
    });
  }

  // Delete lead
  document.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.leads = state.leads.filter(l => l.id !== parseInt(btn.dataset.del));
      renderPage();
    });
  });

  // Re-score – navigate to predict
  document.querySelectorAll('[data-predict]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigate('predict');
    });
  });

  // Range sliders
  ['pVisits', 'pInteractions', 'pTime'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const displayId = { pVisits: 'visitsVal', pInteractions: 'interVal', pTime: 'timeVal' }[id];
    el.addEventListener('input', () => {
      const disp = document.getElementById(displayId);
      if (disp) disp.textContent = el.value;
    });
  });

  // Predict form
  const predictForm = document.getElementById('predictForm');
  if (predictForm) {
    predictForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('predictBtn');
      btn.innerHTML = `<div class="spinner"></div><span>Running ML Model…</span>`;
      btn.classList.add('loading');

      setTimeout(() => {
        const fields = {
          prevPurchase: document.getElementById('pPrevPurchase').value,
          visits: parseInt(document.getElementById('pVisits').value),
          interactions: parseInt(document.getElementById('pInteractions').value),
          email: document.getElementById('pEmail').value,
          timeSpent: parseInt(document.getElementById('pTime').value),
        };
        state.predictResult = simulatePrediction(fields);
        renderPage();
      }, 1400);
    });
  }

  // Toggle switches
  document.querySelectorAll('[data-toggle]').forEach(el => {
    el.addEventListener('click', () => {
      const userId = parseInt(el.dataset.toggle);
      const user = ADMIN_USERS.find(u => u.id === userId);
      if (user) { user.active = !user.active; renderPage(); }
    });
  });
  document.querySelectorAll('[data-sys]').forEach(el => {
    el.addEventListener('click', () => {
      const track = el.querySelector('.toggle-track');
      if (track) {
        track.classList.toggle('on');
        const label = el.querySelector('.toggle-label');
        if (label) label.textContent = track.classList.contains('on') ? 'On' : 'Off';
      }
    });
  });

  // Upload zone
  const uploadZone = document.getElementById('uploadZone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) {
        uploadZone.innerHTML = `<div class="upload-icon">✅</div><div class="upload-title">${file.name}</div><div class="upload-hint">File ready to upload</div>`;
      }
    });
    uploadZone.addEventListener('click', () => {
      const inp = document.createElement('input');
      inp.type = 'file'; inp.accept = '.csv';
      inp.click();
      inp.onchange = () => {
        if (inp.files[0]) {
          uploadZone.innerHTML = `<div class="upload-icon">✅</div><div class="upload-title">${inp.files[0].name}</div><div class="upload-hint">File selected</div>`;
        }
      };
    });
  }

  // Retrain button
  const retrainBtn = document.getElementById('retrainBtn');
  if (retrainBtn) {
    retrainBtn.addEventListener('click', () => {
      retrainBtn.textContent = '⏳ Training… please wait';
      retrainBtn.disabled = true;
      setTimeout(() => {
        retrainBtn.textContent = '✅ Retrained Successfully';
        retrainBtn.style.background = 'var(--accent-green)';
        setTimeout(() => {
          retrainBtn.textContent = '🔄 Retrain Model Now';
          retrainBtn.disabled = false;
          retrainBtn.style.background = '';
        }, 3000);
      }, 2500);
    });
  }
}

// =========================================
// Bootstrap
// =========================================
render();
