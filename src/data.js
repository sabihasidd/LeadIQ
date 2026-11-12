// =========================================
// LeadIQ – Mock Data
// =========================================
export const MOCK_LEADS = [
  {
    id: 1, name: 'Sarah Chen', company: 'TechFlow Inc.', email: 'sarah@techflow.com',
    phone: '+1 (555) 234-5678', source: 'Website', industry: 'SaaS',
    score: 92, category: 'hot',
    websiteVisits: 12, emailEngagement: 'High', productInteractions: 9,
    prevPurchase: true, timeSpent: 42,
    createdAt: '2026-10-28', lastActivity: '2 hours ago',
    factors: [
      { name: 'Website Visits', pct: 92 },
      { name: 'Product Interactions', pct: 85 },
      { name: 'Email Engagement', pct: 78 },
      { name: 'Previous Purchase', pct: 95 },
    ],
    recommendation: 'Prioritise a personal follow-up call within 24 hours. This lead has very high intent signals.'
  },
  {
    id: 2, name: 'Marcus Rivera', company: 'CloudBridge LLC', email: 'mrivera@cloudbridge.io',
    phone: '+1 (555) 876-5432', source: 'LinkedIn', industry: 'FinTech',
    score: 74, category: 'warm',
    websiteVisits: 6, emailEngagement: 'Medium', productInteractions: 4,
    prevPurchase: false, timeSpent: 18,
    createdAt: '2026-10-30', lastActivity: '1 day ago',
    factors: [
      { name: 'Website Visits', pct: 60 },
      { name: 'Product Interactions', pct: 45 },
      { name: 'Email Engagement', pct: 55 },
      { name: 'Company Size', pct: 80 },
    ],
    recommendation: 'Send a targeted product demo invite. Nurture with case studies relevant to FinTech.'
  },
  {
    id: 3, name: 'Priya Kapoor', company: 'DataNest Solutions', email: 'priya.k@datanest.in',
    phone: '+91 98765 43210', source: 'Referral', industry: 'Analytics',
    score: 88, category: 'hot',
    websiteVisits: 10, emailEngagement: 'High', productInteractions: 7,
    prevPurchase: true, timeSpent: 35,
    createdAt: '2026-10-29', lastActivity: '5 hours ago',
    factors: [
      { name: 'Referral Source', pct: 90 },
      { name: 'Email Engagement', pct: 82 },
      { name: 'Website Visits', pct: 75 },
      { name: 'Previous Purchase', pct: 95 },
    ],
    recommendation: 'Prioritise this lead. Mention the referral source and offer a personalised onboarding session.'
  },
  {
    id: 4, name: 'James O\'Connor', company: 'RetailPulse', email: 'joconnor@retailpulse.com',
    phone: '+44 20 7946 0001', source: 'Cold Email', industry: 'Retail',
    score: 31, category: 'cold',
    websiteVisits: 1, emailEngagement: 'Low', productInteractions: 1,
    prevPurchase: false, timeSpent: 3,
    createdAt: '2026-11-01', lastActivity: '4 days ago',
    factors: [
      { name: 'Website Visits', pct: 20 },
      { name: 'Email Engagement', pct: 15 },
      { name: 'Product Interactions', pct: 10 },
      { name: 'Company Fit', pct: 40 },
    ],
    recommendation: 'Add to a long-term nurture campaign. Re-engage with educational content on retail automation.'
  },
  {
    id: 5, name: 'Aisha Okafor', company: 'HealthSync', email: 'aisha@healthsync.ng',
    phone: '+234 801 234 5678', source: 'Webinar', industry: 'HealthTech',
    score: 65, category: 'warm',
    websiteVisits: 5, emailEngagement: 'Medium', productInteractions: 3,
    prevPurchase: false, timeSpent: 15,
    createdAt: '2026-10-31', lastActivity: '2 days ago',
    factors: [
      { name: 'Webinar Attendance', pct: 85 },
      { name: 'Email Engagement', pct: 55 },
      { name: 'Website Visits', pct: 45 },
      { name: 'Industry Fit', pct: 70 },
    ],
    recommendation: 'Follow up with the webinar recording and a relevant product summary. Book a demo call.'
  },
  {
    id: 6, name: 'Liam Zhao', company: 'BuildScale', email: 'liam.z@buildscale.co',
    phone: '+1 (555) 112-3344', source: 'Website', industry: 'Construction',
    score: 48, category: 'warm',
    websiteVisits: 4, emailEngagement: 'Low', productInteractions: 2,
    prevPurchase: false, timeSpent: 10,
    createdAt: '2026-11-02', lastActivity: '1 day ago',
    factors: [
      { name: 'Website Visits', pct: 40 },
      { name: 'Product Interactions', pct: 30 },
      { name: 'Email Engagement', pct: 25 },
      { name: 'Company Size', pct: 55 },
    ],
    recommendation: 'Send a construction-specific use case study. Schedule a 15-min call to gauge interest.'
  },
  {
    id: 7, name: 'Fatima Al-Rashid', company: 'LogiTrack', email: 'farashid@logitrack.ae',
    phone: '+971 55 123 4567', source: 'Trade Show', industry: 'Logistics',
    score: 79, category: 'hot',
    websiteVisits: 8, emailEngagement: 'High', productInteractions: 5,
    prevPurchase: false, timeSpent: 28,
    createdAt: '2026-10-27', lastActivity: '3 hours ago',
    factors: [
      { name: 'Trade Show Interaction', pct: 95 },
      { name: 'Email Engagement', pct: 72 },
      { name: 'Website Visits', pct: 65 },
      { name: 'Industry Fit', pct: 75 },
    ],
    recommendation: 'High intent from trade show. Send a personalised proposal within 48 hours.'
  },
  {
    id: 8, name: 'Noah Williams', company: 'EduSpark', email: 'noah@eduspark.org',
    phone: '+1 (555) 998-7766', source: 'Blog', industry: 'EdTech',
    score: 22, category: 'cold',
    websiteVisits: 2, emailEngagement: 'Low', productInteractions: 0,
    prevPurchase: false, timeSpent: 4,
    createdAt: '2026-11-03', lastActivity: '6 days ago',
    factors: [
      { name: 'Website Visits', pct: 15 },
      { name: 'Email Engagement', pct: 10 },
      { name: 'Product Interactions', pct: 0 },
      { name: 'Industry Fit', pct: 30 },
    ],
    recommendation: 'Early-stage lead. Add to newsletter for EdTech content. Monitor for future engagement.'
  },
];

