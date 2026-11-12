import './style.css';
import { MOCK_LEADS, NOTIFICATIONS, MODEL_METRICS, ADMIN_USERS } from './data.js';

// =========================================
// SVG Icon System (Clean, Minimalist, Consistent)
// =========================================
const ICONS = {
  dashboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
  leads: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  predict: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  model: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
  admin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  search: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  bell: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  menu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  logout: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`,
  close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>`,
  eye: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  refresh: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  bolt: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  arrowUp: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="19" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`,
  arrowDown: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`,
  chevronLeft: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  upload: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  users: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`,
  flame: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  chart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
  target: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
};

// =========================================
// Global Application State
// =========================================
const state = {
  currentPage: 'login',
  currentUser: null,
  leads: [...MOCK_LEADS],
  notifications: [...NOTIFICATIONS],
  adminUsers: [...ADMIN_USERS],
  filterCategory: 'all',
  searchQuery: '',
  sortCol: 'score',
  sortDir: 'desc',
  currentPage_num: 1,
  perPage: 6,
  notifOpen: false,
  sidebarOpen: false,
  selectedLead: null,
  leadToRescore: null,
  predictResult: null,
  addUserModalOpen: false,
};

// =========================================
// Navigation & Router
// =========================================
function navigate(page) {
  state.currentPage = page;
  state.notifOpen = false;
  state.sidebarOpen = false;
  render();
}

// =========================================
// Helpers
// =========================================
function getInitials(name) {
  if (!name) return 'LD';
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function getCategoryColor(cat) {
  return { hot: 'var(--hot)', warm: 'var(--warm)', cold: 'var(--cold)' }[cat] || 'var(--primary)';
}

function renderBadge(cat) {
  const c = cat ? cat.toLowerCase() : 'cold';
  const label = c.toUpperCase();
  return `<span class="badge badge-${c}"><span class="badge-dot"></span>${label}</span>`;
}

function simulatePrediction(fields) {
  const score = Math.min(99, Math.max(10,
    (fields.prevPurchase === 'yes' ? 28 : 0) +
    Math.round(fields.visits * 4.2) +
    Math.round(fields.interactions * 5.1) +
    (fields.email === 'high' ? 18 : fields.email === 'medium' ? 10 : 3) +
    Math.round(fields.timeSpent * 0.75) +
    Math.floor(Math.random() * 6)
  ));
  const category = score >= 70 ? 'hot' : score >= 45 ? 'warm' : 'cold';
  return {
    score,
    category,
    factors: [
      { name: 'Previous Purchase', pct: fields.prevPurchase === 'yes' ? 95 : 15 },
      { name: 'Website Visits', pct: Math.min(99, Math.round(fields.visits * 9.5)) },
      { name: 'Product Interactions', pct: Math.min(99, Math.round(fields.interactions * 11)) },
      { name: 'Email Engagement', pct: fields.email === 'high' ? 88 : fields.email === 'medium' ? 58 : 22 },
    ],
    recommendation: score >= 70
      ? 'Prioritise a personal follow-up call within 24 hours. High intent signals detected across all digital touchpoints.'
      : score >= 45
        ? 'Send a targeted product demo invite and relevant industry case studies. Schedule a 15-min discovery call.'
        : 'Enroll in long-term automated nurture sequence. Monitor for increased product and site engagement.',
  };
}

// =========================================
// Root Render Dispatcher
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
// 1. LOGIN PAGE
// =========================================
function renderLogin() {
  return `
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <div class="login-brand">
          <div class="brand-icon">${ICONS.bolt}</div>
          <span class="brand-title">LeadIQ</span>
        </div>
        <h1 class="login-title">Sign in to your account</h1>
        <p class="login-subtitle">Intelligent ML-based lead scoring & conversion prediction</p>
      </div>

      <div class="role-selector" id="roleTabs">
        <button class="role-tab-btn active" data-role="sales">Sales User</button>
        <button class="role-tab-btn" data-role="admin">Administrator</button>
      </div>

      <form id="loginForm">
        <div class="form-group">
          <label class="form-label" for="loginEmail">Work Email</label>
          <input class="form-input" type="email" id="loginEmail" value="sales@leadiq.app" required placeholder="name@company.com" />
        </div>
        <div class="form-group">
          <label class="form-label" for="loginPassword">Password</label>
          <input class="form-input" type="password" id="loginPassword" value="••••••••" required placeholder="Enter password" />
        </div>
        <button type="submit" class="btn-primary" id="loginSubmitBtn" style="width:100%;margin-top:6px;padding:11px;">
          <span>Sign In to Dashboard</span>
        </button>
      </form>

      <div class="login-hint">
        Demo mode active • Any credentials grant access
      </div>
    </div>
  </div>`;
}

function attachLoginListeners() {
  let selectedRole = 'sales';
  document.querySelectorAll('.role-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.role-tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedRole = tab.dataset.role;
      const emailInp = document.getElementById('loginEmail');
      if (emailInp) emailInp.value = selectedRole === 'admin' ? 'admin@leadiq.app' : 'sales@leadiq.app';
    });
  });

  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('loginSubmitBtn');
      btn.innerHTML = `<div class="loading-spinner"></div><span>Signing in…</span>`;
      btn.disabled = true;
      setTimeout(() => {
        state.currentUser = {
          name: selectedRole === 'admin' ? 'Rahul Sharma' : 'Sneha Patel',
          email: selectedRole === 'admin' ? 'rahul@leadiq.app' : 'sneha@leadiq.app',
          role: selectedRole
        };
        navigate('dashboard');
      }, 500);
    });
  }
}

// =========================================
// 2. SHELL (Sidebar, Topbar, Main Layout)
// =========================================
function renderShell() {
  const user = state.currentUser || { name: 'Sneha Patel', role: 'sales', email: 'sneha@leadiq.app' };
  const navItems = [
    { id: 'dashboard', icon: ICONS.dashboard, label: 'Dashboard' },
    { id: 'leads', icon: ICONS.leads, label: 'All Leads', badge: state.leads.filter(l => l.category === 'hot').length },
    { id: 'predict', icon: ICONS.predict, label: 'Score a Lead' },
    { id: 'model', icon: ICONS.model, label: 'Model Performance' },
    ...(user.role === 'admin' ? [{ id: 'admin', icon: ICONS.admin, label: 'Admin Panel' }] : []),
  ];

  const unreadCount = state.notifications.filter(n => !n.read).length;

  return `
  <div class="app-shell">
    ${state.sidebarOpen ? `<div class="sidebar-backdrop" id="sidebarBackdrop"></div>` : ''}
    <aside class="sidebar ${state.sidebarOpen ? 'mobile-open' : ''}" id="sidebar">
      <div class="sidebar-brand">
        <div class="brand-icon" style="width:30px;height:30px;border-radius:6px;">${ICONS.bolt}</div>
        <span class="sidebar-brand-name">LeadIQ</span>
        <span class="sidebar-brand-badge">SaaS</span>
      </div>

      <nav class="sidebar-nav">
        <div class="sidebar-section-title">Navigation</div>
        ${navItems.map(item => `
          <div class="nav-link ${state.currentPage === item.id ? 'active' : ''}" data-nav="${item.id}">
            <span class="nav-icon">${item.icon}</span>
            <span>${item.label}</span>
            ${item.badge ? `<span class="nav-badge-pill">${item.badge}</span>` : ''}
          </div>
        `).join('')}
      </nav>

      <div class="sidebar-footer">
        <div class="user-profile-bar" id="logoutBtn" title="Click to sign out">
          <div class="user-avatar-circle">${getInitials(user.name)}</div>
          <div class="user-meta">
            <div class="user-display-name">${user.name}</div>
            <div class="user-role-text">${user.role === 'admin' ? 'Administrator' : 'Sales Representative'}</div>
          </div>
          <div class="user-logout-icon" title="Sign out">${ICONS.logout}</div>
        </div>
      </div>
    </aside>

    <div class="main-wrapper">
      <header class="topbar">
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu">
          ${ICONS.menu}
        </button>

        <div class="topbar-left">
          <span class="topbar-page-title">${getPageTitle()}</span>
        </div>

        <div class="topbar-right">
          <div class="topbar-search-box">
            <span style="color:var(--text-muted);display:flex;align-items:center">${ICONS.search}</span>
            <input type="text" id="globalSearch" placeholder="Search leads by name, company…" value="${state.searchQuery}" />
          </div>

          <div style="position:relative">
            <button class="topbar-action-btn" id="notifBtn" aria-label="Notifications">
              ${ICONS.bell}
              ${unreadCount > 0 ? `<span class="notif-badge-dot"></span>` : ''}
            </button>
            ${state.notifOpen ? renderNotificationsDropdown() : ''}
          </div>

          <span class="badge badge-neutral" style="font-size:11px;font-weight:600;padding:4px 8px;">
            ${user.role === 'admin' ? 'Admin Access' : 'Sales Workspace'}
          </span>
        </div>
      </header>

      <main class="page-container" id="pageContent"></main>
    </div>
  </div>`;
}

function getPageTitle() {
  const titles = {
    dashboard: 'Dashboard',
    leads: 'All Leads',
    predict: 'Lead Scoring Engine',
    model: 'Model Performance & Benchmarks',
    admin: 'System Administration',
  };
  return titles[state.currentPage] || 'LeadIQ';
}

function renderNotificationsDropdown() {
  return `
  <div class="notif-menu-dropdown" id="notifDropdown">
    <div class="notif-menu-header">
      <span class="notif-menu-title">Notifications</span>
      <span class="notif-mark-read-btn" id="markAllReadBtn">Mark all as read</span>
    </div>
    <div class="notif-items-list">
      ${state.notifications.map(n => `
        <div class="notif-single-item ${n.read ? '' : 'unread'}">
          <div style="flex:1">
            <div style="color:var(--text-primary);font-weight:${n.read ? '400' : '600'}">${n.text}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:3px">${n.time}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function attachShellListeners() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      state.currentUser = null;
      navigate('login');
    });
  }

  const mobileBtn = document.getElementById('mobileMenuBtn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      state.sidebarOpen = !state.sidebarOpen;
      render();
    });
  }

  const backdrop = document.getElementById('sidebarBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      state.sidebarOpen = false;
      render();
    });
  }

  const notifBtn = document.getElementById('notifBtn');
  if (notifBtn) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.notifOpen = !state.notifOpen;
      render();
    });
  }

  const notifDropdown = document.getElementById('notifDropdown');
  if (notifDropdown) {
    notifDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  const markAllRead = document.getElementById('markAllReadBtn');
  if (markAllRead) {
    markAllRead.addEventListener('click', (e) => {
      e.stopPropagation();
      state.notifications.forEach(n => n.read = true);
      state.notifOpen = false;
      render();
    });
  }

  document.addEventListener('click', () => {
    if (state.notifOpen) {
      state.notifOpen = false;
      render();
    }
  }, { once: true });

  const globalSearch = document.getElementById('globalSearch');
  if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      state.currentPage_num = 1;
      if (state.currentPage !== 'leads') {
        navigate('leads');
      } else {
        renderPage();
      }
    });
  }
}

// =========================================
// Page Router
// =========================================
function renderPage() {
  const container = document.getElementById('pageContent');
  if (!container) return;
  const views = {
    dashboard: renderDashboard,
    leads: renderLeads,
    predict: renderPredict,
    model: renderModel,
    admin: renderAdmin,
  };
  container.innerHTML = (views[state.currentPage] || renderDashboard)();
  attachPageListeners();
}

// =========================================
// 3. DASHBOARD PAGE (Minimalist Redesign)
// =========================================
function renderDashboard() {
  const total = state.leads.length;
  const hot = state.leads.filter(l => l.category === 'hot').length;
  const warm = state.leads.filter(l => l.category === 'warm').length;
  const cold = state.leads.filter(l => l.category === 'cold').length;
  const avgScore = total ? Math.round(state.leads.reduce((a, l) => a + l.score, 0) / total) : 0;
  const months = MODEL_METRICS.monthlyConversion;
  const maxTotal = Math.max(...months.map(m => m.total));

  return `
  <div class="page-header">
    <div>
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Monitor lead quality, conversion potential, and scoring insights.</p>
    </div>
    <div style="display:flex;gap:10px;">
      <button class="btn-primary" data-nav="predict">
        ${ICONS.plus}
        <span>Score a Lead</span>
      </button>
    </div>
  </div>

  <!-- KPI Row -->
  <div class="kpi-row">
    <div class="kpi-card">
      <div class="kpi-top">
        <span class="kpi-label">Total Leads</span>
        <div class="kpi-icon-wrap">${ICONS.users}</div>
      </div>
      <div class="kpi-value">${total}</div>
      <div class="kpi-footer">Active in pipeline</div>
    </div>

    <div class="kpi-card">
      <div class="kpi-top">
        <span class="kpi-label">Hot Leads</span>
        <div class="kpi-icon-wrap" style="color:var(--hot);background:var(--hot-subtle);">${ICONS.flame}</div>
      </div>
      <div class="kpi-value" style="color:var(--hot);">${hot}</div>
      <div class="kpi-footer"><span style="color:var(--hot);font-weight:600">High priority</span> • Score ≥ 70%</div>
    </div>

    <div class="kpi-card">
      <div class="kpi-top">
        <span class="kpi-label">Average Lead Score</span>
        <div class="kpi-icon-wrap">${ICONS.chart}</div>
      </div>
      <div class="kpi-value">${avgScore}%</div>
      <div class="kpi-footer">Across all active leads</div>
    </div>

    <div class="kpi-card">
      <div class="kpi-top">
        <span class="kpi-label">Model Accuracy</span>
        <div class="kpi-icon-wrap" style="color:var(--success);background:var(--success-subtle);">${ICONS.target}</div>
      </div>
      <div class="kpi-value" style="color:var(--success);">${MODEL_METRICS.accuracy}%</div>
      <div class="kpi-footer">XGBoost validation benchmark</div>
    </div>
  </div>

  <!-- Main Grid -->
  <div class="dashboard-grid">
    <div class="dashboard-left">
      <!-- Conversion Trend Chart -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Monthly Conversion Trend</div>
            <div class="card-subtitle">Converted leads compared to total monthly pipeline</div>
          </div>
          <button class="btn-secondary" style="font-size:12px;padding:5px 10px;" data-nav="model">
            <span>Model Details</span>
            <span>→</span>
          </button>
        </div>
        <div class="chart-container">
          <div class="chart-bars-wrap">
            ${months.map(m => {
              const heightPct = Math.round((m.converted / maxTotal) * 150);
              const rate = Math.round((m.converted / m.total) * 100);
              return `
                <div class="chart-bar-col">
                  <div class="chart-bar-pillar"
                       style="height:${heightPct}px;"
                       title="${m.month}: ${m.converted} converted of ${m.total} (${rate}%)">
                  </div>
                  <div class="chart-bar-label">${m.month}</div>
                </div>
              `;
            }).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:10px;font-size:11.5px;color:var(--text-muted);">
            <span>Conversion rate: 23% – 32%</span>
            <span>Historical 7-Month Overview</span>
          </div>
        </div>
      </div>

      <!-- Hot Leads Queue -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Priority Queue — Hot Leads</div>
            <div class="card-subtitle">Leads requiring immediate personal sales engagement</div>
          </div>
          <button class="btn-secondary" style="font-size:12px;padding:5px 10px;" data-nav="leads">
            <span>View All Leads (${total})</span>
            <span>→</span>
          </button>
        </div>
        <div class="data-table-wrapper" style="border:none;">
          <table class="compact-lead-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Company</th>
                <th>Score</th>
                <th>Category</th>
                <th style="text-align:right">Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.leads.filter(l => l.category === 'hot').map(lead => `
                <tr class="compact-lead-row" data-lead-id="${lead.id}">
                  <td>
                    <div style="font-weight:600;color:var(--text-primary)">${lead.name}</div>
                    <div style="font-size:11.5px;color:var(--text-muted)">${lead.email}</div>
                  </td>
                  <td>
                    <div style="color:var(--text-primary)">${lead.company}</div>
                    <div style="font-size:11.5px;color:var(--text-muted)">${lead.industry}</div>
                  </td>
                  <td>
                    <span style="font-family:var(--font-mono);font-weight:700;color:var(--hot)">${lead.score}%</span>
                  </td>
                  <td>${renderBadge(lead.category)}</td>
                  <td style="text-align:right">
                    <button class="btn-secondary" style="font-size:11.5px;padding:4px 9px;" data-view-id="${lead.id}">
                      ${ICONS.eye}
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="dashboard-right">
      <!-- Donut Chart -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Lead Quality Distribution</div>
            <div class="card-subtitle">Categorization across active pipeline</div>
          </div>
        </div>
        <div class="donut-layout">
          <svg width="130" height="130" viewBox="0 0 130 130">
            ${renderDonutSvg(hot, warm, cold)}
            <text x="65" y="60" text-anchor="middle" font-size="22" font-weight="700" fill="#0F172A">${total}</text>
            <text x="65" y="78" text-anchor="middle" font-size="11" font-weight="500" fill="#64748B">Total Leads</text>
          </svg>
          <div class="donut-legend">
            <div class="legend-row">
              <span class="legend-dot-sq" style="background:var(--hot)"></span>
              <span>Hot (${Math.round((hot/total)*100 || 0)}%)</span>
              <span class="legend-count">${hot}</span>
            </div>
            <div class="legend-row">
              <span class="legend-dot-sq" style="background:var(--warm)"></span>
              <span>Warm (${Math.round((warm/total)*100 || 0)}%)</span>
              <span class="legend-count">${warm}</span>
            </div>
            <div class="legend-row">
              <span class="legend-dot-sq" style="background:var(--cold)"></span>
              <span>Cold (${Math.round((cold/total)*100 || 0)}%)</span>
              <span class="legend-count">${cold}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Conversion Funnel -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Sales Pipeline Funnel</div>
            <div class="card-subtitle">Estimated progression by lead status</div>
          </div>
        </div>
        <div class="funnel-container">
          ${[
            { label: 'Contacted', count: total, pct: 100 },
            { label: 'Qualified', count: hot + warm, pct: Math.round(((hot+warm)/total)*100) },
            { label: 'Demo Booked', count: Math.round((hot+warm)*0.6), pct: Math.round(((hot+warm)*0.6/total)*100) },
            { label: 'Proposal', count: Math.round(hot*0.8), pct: Math.round((hot*0.8/total)*100) },
            { label: 'Closed Won', count: Math.round(hot*0.5), pct: Math.round((hot*0.5/total)*100) },
          ].map(s => `
            <div class="funnel-stage">
              <span class="funnel-label">${s.label}</span>
              <div class="funnel-track">
                <div class="funnel-fill" style="width:${s.pct}%"></div>
              </div>
              <span class="funnel-count">${s.count}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <div class="card-title" style="margin-bottom:12px;">Quick Actions</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <button class="btn-secondary" style="justify-content:flex-start;" data-nav="predict">
            ${ICONS.predict}
            <span>Score a New Lead with ML</span>
          </button>
          <button class="btn-secondary" style="justify-content:flex-start;" data-nav="leads">
            ${ICONS.leads}
            <span>Manage All Pipeline Leads</span>
          </button>
          <button class="btn-secondary" style="justify-content:flex-start;" data-nav="model">
            ${ICONS.model}
            <span>Inspect Model Performance</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  ${state.selectedLead ? renderLeadModal(state.selectedLead) : ''}
  `;
}

function renderDonutSvg(hot, warm, cold) {
  const total = hot + warm + cold;
  if (!total) return '';
  const r = 48;
  const cx = 65;
  const cy = 65;
  const circumference = 2 * Math.PI * r;
  const segments = [
    { count: hot, color: '#DC2626' },
    { count: warm, color: '#D97706' },
    { count: cold, color: '#2563EB' },
  ];
  let offset = -circumference / 4;
  return segments.map(s => {
    const dash = (s.count / total) * circumference;
    const gap = circumference - dash;
    const el = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="14"
      stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${offset}" />`;
    offset -= dash;
    return el;
  }).join('');
}

// =========================================
// 4. MODEL PERFORMANCE PAGE (Minimalist Redesign)
// =========================================
function renderModel() {
  const m = MODEL_METRICS;
  return `
  <div class="page-header">
    <div>
      <h1 class="page-title">Model Performance</h1>
      <p class="page-subtitle">Review model evaluation metrics, classification benchmarks, and algorithm comparisons.</p>
    </div>
    <div>
      <span class="badge badge-neutral" style="font-size:12px;padding:6px 10px;">
        Dataset: 500 Samples • 80/20 Train-Test Split
      </span>
    </div>
  </div>

  <!-- Metric Cards Banner -->
  <div class="metrics-banner">
    <div class="metric-box">
      <div class="metric-box-val" style="color:var(--primary)">${m.accuracy}%</div>
      <div class="metric-box-label">Accuracy</div>
    </div>
    <div class="metric-box">
      <div class="metric-box-val" style="color:var(--text-primary)">${m.precision}%</div>
      <div class="metric-box-label">Precision</div>
    </div>
    <div class="metric-box">
      <div class="metric-box-val" style="color:var(--text-primary)">${m.recall}%</div>
      <div class="metric-box-label">Recall</div>
    </div>
    <div class="metric-box">
      <div class="metric-box-val" style="color:var(--text-primary)">${m.f1}%</div>
      <div class="metric-box-label">F1-Score</div>
    </div>
    <div class="metric-box">
      <div class="metric-box-val" style="color:var(--primary)">${m.rocAuc}</div>
      <div class="metric-box-label">ROC-AUC</div>
    </div>
  </div>

  <!-- Confusion Matrix & ROC AUC -->
  <div class="model-two-col">
    <!-- Confusion Matrix -->
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Confusion Matrix</div>
          <div class="card-subtitle">Binary classification test distribution (500 test records)</div>
        </div>
      </div>
      <table class="cm-table">
        <tbody>
          <tr>
            <td class="cm-cell pos">
              <div class="cm-cell-num">${m.confusion.tp}</div>
              <div class="cm-cell-title">True Positive (TP)</div>
            </td>
            <td class="cm-cell neg">
              <div class="cm-cell-num">${m.confusion.fp}</div>
              <div class="cm-cell-title">False Positive (FP)</div>
            </td>
          </tr>
          <tr>
            <td class="cm-cell neg">
              <div class="cm-cell-num">${m.confusion.fn}</div>
              <div class="cm-cell-title">False Negative (FN)</div>
            </td>
            <td class="cm-cell pos">
              <div class="cm-cell-num">${m.confusion.tn}</div>
              <div class="cm-cell-title">True Negative (TN)</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="margin-top:14px;font-size:12px;color:var(--text-muted);display:flex;justify-content:space-between">
        <span>Sensitivity: 86.3%</span>
        <span>Specificity: 92.0%</span>
      </div>
    </div>

    <!-- ROC AUC Performance -->
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Discrimination Ability (ROC-AUC)</div>
          <div class="card-subtitle">Separation capacity between converting and non-converting leads</div>
        </div>
      </div>
      <div class="roc-content">
        <div class="roc-score-num">${m.rocAuc}</div>
        <div style="width:100%;max-width:280px;margin-top:12px">
          <div class="algo-bar-wrap" style="height:8px;">
            <div class="algo-bar-fill" style="width:${Math.round(m.rocAuc * 100)}%"></div>
          </div>
        </div>
        <p class="roc-sub-text">
          An Area Under Curve (AUC) score of <strong>0.934</strong> validates exceptional discrimination capacity in identifying high-intent leads from lower intent prospects.
        </p>
      </div>
    </div>
  </div>

  <!-- Algorithm Comparison -->
  <div class="card">
    <div class="card-header">
      <div>
        <div class="card-title">Algorithm Benchmark Comparison</div>
        <div class="card-subtitle">Cross-validated evaluation of tested classification algorithms</div>
      </div>
    </div>
    <div class="data-table-wrapper" style="border:none">
      <table class="algo-table">
        <thead>
          <tr>
            <th>Model Algorithm</th>
            <th>Type</th>
            <th>ROC-AUC</th>
            <th style="width:35%">Relative Performance</th>
            <th style="text-align:right">Status</th>
          </tr>
        </thead>
        <tbody>
          ${m.models.map(model => `
            <tr>
              <td style="font-weight:600;color:var(--text-primary)">${model.name}</td>
              <td>${model.name.includes('XGBoost') ? 'Gradient Boosted Trees' : model.name.includes('Random') ? 'Ensemble Forest' : model.name.includes('Tree') ? 'Single Tree' : 'Linear Classifier'}</td>
              <td style="font-family:var(--font-mono);font-weight:600;color:var(--text-primary)">${model.auc}</td>
              <td>
                <div class="algo-bar-wrap">
                  <div class="algo-bar-fill" style="width:${model.bar}%;background:${model.best ? 'var(--primary)' : '#94A3B8'}"></div>
                </div>
              </td>
              <td style="text-align:right">
                ${model.best
                  ? `<span class="badge badge-hot" style="background:var(--primary-subtle);color:var(--primary);border-color:var(--primary-border);">Production Model</span>`
                  : `<span class="badge badge-neutral">Evaluated</span>`}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <div style="margin-top:16px;padding:12px 16px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:8px;">
    <span style="color:var(--primary);">${ICONS.predict}</span>
    <span><strong>Note on Model Evaluation:</strong> Metrics are benchmarked on the 500-sample lead history test partition under 5-fold cross validation.</span>
  </div>
  `;
}

// =========================================
// 5. ALL LEADS PAGE (Minimalist Redesign)
// =========================================
function renderLeads() {
  const filtered = getFilteredLeads();
  const totalPages = Math.ceil(filtered.length / state.perPage) || 1;
  const page = Math.min(state.currentPage_num, totalPages);
  const startIdx = (page - 1) * state.perPage;
  const paginated = filtered.slice(startIdx, startIdx + state.perPage);

  return `
  <div class="page-header">
    <div>
      <h1 class="page-title">All Leads</h1>
      <p class="page-subtitle">Search, filter, and prioritize your sales contacts with machine-learning recommendations.</p>
    </div>
    <div>
      <button class="btn-primary" data-nav="predict">
        ${ICONS.plus}
        <span>Score a Lead</span>
      </button>
    </div>
  </div>

  <div class="card">
    <div class="table-filter-bar">
      <div class="leads-search-input">
        <span class="leads-search-icon">${ICONS.search}</span>
        <input type="text" id="leadSearch" placeholder="Search by lead name, company, email, or industry…" value="${state.searchQuery}" />
      </div>

      <div class="filter-pills">
        ${['all', 'hot', 'warm', 'cold'].map(cat => `
          <button class="filter-pill-btn ${state.filterCategory === cat ? 'active' : ''}" data-filter="${cat}">
            ${cat === 'all' ? `All (${state.leads.length})` : `${cat.charAt(0).toUpperCase() + cat.slice(1)} (${state.leads.filter(l => l.category === cat).length})`}
          </button>
        `).join('')}
      </div>
    </div>

    <div class="data-table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th class="sortable" data-sort="name">
              Lead Name ${state.sortCol === 'name' ? (state.sortDir === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th>Company</th>
            <th>Source</th>
            <th>Industry</th>
            <th class="sortable" data-sort="score">
              Conversion Score ${state.sortCol === 'score' ? (state.sortDir === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th>Category</th>
            <th>Last Activity</th>
            <th style="text-align:right">Actions</th>
          </tr>
        </thead>
        <tbody id="leadsTableBody">
          ${renderTableRows(paginated)}
        </tbody>
      </table>
    </div>

    <div class="table-pagination" id="leadsPagination">
      ${renderPaginationHtml(filtered.length, page, totalPages, startIdx, paginated.length)}
    </div>
  </div>

  ${state.selectedLead ? renderLeadModal(state.selectedLead) : ''}
  `;
}

function getFilteredLeads() {
  let list = [...state.leads];
  if (state.filterCategory !== 'all') {
    list = list.filter(l => l.category === state.filterCategory);
  }
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.company.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.industry.toLowerCase().includes(q)
    );
  }
  list.sort((a, b) => {
    const dir = state.sortDir === 'asc' ? 1 : -1;
    if (state.sortCol === 'score') return dir * (a.score - b.score);
    if (state.sortCol === 'name') return dir * a.name.localeCompare(b.name);
    return 0;
  });
  return list;
}

function renderTableRows(leads) {
  if (leads.length === 0) {
    return `
      <tr>
        <td colspan="8" style="text-align:center;padding:48px 20px;color:var(--text-muted)">
          <div style="font-size:24px;margin-bottom:8px">🔍</div>
          <div style="font-weight:600;color:var(--text-secondary);font-size:14px">No matching leads found</div>
          <div style="font-size:12px;margin-top:2px">Try adjusting your search terms or category filter</div>
        </td>
      </tr>
    `;
  }

  return leads.map(lead => `
    <tr>
      <td>
        <div class="lead-name-cell">
          <div class="table-avatar">${getInitials(lead.name)}</div>
          <div>
            <div style="font-weight:600;color:var(--text-primary)">${lead.name}</div>
            <div style="font-size:11.5px;color:var(--text-muted)">${lead.email}</div>
          </div>
        </div>
      </td>
      <td>${lead.company}</td>
      <td><span class="badge badge-neutral">${lead.source}</span></td>
      <td>${lead.industry}</td>
      <td>
        <div class="lead-score-wrap">
          <span class="score-num" style="color:${getCategoryColor(lead.category)}">${lead.score}%</span>
          <div class="score-mini-track">
            <div class="score-mini-fill" style="width:${lead.score}%;background:${getCategoryColor(lead.category)}"></div>
          </div>
        </div>
      </td>
      <td>${renderBadge(lead.category)}</td>
      <td style="color:var(--text-muted);font-size:12px">${lead.lastActivity}</td>
      <td>
        <div class="row-actions-group" style="justify-content:flex-end">
          <button class="row-action-btn" data-view="${lead.id}" title="View Lead Details">
            ${ICONS.eye}
          </button>
          <button class="row-action-btn" data-rescore="${lead.id}" title="Re-score with ML">
            ${ICONS.refresh}
          </button>
          <button class="row-action-btn danger" data-del="${lead.id}" title="Delete Lead">
            ${ICONS.trash}
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderPaginationHtml(totalCount, page, totalPages, startIdx, paginatedCount) {
  if (totalCount === 0) {
    return `<span>Showing 0 of 0 leads</span><div class="pagination-controls"></div>`;
  }
  const start = startIdx + 1;
  const end = startIdx + paginatedCount;
  return `
    <span>Showing <strong>${start}–${end}</strong> of <strong>${totalCount}</strong> leads</span>
    <div class="pagination-controls">
      <button class="page-btn" data-pag="prev" ${page <= 1 ? 'disabled' : ''}>
        ${ICONS.chevronLeft}
      </button>
      ${Array.from({ length: totalPages }, (_, i) => `
        <button class="page-btn ${i + 1 === page ? 'active' : ''}" data-pag="${i + 1}">${i + 1}</button>
      `).join('')}
      <button class="page-btn" data-pag="next" ${page >= totalPages ? 'disabled' : ''}>
        ${ICONS.chevronRight}
      </button>
    </div>
  `;
}

// =========================================
// 6. SCORING / PREDICT PAGE (Minimalist Redesign)
// =========================================
function renderPredict() {
  const r = state.predictResult;
  const prefill = state.leadToRescore || {};

  return `
  <div class="page-header">
    <div>
      <h1 class="page-title">Lead Scoring Engine</h1>
      <p class="page-subtitle">Predict conversion probability using behavioral signals and trained ML heuristics.</p>
    </div>
  </div>

  <div class="predict-grid">
    <!-- Form Card -->
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Lead Profile & Signals</div>
          <div class="card-subtitle">Enter lead details to evaluate conversion propensity</div>
        </div>
        ${state.leadToRescore ? `<span class="badge badge-neutral">Re-scoring: ${prefill.name}</span>` : ''}
      </div>

      <form id="predictForm">
        <div class="form-two-col">
          <div class="form-group">
            <label class="form-label" for="pName">Lead Full Name</label>
            <input class="form-input" type="text" id="pName" placeholder="e.g. Alex Morgan" value="${prefill.name || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="pCompany">Company Name</label>
            <input class="form-input" type="text" id="pCompany" placeholder="e.g. HyperScale Inc." value="${prefill.company || ''}" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="pIndustry">Industry</label>
            <select class="form-select" id="pIndustry">
              <option value="SaaS" ${prefill.industry === 'SaaS' ? 'selected' : ''}>SaaS</option>
              <option value="FinTech" ${prefill.industry === 'FinTech' ? 'selected' : ''}>FinTech</option>
              <option value="HealthTech" ${prefill.industry === 'HealthTech' ? 'selected' : ''}>HealthTech</option>
              <option value="Analytics" ${prefill.industry === 'Analytics' ? 'selected' : ''}>Analytics</option>
              <option value="Retail" ${prefill.industry === 'Retail' ? 'selected' : ''}>Retail</option>
              <option value="Logistics" ${prefill.industry === 'Logistics' ? 'selected' : ''}>Logistics</option>
              <option value="Construction" ${prefill.industry === 'Construction' ? 'selected' : ''}>Construction</option>
              <option value="EdTech" ${prefill.industry === 'EdTech' ? 'selected' : ''}>EdTech</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="pSource">Acquisition Channel</label>
            <select class="form-select" id="pSource">
              <option value="Website" ${prefill.source === 'Website' ? 'selected' : ''}>Website</option>
              <option value="LinkedIn" ${prefill.source === 'LinkedIn' ? 'selected' : ''}>LinkedIn</option>
              <option value="Referral" ${prefill.source === 'Referral' ? 'selected' : ''}>Referral</option>
              <option value="Webinar" ${prefill.source === 'Webinar' ? 'selected' : ''}>Webinar</option>
              <option value="Trade Show" ${prefill.source === 'Trade Show' ? 'selected' : ''}>Trade Show</option>
              <option value="Cold Email" ${prefill.source === 'Cold Email' ? 'selected' : ''}>Cold Email</option>
              <option value="Blog" ${prefill.source === 'Blog' ? 'selected' : ''}>Blog</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="pEmail">Email Engagement</label>
            <select class="form-select" id="pEmail">
              <option value="high" ${prefill.emailEngagement === 'High' ? 'selected' : ''}>High (Opens & Clicks)</option>
              <option value="medium" ${prefill.emailEngagement === 'Medium' ? 'selected' : ''}>Medium (Opens only)</option>
              <option value="low" ${prefill.emailEngagement === 'Low' ? 'selected' : ''}>Low (No activity)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="pPrevPurchase">Previous Customer</label>
            <select class="form-select" id="pPrevPurchase">
              <option value="no" ${prefill.prevPurchase === false ? 'selected' : ''}>No prior orders</option>
              <option value="yes" ${prefill.prevPurchase === true ? 'selected' : ''}>Yes, returning customer</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Website Visits</label>
            <div class="slider-container">
              <input type="range" class="range-input" id="pVisits" min="0" max="25" value="${prefill.websiteVisits || 8}" />
              <span class="slider-val-tag" id="visitsVal">${prefill.websiteVisits || 8}</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Product Feature Clicks</label>
            <div class="slider-container">
              <input type="range" class="range-input" id="pInteractions" min="0" max="20" value="${prefill.productInteractions || 6}" />
              <span class="slider-val-tag" id="interVal">${prefill.productInteractions || 6}</span>
            </div>
          </div>

          <div class="form-group form-full-span">
            <label class="form-label">Active Time on Site (Minutes)</label>
            <div class="slider-container">
              <input type="range" class="range-input" id="pTime" min="0" max="60" value="${prefill.timeSpent || 24}" />
              <span class="slider-val-tag" id="timeVal">${prefill.timeSpent || 24}m</span>
            </div>
          </div>
        </div>

        <button type="submit" class="btn-primary" id="predictSubmitBtn" style="width:100%;margin-top:10px;padding:12px;">
          ${ICONS.bolt}
          <span>Run Conversion Prediction</span>
        </button>
      </form>
    </div>

    <!-- Output Card -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">Prediction Result</div>
      </div>
      ${r ? renderPredictResultCard(r) : `
        <div class="predict-result-placeholder">
          <div style="font-size:32px;margin-bottom:12px;opacity:0.35;">${ICONS.predict}</div>
          <div style="font-weight:600;color:var(--text-secondary);font-size:14px;">No Prediction Calculated Yet</div>
          <div style="font-size:12.5px;color:var(--text-muted);margin-top:4px;line-height:1.5;">
            Fill in the lead's attributes on the left and click <strong>Run Conversion Prediction</strong> to generate conversion probability.
          </div>
        </div>
      `}
    </div>
  </div>
  `;
}

function renderPredictResultCard(r) {
  const catColor = getCategoryColor(r.category);
  return `
  <div class="result-card-inner">
    <div class="result-score-banner">
      <div class="result-big-number" style="color:${catColor};">${r.score}%</div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">Estimated Conversion Probability</div>
      ${renderBadge(r.category)}
    </div>

    <div class="result-factors-box">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:10px;">
        Key Influencing Signals (SHAP Attribution)
      </div>
      ${r.factors.map(f => `
        <div class="factor-item-row">
          <span class="factor-name-label">${f.name}</span>
          <div class="factor-track-bar">
            <div class="factor-fill-bar" style="width:${f.pct}%;background:${catColor};"></div>
          </div>
          <span class="factor-val-text">${f.pct}%</span>
        </div>
      `).join('')}
    </div>

    <div class="result-action-callout">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--primary);margin-bottom:4px;">
        🎯 Recommended Sales Action
      </div>
      ${r.recommendation}
    </div>

    <button class="btn-primary" id="saveLeadBtn" style="width:100%;margin-top:16px;">
      ${ICONS.plus}
      <span>Save Lead to Pipeline</span>
    </button>
  </div>
  `;
}

// =========================================
// 7. ADMIN PANEL (Minimalist Redesign)
// =========================================
function renderAdmin() {
  return `
  <div class="page-header">
    <div>
      <h1 class="page-title">System Administration</h1>
      <p class="page-subtitle">Manage system users, active datasets, retraining workflows, and platform parameters.</p>
    </div>
  </div>

  <div class="admin-grid-layout">
    <!-- User Management -->
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">User Management</div>
          <div class="card-subtitle">Platform access roles and status</div>
        </div>
        <button class="btn-secondary" id="openAddUserBtn" style="font-size:12px;padding:5px 10px;">
          ${ICONS.plus}
          <span>Add User</span>
        </button>
      </div>

      <div class="data-table-wrapper" style="border:none">
        <table class="compact-lead-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th style="text-align:right">Access</th>
            </tr>
          </thead>
          <tbody>
            ${state.adminUsers.map(u => `
              <tr>
                <td>
                  <div style="font-weight:600;color:var(--text-primary)">${u.name}</div>
                  <div style="font-size:11.5px;color:var(--text-muted)">${u.email}</div>
                </td>
                <td><span class="badge ${u.role === 'Admin' ? 'badge-hot' : 'badge-neutral'}">${u.role}</span></td>
                <td>
                  <span style="display:inline-flex;align-items:center;gap:5px;font-size:12px;">
                    <span style="width:6px;height:6px;border-radius:50%;background:${u.status === 'online' ? 'var(--success)' : 'var(--text-muted)'}"></span>
                    ${u.status}
                  </span>
                </td>
                <td style="text-align:right">
                  <div class="toggle-control" data-toggle-user="${u.id}">
                    <div class="toggle-switch-track ${u.active ? 'on' : ''}">
                      <div class="toggle-switch-thumb"></div>
                    </div>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Dataset Management -->
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Dataset Management</div>
          <div class="card-subtitle">Ingest historical lead data for scoring model</div>
        </div>
      </div>
      <div class="upload-dropzone" id="uploadZone">
        <div style="color:var(--primary);margin-bottom:8px;">${ICONS.upload}</div>
        <div style="font-size:13.5px;font-weight:600;color:var(--text-primary);">Click or drag CSV dataset here</div>
        <div style="font-size:11.5px;color:var(--text-muted);margin-top:4px;">Supported schema: leads_2026_clean.csv (up to 50MB)</div>
      </div>
      <div style="margin-top:14px;padding:12px 14px;background:var(--bg-subtle);border-radius:var(--radius-md);border:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <div>
          <div style="font-size:13px;font-weight:600;color:var(--text-primary)">lead_data_2026_v3.csv</div>
          <div style="font-size:11.5px;color:var(--text-muted)">500 records • 12 engineered features • Active</div>
        </div>
        <span class="badge badge-hot" style="background:var(--success-subtle);color:var(--success);border-color:var(--success-border);">Verified</span>
      </div>
    </div>

    <!-- System Settings -->
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">System Settings</div>
          <div class="card-subtitle">Automations and scoring parameters</div>
        </div>
      </div>
      <div>
        ${[
          { label: 'Automated High-Intent Email Notifications', desc: 'Alert reps when a lead scores HOT (≥ 70%)', on: true },
          { label: 'Automatic Monthly Model Re-benchmarking', desc: 'Re-evaluate precision against converted leads', on: true },
          { label: 'Allow Sales Users to Export Pipeline CSV', desc: 'Download filtered lead records to local drive', on: false },
          { label: 'Compute SHAP Feature Contributions', desc: 'Display top 4 factors influencing lead score', on: true },
        ].map((s, idx) => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border);">
            <div>
              <div style="font-size:13px;font-weight:500;color:var(--text-primary);">${s.label}</div>
              <div style="font-size:11.5px;color:var(--text-muted);">${s.desc}</div>
            </div>
            <div class="toggle-control" data-sys-toggle="${idx}">
              <div class="toggle-switch-track ${s.on ? 'on' : ''}">
                <div class="toggle-switch-thumb"></div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Model Retraining -->
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Model Retraining Pipeline</div>
          <div class="card-subtitle">Train model on newest historical conversions</div>
        </div>
      </div>
      <div style="padding:14px;background:var(--bg-subtle);border-radius:var(--radius-md);border:1px solid var(--border);margin-bottom:16px;">
        <div style="font-size:11.5px;font-weight:600;color:var(--primary);text-transform:uppercase;">Last Validation Run</div>
        <div style="font-size:14px;font-weight:600;color:var(--text-primary);margin-top:2px;">November 12, 2026 • 09:14 AM</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">XGBoost Classifier • 500 records • 91.2% Accuracy</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;font-size:12.5px;color:var(--text-secondary);margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;"><span>Training Partition:</span><strong>400 records (80%)</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Testing Partition:</span><strong>100 records (20%)</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Validation Strategy:</span><strong>5-Fold Stratified CV</strong></div>
      </div>
      <button class="btn-primary" id="retrainBtn" style="width:100%;padding:11px;">
        ${ICONS.refresh}
        <span>Retrain Model on Pipeline Data</span>
      </button>
    </div>
  </div>

  ${state.addUserModalOpen ? renderAddUserModal() : ''}
  `;
}

// =========================================
// Modals (Lead Detail & Add User)
// =========================================
function renderLeadModal(lead) {
  const catColor = getCategoryColor(lead.category);
  return `
  <div class="modal-backdrop" id="modalBackdrop">
    <div class="modal-dialog">
      <div class="modal-dialog-header">
        <div class="modal-dialog-title">Lead Profile & Diagnostic</div>
        <button class="modal-close-btn" id="modalCloseBtn">${ICONS.close}</button>
      </div>
      <div class="modal-dialog-body">
        <div style="text-align:center;padding:20px;border-radius:var(--radius-md);background:var(--bg-subtle);border:1px solid var(--border);">
          <div style="font-size:42px;font-weight:800;font-family:var(--font-mono);color:${catColor};">${lead.score}%</div>
          <div style="font-size:12px;color:var(--text-muted);margin:2px 0 8px;">Estimated Conversion Probability</div>
          ${renderBadge(lead.category)}
        </div>

        <div class="modal-fields-grid">
          <div class="modal-field-item">
            <span class="modal-field-label">Lead Name</span>
            <span class="modal-field-val">${lead.name}</span>
          </div>
          <div class="modal-field-item">
            <span class="modal-field-label">Company</span>
            <span class="modal-field-val">${lead.company}</span>
          </div>
          <div class="modal-field-item">
            <span class="modal-field-label">Email Address</span>
            <span class="modal-field-val">${lead.email}</span>
          </div>
          <div class="modal-field-item">
            <span class="modal-field-label">Phone</span>
            <span class="modal-field-val">${lead.phone}</span>
          </div>
          <div class="modal-field-item">
            <span class="modal-field-label">Acquisition Channel</span>
            <span class="modal-field-val">${lead.source}</span>
          </div>
          <div class="modal-field-item">
            <span class="modal-field-label">Industry</span>
            <span class="modal-field-val">${lead.industry}</span>
          </div>
          <div class="modal-field-item">
            <span class="modal-field-label">Website Visits</span>
            <span class="modal-field-val">${lead.websiteVisits} sessions</span>
          </div>
          <div class="modal-field-item">
            <span class="modal-field-label">Email Engagement</span>
            <span class="modal-field-val">${lead.emailEngagement}</span>
          </div>
          <div class="modal-field-item">
            <span class="modal-field-label">Feature Interactions</span>
            <span class="modal-field-val">${lead.productInteractions} clicks</span>
          </div>
          <div class="modal-field-item">
            <span class="modal-field-label">Prior Customer</span>
            <span class="modal-field-val">${lead.prevPurchase ? 'Yes' : 'No'}</span>
          </div>
        </div>

        <div style="border-top:1px solid var(--border);padding-top:16px;">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;color:var(--text-muted);margin-bottom:10px;">
            Key Influencing Signals (SHAP)
          </div>
          ${lead.factors.map(f => `
            <div class="factor-item-row">
              <span class="factor-name-label">${f.name}</span>
              <div class="factor-track-bar">
                <div class="factor-fill-bar" style="width:${f.pct}%;background:${catColor};"></div>
              </div>
              <span class="factor-val-text">${f.pct}%</span>
            </div>
          `).join('')}
        </div>

        <div class="result-action-callout" style="margin-top:16px;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--primary);margin-bottom:4px;">
            🎯 Recommended Sales Action
          </div>
          ${lead.recommendation}
        </div>
      </div>
    </div>
  </div>
  `;
}

function renderAddUserModal() {
  return `
  <div class="modal-backdrop" id="addUserBackdrop">
    <div class="modal-dialog" style="max-width:440px;">
      <div class="modal-dialog-header">
        <div class="modal-dialog-title">Add System User</div>
        <button class="modal-close-btn" id="closeAddUserBtn">${ICONS.close}</button>
      </div>
      <div class="modal-dialog-body">
        <form id="addUserForm">
          <div class="form-group">
            <label class="form-label" for="newUserName">Full Name</label>
            <input class="form-input" type="text" id="newUserName" placeholder="e.g. Priyanshu Das" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="newUserEmail">Work Email</label>
            <input class="form-input" type="email" id="newUserEmail" placeholder="pdas@leadiq.app" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="newUserRole">Access Role</label>
            <select class="form-select" id="newUserRole">
              <option value="Sales">Sales Representative</option>
              <option value="Admin">Administrator</option>
            </select>
          </div>
          <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">
            <button type="button" class="btn-secondary" id="cancelAddUserBtn">Cancel</button>
            <button type="submit" class="btn-primary">Add User</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `;
}

// =========================================
// Page Specific Event Listeners
// =========================================
function attachPageListeners() {
  // Navigation elements
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  // Modal close handlers
  const closeBtn = document.getElementById('modalCloseBtn');
  const backdrop = document.getElementById('modalBackdrop');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      state.selectedLead = null;
      renderPage();
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        state.selectedLead = null;
        renderPage();
      }
    });
  }

  // Dashboard Hot Lead Row Click
  document.querySelectorAll('.compact-lead-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const lead = state.leads.find(l => l.id === parseInt(row.dataset.leadId));
      if (lead) {
        state.selectedLead = lead;
        renderPage();
      }
    });
  });

  document.querySelectorAll('[data-view-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const lead = state.leads.find(l => l.id === parseInt(btn.dataset.viewId));
      if (lead) {
        state.selectedLead = lead;
        renderPage();
      }
    });
  });

  // All Leads View Action
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const lead = state.leads.find(l => l.id === parseInt(btn.dataset.view));
      if (lead) {
        state.selectedLead = lead;
        renderPage();
      }
    });
  });

  // All Leads Re-score Action (Prefills Predict form)
  document.querySelectorAll('[data-rescore]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const lead = state.leads.find(l => l.id === parseInt(btn.dataset.rescore));
      if (lead) {
        state.leadToRescore = lead;
        state.predictResult = null;
        navigate('predict');
      }
    });
  });

  // All Leads Delete Action
  document.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.del);
      state.leads = state.leads.filter(l => l.id !== id);
      renderPage();
    });
  });

  // Filter Pills (Leads Page)
  document.querySelectorAll('.filter-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.filterCategory = btn.dataset.filter;
      state.currentPage_num = 1;
      renderPage();
    });
  });

  // Leads Search Input (Seamless, preserves input focus)
  const leadSearch = document.getElementById('leadSearch');
  if (leadSearch) {
    leadSearch.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      state.currentPage_num = 1;
      updateLeadsTableOnly();
    });
  }

  // Column Sorting
  document.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.sort;
      if (state.sortCol === col) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortCol = col;
        state.sortDir = 'desc';
      }
      renderPage();
    });
  });

  // Pagination buttons
  document.querySelectorAll('[data-pag]').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.pag;
      const filtered = getFilteredLeads();
      const totalPages = Math.ceil(filtered.length / state.perPage) || 1;
      if (val === 'prev') {
        state.currentPage_num = Math.max(1, state.currentPage_num - 1);
      } else if (val === 'next') {
        state.currentPage_num = Math.min(totalPages, state.currentPage_num + 1);
      } else {
        state.currentPage_num = parseInt(val);
      }
      renderPage();
    });
  });

  // Predict Range Sliders Live Updates
  ['pVisits', 'pInteractions', 'pTime'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const tagId = { pVisits: 'visitsVal', pInteractions: 'interVal', pTime: 'timeVal' }[id];
    el.addEventListener('input', () => {
      const tag = document.getElementById(tagId);
      if (tag) tag.textContent = id === 'pTime' ? `${el.value}m` : el.value;
    });
  });

  // Predict Form Submission
  const predictForm = document.getElementById('predictForm');
  if (predictForm) {
    predictForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('predictSubmitBtn');
      btn.innerHTML = `<div class="loading-spinner"></div><span>Evaluating with Model…</span>`;
      btn.disabled = true;

      setTimeout(() => {
        const fields = {
          prevPurchase: document.getElementById('pPrevPurchase').value,
          visits: parseInt(document.getElementById('pVisits').value) || 0,
          interactions: parseInt(document.getElementById('pInteractions').value) || 0,
          email: document.getElementById('pEmail').value,
          timeSpent: parseInt(document.getElementById('pTime').value) || 0,
        };
        state.predictResult = simulatePrediction(fields);
        renderPage();
      }, 700);
    });
  }

  // Save Lead to Pipeline Action
  const saveLeadBtn = document.getElementById('saveLeadBtn');
  if (saveLeadBtn) {
    saveLeadBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('pName');
      const companyInput = document.getElementById('pCompany');
      const industryInput = document.getElementById('pIndustry');
      const sourceInput = document.getElementById('pSource');
      const visitsInput = document.getElementById('pVisits');
      const interactionsInput = document.getElementById('pInteractions');
      const timeInput = document.getElementById('pTime');
      const emailInput = document.getElementById('pEmail');
      const prevPurchaseInput = document.getElementById('pPrevPurchase');

      const name = nameInput ? nameInput.value.trim() : 'New Lead';
      const company = companyInput ? companyInput.value.trim() : 'Acme Corp';
      const cleanEmail = name.toLowerCase().replace(/\s+/g, '.') + '@' + company.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';

      const newLead = {
        id: Date.now(),
        name: name || 'Scored Lead',
        company: company || 'Enterprise Client',
        email: cleanEmail,
        phone: '+1 (555) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
        source: sourceInput ? sourceInput.value : 'Website',
        industry: industryInput ? industryInput.value : 'SaaS',
        score: state.predictResult.score,
        category: state.predictResult.category,
        websiteVisits: visitsInput ? parseInt(visitsInput.value) : 8,
        emailEngagement: emailInput && emailInput.value === 'high' ? 'High' : emailInput && emailInput.value === 'medium' ? 'Medium' : 'Low',
        productInteractions: interactionsInput ? parseInt(interactionsInput.value) : 5,
        prevPurchase: prevPurchaseInput ? prevPurchaseInput.value === 'yes' : false,
        timeSpent: timeInput ? parseInt(timeInput.value) : 20,
        createdAt: new Date().toISOString().split('T')[0],
        lastActivity: 'Just now',
        factors: state.predictResult.factors,
        recommendation: state.predictResult.recommendation
      };

      state.leads.unshift(newLead);
      state.predictResult = null;
      state.leadToRescore = null;
      navigate('leads');
    });
  }

  // Admin User Toggle
  document.querySelectorAll('[data-toggle-user]').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.dataset.toggleUser);
      const user = state.adminUsers.find(u => u.id === id);
      if (user) {
        user.active = !user.active;
        renderPage();
      }
    });
  });

  // Admin System Settings Toggle
  document.querySelectorAll('[data-sys-toggle]').forEach(el => {
    el.addEventListener('click', () => {
      const track = el.querySelector('.toggle-switch-track');
      if (track) track.classList.toggle('on');
    });
  });

  // Admin Add User Modal Open/Close
  const openAddUserBtn = document.getElementById('openAddUserBtn');
  const closeAddUserBtn = document.getElementById('closeAddUserBtn');
  const cancelAddUserBtn = document.getElementById('cancelAddUserBtn');
  const addUserBackdrop = document.getElementById('addUserBackdrop');

  if (openAddUserBtn) {
    openAddUserBtn.addEventListener('click', () => {
      state.addUserModalOpen = true;
      renderPage();
    });
  }
  if (closeAddUserBtn) {
    closeAddUserBtn.addEventListener('click', () => {
      state.addUserModalOpen = false;
      renderPage();
    });
  }
  if (cancelAddUserBtn) {
    cancelAddUserBtn.addEventListener('click', () => {
      state.addUserModalOpen = false;
      renderPage();
    });
  }
  if (addUserBackdrop) {
    addUserBackdrop.addEventListener('click', (e) => {
      if (e.target === addUserBackdrop) {
        state.addUserModalOpen = false;
        renderPage();
      }
    });
  }

  const addUserForm = document.getElementById('addUserForm');
  if (addUserForm) {
    addUserForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('newUserName').value.trim();
      const email = document.getElementById('newUserEmail').value.trim();
      const role = document.getElementById('newUserRole').value;
      if (name && email) {
        state.adminUsers.push({
          id: Date.now(),
          name,
          email,
          role,
          status: 'online',
          active: true
        });
        state.addUserModalOpen = false;
        renderPage();
      }
    });
  }

  // Admin Retrain Button
  const retrainBtn = document.getElementById('retrainBtn');
  if (retrainBtn) {
    retrainBtn.addEventListener('click', () => {
      retrainBtn.innerHTML = `<div class="loading-spinner"></div><span>Training Model Pipeline…</span>`;
      retrainBtn.disabled = true;
      setTimeout(() => {
        retrainBtn.innerHTML = `${ICONS.check}<span>Model Retrained Successfully (91.2% Acc)</span>`;
        retrainBtn.style.background = 'var(--success)';
        setTimeout(() => {
          retrainBtn.innerHTML = `${ICONS.refresh}<span>Retrain Model on Pipeline Data</span>`;
          retrainBtn.style.background = '';
          retrainBtn.disabled = false;
        }, 2500);
      }, 1500);
    });
  }

  // Admin Upload Dropzone
  const uploadZone = document.getElementById('uploadZone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('drag-over');
    });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) {
        uploadZone.innerHTML = `
          <div style="color:var(--success);margin-bottom:6px">${ICONS.check}</div>
          <div style="font-weight:600;color:var(--text-primary);font-size:13.5px">${file.name}</div>
          <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">${(file.size / 1024).toFixed(1)} KB • Ready for validation</div>
        `;
      }
    });
    uploadZone.addEventListener('click', () => {
      const inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = '.csv';
      inp.click();
      inp.onchange = () => {
        if (inp.files[0]) {
          const file = inp.files[0];
          uploadZone.innerHTML = `
            <div style="color:var(--success);margin-bottom:6px">${ICONS.check}</div>
            <div style="font-weight:600;color:var(--text-primary);font-size:13.5px">${file.name}</div>
            <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">${(file.size / 1024).toFixed(1)} KB • Dataset loaded</div>
          `;
        }
      };
    });
  }
}

// Partial DOM updater for Leads table to prevent focus loss while typing
function updateLeadsTableOnly() {
  const tbody = document.getElementById('leadsTableBody');
  const pagination = document.getElementById('leadsPagination');
  if (!tbody || !pagination) return;

  const filtered = getFilteredLeads();
  const totalPages = Math.ceil(filtered.length / state.perPage) || 1;
  const page = Math.min(state.currentPage_num, totalPages);
  const startIdx = (page - 1) * state.perPage;
  const paginated = filtered.slice(startIdx, startIdx + state.perPage);

  tbody.innerHTML = renderTableRows(paginated);
  pagination.innerHTML = renderPaginationHtml(filtered.length, page, totalPages, startIdx, paginated.length);

  // Re-attach row action listeners
  tbody.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const lead = state.leads.find(l => l.id === parseInt(btn.dataset.view));
      if (lead) {
        state.selectedLead = lead;
        renderPage();
      }
    });
  });

  tbody.querySelectorAll('[data-rescore]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const lead = state.leads.find(l => l.id === parseInt(btn.dataset.rescore));
      if (lead) {
        state.leadToRescore = lead;
        state.predictResult = null;
        navigate('predict');
      }
    });
  });

  tbody.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.del);
      state.leads = state.leads.filter(l => l.id !== id);
      updateLeadsTableOnly();
    });
  });

  pagination.querySelectorAll('[data-pag]').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.pag;
      if (val === 'prev') {
        state.currentPage_num = Math.max(1, state.currentPage_num - 1);
      } else if (val === 'next') {
        state.currentPage_num = Math.min(totalPages, state.currentPage_num + 1);
      } else {
        state.currentPage_num = parseInt(val);
      }
      updateLeadsTableOnly();
    });
  });
}

// =========================================
// Initial Application Bootstrap
// =========================================
render();