export const NOTIFICATIONS = [
  { id: 1, text: 'Sarah Chen scored HOT — 92% conversion probability', time: '2 hours ago', read: false },
  { id: 2, text: 'New lead imported: Fatima Al-Rashid (LogiTrack)', time: '3 hours ago', read: false },
  { id: 3, text: 'Model retrained — XGBoost accuracy improved to 91.2%', time: '1 day ago', read: true },
  { id: 4, text: 'Weekly report ready: 24 hot leads this week', time: '2 days ago', read: true },
];

export const MODEL_METRICS = {
  accuracy: 91.2, precision: 88.5, recall: 86.3, f1: 87.4, rocAuc: 0.934,
  confusion: { tp: 182, fp: 23, fn: 29, tn: 266 },
  models: [
    { name: 'XGBoost (Best)', auc: 0.934, bar: 93.4, color: '#6366f1', best: true },
    { name: 'Random Forest', auc: 0.918, bar: 91.8, color: '#22d3ee' },
    { name: 'Logistic Regression', auc: 0.879, bar: 87.9, color: '#f59e0b' },
    { name: 'Decision Tree', auc: 0.842, bar: 84.2, color: '#38bdf8' },
  ],
  monthlyConversion: [
    { month: 'May', converted: 42, total: 180 },
    { month: 'Jun', converted: 58, total: 210 },
    { month: 'Jul', converted: 51, total: 195 },
    { month: 'Aug', converted: 73, total: 240 },
    { month: 'Sep', converted: 68, total: 220 },
    { month: 'Oct', converted: 86, total: 265 },
    { month: 'Nov', converted: 47, total: 155 },
  ]
};

export const ADMIN_USERS = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@leadiq.app', role: 'Admin', status: 'online', active: true },
  { id: 2, name: 'Sneha Patel', email: 'sneha@leadiq.app', role: 'Sales', status: 'online', active: true },
  { id: 3, name: 'Dev Kohli', email: 'dev@leadiq.app', role: 'Sales', status: 'offline', active: true },
  { id: 4, name: 'Anjali Mehra', email: 'anjali@leadiq.app', role: 'Sales', status: 'offline', active: false },
];
