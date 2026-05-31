'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Zap, CheckCircle2, Play, AlertCircle, Bot, Send, Loader2,
  TrendingUp, Headphones, Megaphone, Search, Calendar, BarChart3,
  Globe, MessageSquare, Database, Terminal, Settings, Mail, RefreshCw
} from 'lucide-react';

// Agent metadata dictionary
const agentData: Record<string, {
  name: string;
  role: string;
  desc: string;
  icon: any;
  color: string;
  bg: string;
  border: string;
  metrics: { label: string; val: string; desc: string }[];
  features: string[];
  integrations: { name: string; type: string; desc: string; icon: string }[];
  deployOptions: { label: string; desc: string; icon: any }[];
}> = {
  sales: {
    name: 'AI Sales Agent',
    role: 'Revenue Generation',
    desc: 'Qualifies leads, schedules demos, handles objections, and closes deals 24/7 without human intervention.',
    icon: TrendingUp,
    color: 'from-green-400 to-cyan-500',
    bg: 'from-green-500/10 to-cyan-500/10',
    border: 'border-green-500/20',
    metrics: [
      { label: 'Leads Generated', val: '1,284', desc: 'Active pipeline growth' },
      { label: 'Conversion Rate', val: '68%', desc: 'Leads closed successfully' },
      { label: 'Revenue Generated', val: '$284,500', desc: 'Direct software-sourced income' },
      { label: 'Meetings Booked', val: '412', desc: 'Demo invitations accepted' }
    ],
    features: [
      'Lead Qualification (BANT criteria validation)',
      'Automatic Follow-Ups (Smart email & WhatsApp cadences)',
      'Meeting Scheduling (Direct calendar synchronization)',
      'Proposal Generation (Dynamic custom PDF proposals)',
      'CRM Integration (Live hub syncing)',
      'WhatsApp Sales Automation (Direct prospect chat workflows)'
    ],
    integrations: [
      { name: 'HubSpot', type: 'CRM System', desc: 'Sync prospects, leads, and customer interaction logs.', icon: '🎯' },
      { name: 'Salesforce', type: 'Enterprise CRM', desc: 'Deep pipeline sync for enterprise pipelines.', icon: '☁️' },
      { name: 'WhatsApp', type: 'Messaging Platform', desc: 'Engage prospects on their preferred mobile channels.', icon: '💬' },
      { name: 'Gmail', type: 'Email client', desc: 'Send automated customized followups from your domain.', icon: '📧' },
      { name: 'Google Calendar', type: 'Scheduling System', desc: 'Auto-schedule demos directly onto account executive calendars.', icon: '📅' }
    ],
    deployOptions: [
      { label: 'Website Widget', desc: 'Render custom inline sales booking grids on pages.', icon: Globe },
      { label: 'WhatsApp', desc: 'Route incoming WhatsApp queries to the sales bot.', icon: MessageSquare },
      { label: 'CRM integration', desc: 'Direct syncing trigger into pipelines.', icon: Database },
      { label: 'API Connection', desc: 'Full custom headless integrations.', icon: Terminal }
    ]
  },
  support: {
    name: 'AI Support Agent',
    role: 'Customer Experience',
    desc: 'Resolves 80% of tickets instantly. Escalates complex issues with full context to human agents.',
    icon: Headphones,
    color: 'from-blue-400 to-indigo-500',
    bg: 'from-blue-500/10 to-indigo-500/10',
    border: 'border-blue-500/20',
    metrics: [
      { label: 'Tickets Resolved', val: '4,850', desc: 'Auto-resolved instant tickets' },
      { label: 'CSAT Score', val: '4.95 / 5', desc: 'Customer satisfaction rating' },
      { label: 'Avg Response Time', val: '1.2s', desc: 'Instant multilingual responses' },
      { label: 'Active Conversations', val: '12', desc: 'Live customer threads running' }
    ],
    features: [
      'FAQ Responses (Context-aware instant answers)',
      'Ticket Creation (Direct ticketing platform sync)',
      'Escalation Management (Smart handoff to human agents)',
      'Knowledge Base Search (AI semantic querying)',
      'Multi-language Support (Simultaneous translation in 80+ languages)'
    ],
    integrations: [
      { name: 'Zendesk', type: 'Support Desk', desc: 'Read knowledge base and manage global ticket systems.', icon: '🎫' },
      { name: 'Freshdesk', type: 'Customer Support', desc: 'Log conversations and resolve user issues.', icon: '🎯' },
      { name: 'WhatsApp', type: 'Customer Mobile Channels', desc: 'Direct mobile customer support.', icon: '💬' },
      { name: 'Messenger', type: 'Social Inbox', desc: 'Automate support threads on Facebook Pages.', icon: '🔵' },
      { name: 'Slack', type: 'Internal Workspace', desc: 'Receive internal team helpdesk requests.', icon: '⚡' }
    ],
    deployOptions: [
      { label: 'Website Chat', desc: 'Floating premium interactive chat widget.', icon: MessageSquare },
      { label: 'WhatsApp Bot', desc: 'Fully operational WhatsApp customer hotline.', icon: Globe },
      { label: 'Messenger', desc: 'Social account support handling.', icon: MessageSquare },
      { label: 'Support Portal', desc: 'Integrate directly inside your customer dashboard.', icon: Database }
    ]
  },
  marketing: {
    name: 'AI Marketing Agent',
    role: 'Brand & Growth',
    desc: 'Creates campaigns, writes copy, schedules posts, and optimizes ad spend across all channels.',
    icon: Megaphone,
    color: 'from-purple-400 to-pink-500',
    bg: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/20',
    metrics: [
      { label: 'Avg Campaign ROI', val: '+240%', desc: 'Average boost in active ads' },
      { label: 'Engagement Rate', val: '8.4%', desc: 'Average clicks & interactions' },
      { label: 'Content Generated', val: '1,420', desc: 'Social posts & ad drafts written' },
      { label: 'Ad Spend Optimization', val: '-32%', desc: 'CPC reduction via automated bidding' }
    ],
    features: [
      'Content Creation (Blog drafts, newsletters, scripts)',
      'Ad Copy Generation (High-converting Facebook & Google ads)',
      'Campaign Planning (Strategic dynamic marketing calendars)',
      'Social Media Automation (Direct auto-scheduling & posting)',
      'Audience Insights (Micro-targeted user segmentation analysis)'
    ],
    integrations: [
      { name: 'Facebook Ads', type: 'Ad Platform', desc: 'Launch, track, and optimize paid social ad spend.', icon: '👥' },
      { name: 'Instagram', type: 'Visual Socials', desc: 'Automate grid layouts, stories, and hashtags.', icon: '📸' },
      { name: 'LinkedIn', type: 'B2B Professional', desc: 'Write organic thought leadership articles and ad copy.', icon: '💼' },
      { name: 'Google Ads', type: 'Search Campaigns', desc: 'Bid dynamically on high-intent search keywords.', icon: '🔍' },
      { name: 'Mailchimp', type: 'Email Marketing', desc: 'Manage lists and send personalized weekly updates.', icon: '📧' }
    ],
    deployOptions: [
      { label: 'Social Dashboard', desc: 'Direct connection into Hootsuite or native systems.', icon: Globe },
      { label: 'Marketing Platform', desc: 'Integrate triggers within your active workspace.', icon: Database },
      { label: 'API Connection', desc: 'Automate content pushes programmatically.', icon: Terminal }
    ]
  },
  research: {
    name: 'AI Research Agent',
    role: 'Intelligence & Insights',
    desc: 'Scours the internet, analyzes competitors, and delivers actionable market intelligence reports.',
    icon: Search,
    color: 'from-amber-400 to-orange-500',
    bg: 'from-amber-500/10 to-orange-500/10',
    border: 'border-amber-500/20',
    metrics: [
      { label: 'Reports Generated', val: '342', desc: 'Detailed PDF competitor portfolios' },
      { label: 'Sources Analyzed', val: '148,200', desc: 'Search pages, documents, and news read' },
      { label: 'Competitor Insights', val: '1,840', desc: 'Specific threat/opportunity logs' },
      { label: 'Avg Time Saved', val: '40h / wk', desc: 'Replaced manual desk research' }
    ],
    features: [
      'Market Research (Detailed macro & microeconomic analysis)',
      'Competitor Analysis (Pricing structure & feature audits)',
      'Industry Trends (Emerging technologies & patterns tracker)',
      'Data Collection (Semantic scraping & document ingestion)',
      'Report Generation (Clean professional PDF & markdown summaries)'
    ],
    integrations: [
      { name: 'Google Search API', type: 'Search Crawler', desc: 'Semantic web crawlers querying global indexes.', icon: '🔍' },
      { name: 'Notion', type: 'Knowledge System', desc: 'Sync generated reports directly to team wikis.', icon: '📓' },
      { name: 'Google Sheets', type: 'Data Sheets', desc: 'Export parsed tables, price metrics, and lists.', icon: '📊' },
      { name: 'Web Sources', type: 'Database Crawl', desc: 'Ingest raw PDF documents and SEC filings.', icon: '🌐' }
    ],
    deployOptions: [
      { label: 'Research Dashboard', desc: 'Sleek visual reports hub within your app.', icon: Globe },
      { label: 'Team Workspace', desc: 'Sync directly to Slack, Teams, or Notion pages.', icon: MessageSquare },
      { label: 'API Integration', desc: 'Build headless market trackers.', icon: Terminal }
    ]
  },
  scheduling: {
    name: 'AI Scheduling Agent',
    role: 'Calendar Management',
    desc: 'Books meetings, sends reminders, syncs calendars, and optimizes schedules across time zones.',
    icon: Calendar,
    color: 'from-teal-400 to-cyan-500',
    bg: 'from-teal-500/10 to-cyan-500/10',
    border: 'border-teal-500/20',
    metrics: [
      { label: 'Meetings Scheduled', val: '12,850', desc: 'Successfully arranged appointments' },
      { label: 'Calendar Sync Status', val: '100%', desc: 'Real-time multi-platform calendar updates' },
      { label: 'No-Show Reduction', val: '-75%', desc: 'Drop in missed meetings due to smart texts' },
      { label: 'Reminders Sent', val: '25,700', desc: 'Custom SMS & Email reminders sent' }
    ],
    features: [
      'Appointment Booking (Easy grid slot allocations)',
      'Calendar Management (Double-booking protection algorithms)',
      'Meeting Reminders (Smart contextual escalation triggers)',
      'Time Zone Handling (Auto-detection & display calculations)',
      'Rescheduling Automation (One-click text scheduling adjustments)'
    ],
    integrations: [
      { name: 'Google Calendar', type: 'Calendar', desc: 'Direct integration with your Gmail workspace.', icon: '📅' },
      { name: 'Outlook Calendar', type: 'Microsoft Suite', desc: 'Sync enterprise Microsoft accounts.', icon: '🪟' },
      { name: 'Zoom', type: 'Video Conferencing', desc: 'Generate unique video links automatically.', icon: '📹' },
      { name: 'Google Meet', type: 'Video Calls', desc: 'Inject Meet details directly into invites.', icon: '🌐' },
      { name: 'Calendly', type: 'API Grid Sync', desc: 'Sync native user preferences easily.', icon: '⚡' }
    ],
    deployOptions: [
      { label: 'Website Booking Widget', desc: 'Embed slot selectors onto your landing page.', icon: Globe },
      { label: 'WhatsApp Scheduler', desc: 'Allow customers to book slots via direct mobile chat.', icon: MessageSquare },
      { label: 'Email Bot', desc: 'Arrange slots by CCing the AI bot into email threads.', icon: Mail }
    ]
  },
  analytics: {
    name: 'AI Analytics Agent',
    role: 'Data Intelligence',
    desc: 'Monitors KPIs, identifies trends, generates reports, and predicts outcomes with ML models.',
    icon: BarChart3,
    color: 'from-indigo-400 to-violet-500',
    bg: 'from-indigo-500/10 to-violet-500/10',
    border: 'border-indigo-500/20',
    metrics: [
      { label: 'Data Points Analyzed', val: '52,000,000', desc: 'Processed signals across datasets' },
      { label: 'Reports Compiled', val: '8,400', desc: 'Visual summaries generated' },
      { label: 'Prediction Accuracy', val: '94.2%', desc: 'Machine learning forecast score' },
      { label: 'Business Insights', val: '184', desc: 'Actionable optimizations found' }
    ],
    features: [
      'KPI Tracking (Real-time metric health monitoring)',
      'Revenue Analysis (Anomaly detection & margin checks)',
      'Performance Monitoring (Systems, ads, & pipeline charts)',
      'Forecasting (Predictive modeling up to 12 months out)',
      'Automated Reporting (Direct updates sent to Slack/Email)'
    ],
    integrations: [
      { name: 'Google Analytics', type: 'Web Traffic', desc: 'Analyze user flows and acquisition pipelines.', icon: '📊' },
      { name: 'Meta Ads', type: 'Social Campaign Data', desc: 'Track CPC, CTR, and dynamic conversion rates.', icon: '👥' },
      { name: 'Google Ads', type: 'Search campaign analytics', desc: 'Ingest keywords and cost metrics.', icon: '🔍' },
      { name: 'CRM Systems', type: 'Sales Data Sync', desc: 'Audit contracts, win rates, and cycles.', icon: '🎯' },
      { name: 'Databases', type: 'SQL / NoSQL Ingest', desc: 'Direct pipeline connection into Postgres, BigQuery, etc.', icon: '💽' }
    ],
    deployOptions: [
      { label: 'Interactive Dashboard', desc: 'Stunning visualizations for executive boardrooms.', icon: Globe },
      { label: 'Business Reports', desc: 'Schedules executive summaries via PDF digests.', icon: Mail },
      { label: 'Headless API', desc: 'Feed raw insights into third-party interfaces.', icon: Terminal }
    ]
  }
};

export default function WorkspacePage({ params }: { params: { id: string } }) {
  const agentId = params.id;
  const agent = agentData[agentId];

  // Component states
  const [connectedIntegrations, setConnectedIntegrations] = useState<Record<string, boolean>>({});
  const [activeDeployOptions, setActiveDeployOptions] = useState<Record<string, boolean>>({});
  
  // Sales & Support Chat Simulator states
  const [messages, setMessages] = useState<{ sender: 'user' | 'agent'; text: string }[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [typing, setTyping] = useState(false);

  // Marketing Generator states
  const [campaignOutput, setCampaignOutput] = useState<string | null>(null);
  const [marketingTopic, setMarketingTopic] = useState('');
  const [marketingGoal, setMarketingGoal] = useState('lead-gen');
  const [marketingLoading, setMarketingLoading] = useState(false);

  // Research Generator states
  const [researchOutput, setResearchOutput] = useState<string | null>(null);
  const [researchTopic, setResearchTopic] = useState('');
  const [researchLoading, setResearchLoading] = useState(false);
  const [researchLogs, setResearchLogs] = useState<string[]>([]);

  // Scheduling Calendar states
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookedMeetings, setBookedMeetings] = useState<{ date: number; slot: string; name: string }[]>([]);

  // Analytics Forecast states
  const [forecastMonths, setForecastMonths] = useState(6);
  const [growthScenario, setGrowthScenario] = useState<'moderate' | 'conservative' | 'aggressive'>('moderate');

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize specific simulator defaults
  useEffect(() => {
    if (agentId === 'sales') {
      setMessages([
        { sender: 'agent', text: "Hey! I am the AI Sales Agent for DevAIO. I'm currently scanning your product portfolio. Are you looking to scale pipeline generation, qualify inbound leads automatically, or sync meetings onto your sales calendars?" }
      ]);
    } else if (agentId === 'support') {
      setMessages([
        { sender: 'agent', text: "Hello! Welcome to DevAIO Support. I can resolve queries instantly, check ticket statuses, or search our knowledge base. How can I help you today?" }
      ]);
    }
  }, [agentId]);

  // Scroll chat simulator to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  if (!agent) {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
        <h1 className="font-heading font-bold text-3xl text-white mb-2">Agent Workspace Not Found</h1>
        <p className="text-slate-400 max-w-md mb-6">The requested agent workspace configuration is unavailable or invalid. Please check the route and try again.</p>
        <Link href="/" className="btn-primary text-sm px-6 py-3 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Platform
        </Link>
      </div>
    );
  }

  const AgentIcon = agent.icon;

  // Toggle integrations
  const toggleIntegration = (name: string) => {
    setConnectedIntegrations(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Toggle deploy options
  const toggleDeploy = (name: string) => {
    setActiveDeployOptions(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Chatbot Send Message handler (Sales & Support)
  const handleSendMessage = () => {
    if (!inputVal.trim()) return;
    const userText = inputVal.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputVal('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      let reply = "I understand. I am analyzing that query to formulate the optimal workflow configuration. Let me know if you would like me to push this automation sequence to your live CRM!";
      
      if (agentId === 'sales') {
        const lower = userText.toLowerCase();
        if (lower.includes('price') || lower.includes('cost') || lower.includes('plan')) {
          reply = "Our plans start at $49/mo for the Starter tier and go up to $149/mo for Pro, which unlocks 10 custom AI agents! I can schedule a demo with one of our engineers to walk you through our volume discounts if you'd like.";
        } else if (lower.includes('demo') || lower.includes('book') || lower.includes('schedule')) {
          reply = "Perfect! I can sync your calendar directly. Please type 'book demo' or navigate to our Scheduling Agent workspace to lock in a time that works best for you!";
        } else if (lower.includes('crm') || lower.includes('hubspot') || lower.includes('salesforce')) {
          reply = "Yes! I support native 2-way sync with HubSpot, Salesforce, and Zoho. All qualified leads, emails, and call transcripts flow instantly into your pipelines.";
        }
      } else if (agentId === 'support') {
        const lower = userText.toLowerCase();
        if (lower.includes('whatsapp') || lower.includes('connect')) {
          reply = "Connecting WhatsApp takes under 3 minutes! In your Sidebar under Integrations, click WhatsApp, scan the QR code to authenticate via WhatsApp Business API, and you are ready to automate responses.";
        } else if (lower.includes('refund') || lower.includes('cancel')) {
          reply = "We offer a 14-day money-back guarantee on all our plans. You can cancel your subscription anytime directly from your Billing Settings page, no questions asked.";
        } else if (lower.includes('human') || lower.includes('support') || lower.includes('agent')) {
          reply = "No problem! I can immediately escalate this thread to our customer success team. A support representative will be in touch with you shortly via email.";
        }
      }

      setMessages(prev => [...prev, { sender: 'agent', text: reply }]);
    }, 1200);
  };

  // Quick reply messages
  const sendQuickReply = (text: string) => {
    setInputVal(text);
    // Submit slightly delayed to allow input field updating visualization
    setTimeout(() => {
      setInputVal(text);
    }, 50);
  };

  // Marketing Campaign mock generator
  const handleGenerateCampaign = () => {
    if (!marketingTopic.trim()) return;
    setMarketingLoading(true);
    setCampaignOutput(null);

    setTimeout(() => {
      setMarketingLoading(false);
      const isLeadGen = marketingGoal === 'lead-gen';
      setCampaignOutput(`🚀 MOCK GENERATED CAMPAIGN: ${marketingTopic.toUpperCase()}

Tone of Voice: ${marketingGoal === 'lead-gen' ? 'Action-Oriented' : 'Educational & Professional'}

🎯 Facebook & Instagram Ad Blueprint
------------------------------------
Headline: ${isLeadGen ? 'Stop Wasting 20+ Hours a Week on Automations!' : 'The Next Generation of Corporate Automation is Here.'}
Primary Text: Are you tired of manual tasks slowing down your team? Introducing the ultimate AI-driven workflow assistant for ${marketingTopic}. Automatically sync databases, respond to customer inquiries, and close leads 24/7.
CTA Button: ${isLeadGen ? 'Sign Up (Try Free)' : 'Learn More'}
Estimated CPC: $1.24 | Targeted CTR: 4.8%

✉️ High-Converting Email Newsletter Outline
-------------------------------------------
Subject: The automation blueprint for ${marketingTopic} ⚡
Body Preview: Let's face it: manual database management is costing you money. In our latest case study, we outline how integrating AI agents boosted productivity by 60%...

📱 Viral Twitter / X Thread Blueprint
------------------------------------
1/ Manual pipelines are dead. If your team is still copy-pasting customer records, you're losing money. Here is how we automated ${marketingTopic} with DevAIO in under 10 minutes: 🧵
2/ By deploying an AI Analytics Agent, we connected our Stripe database and Google Ads campaigns. AI now forecasts client churn with 94% accuracy...`);
    }, 1800);
  };

  // Research Mock Report generator
  const handleGenerateResearch = () => {
    if (!researchTopic.trim()) return;
    setResearchLoading(true);
    setResearchOutput(null);
    setResearchLogs([]);

    const logSteps = [
      "🔍 Launching semantic web crawlers...",
      "🌐 Scanning competitor landing pages & price grids...",
      "📊 Scraping customer reviews on G2 & Capterra...",
      "📂 Ingesting public SEC reports and financial models...",
      "🧠 Constructing competitor SWOT matrix model..."
    ];

    logSteps.forEach((stepText, index) => {
      setTimeout(() => {
        setResearchLogs(prev => [...prev, stepText]);
      }, (index + 1) * 350);
    });

    setTimeout(() => {
      setResearchLoading(false);
      setResearchOutput(`📝 MOCK RESEARCH DOSSIER: ${researchTopic.toUpperCase()}

Executive Summary:
------------------
${researchTopic} shows a highly competitive footprint. However, core bottlenecks in their product layout center around weak support systems and high manual latency in their CRM sync workflows. Integrating DevAIO yields an immediate strategic advantage.

📊 SWOT Matrix Analysis:
------------------------
• STRENGTHS: Strong brand equity, robust database infrastructure, massive existing audience.
• WEAKNESSES: Extremely slow customer ticket turnaround times (avg. 14 hours), complex pricing model, lacks automated workflow builders.
• OPPORTUNITIES: Integrate DevAIO Support and Sales agents to capture lost leads and resolve FAQs instantly 24/7.
• THREATS: Agile competitors implementing deep AI automation are starting to reduce operational costs, creating price pressure.

💡 Recommended Strategic Actions:
--------------------------------
1. Deploy DevAIO Sales Agent on product pages to qualify prospects instantly and direct high-value targets to sales representatives.
2. Automate Zendesk & Slack sync to eliminate manual copy-pasting of customer tickets.`);
    }, 2200);
  };

  // Scheduling mock date options
  const mockDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      fullStr: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

  const mockSlots = ['09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM'];

  // Handle meeting booking
  const handleBookMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate === null || !selectedSlot || !bookingName || !bookingEmail) return;

    const chosenDate = mockDates[selectedDate];
    const newMeeting = {
      date: chosenDate.dateNum,
      slot: selectedSlot,
      name: bookingName
    };

    setBookedMeetings(prev => [...prev, newMeeting]);
    setBookingSuccess(true);
    
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedDate(null);
      setSelectedSlot(null);
      setBookingName('');
      setBookingEmail('');
    }, 3000);
  };

  // Generate dynamic SVG path based on growth scenario & months
  const renderSVGChart = () => {
    let scale = 1.0;
    if (growthScenario === 'conservative') scale = 0.5;
    if (growthScenario === 'aggressive') scale = 1.6;

    // Standard 6 points representing 6 periods
    const points = [
      { x: 30, y: 150 },
      { x: 120, y: 130 },
      { x: 210, y: 140 - (10 * scale) },
      { x: 300, y: 120 - (25 * scale) },
      { x: 390, y: 100 - (45 * scale) },
      { x: 480, y: 80 - (65 * scale) }
    ];

    // Build SVG Path
    return points.reduce((path, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
    }, '');
  };

  // Generate forecasting numbers based on controls
  const calculateForecastValue = () => {
    const base = 284500;
    let rate = 0.12; // Moderate growth rate per month
    if (growthScenario === 'conservative') rate = 0.04;
    if (growthScenario === 'aggressive') rate = 0.28;

    const projected = base * Math.pow(1 + rate, forecastMonths / 2);
    return Math.round(projected).toLocaleString();
  };

  return (
    <main className="relative min-h-screen bg-[#050816] text-slate-200 overflow-x-hidden pb-16">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)',
            top: '-10%',
            left: '20%',
            animation: 'orb 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)',
            bottom: '10%',
            right: '10%',
            animation: 'orb 25s ease-in-out infinite reverse',
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-10 border-b border-white/5 bg-[#050816]/75 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Platform</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-lg text-white">
              Dev<span className="gradient-text">AIO</span>
            </span>
          </div>

          <div className="text-xs text-slate-500 font-mono hidden sm:block">
            WORKSPACE ID: DEV_{agentId.toUpperCase()}_v3.0
          </div>
        </div>
      </header>

      {/* Workspace Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mt-8">
        
        {/* Agent Profile Banner */}
        <div className="glass-card rounded-3xl p-6 md:p-8 mb-8 border border-white/5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 via-transparent to-purple-950/20 pointer-events-none" />
          
          <div className="flex items-start md:items-center gap-5 relative z-10">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg shadow-black/40`}>
              <AgentIcon className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-heading font-bold text-2xl md:text-3xl text-white">{agent.name}</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              </div>
              <p className="text-indigo-400 text-sm font-semibold tracking-wide mt-0.5">{agent.role}</p>
              <p className="text-slate-400 text-sm mt-2 max-w-2xl">{agent.desc}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button className="btn-secondary text-sm px-5 py-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configure
            </button>
            <button className="btn-primary text-sm px-6 py-3 flex items-center gap-2 glow-purple">
              <CheckCircle2 className="w-4 h-4" />
              Deploy Node
            </button>
          </div>
        </div>

        {/* Workspace Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column (60% width) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            
            {/* Overview Section */}
            <section className="glass-card rounded-2xl p-6 border border-white/5">
              <h2 className="text-white font-heading font-bold text-lg mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-400" />
                Performance Overview
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {agent.metrics.map((metric, i) => (
                  <div key={i} className="glass rounded-xl p-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-colors" />
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{metric.label}</p>
                    <p className="text-2xl font-bold font-heading gradient-text mt-2 mb-1">{metric.val}</p>
                    <p className="text-slate-400 text-[10px] leading-tight">{metric.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Test Agent (Playground Simulator) */}
            <section className="glass-card rounded-2xl p-6 border border-white/5">
              <h2 className="text-white font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                Playground: Test AI Agent
              </h2>
              
              {/* RENDER DYNAMIC TEST INTERFACES BASED ON AGENT ID */}

              {/* SALES OR SUPPORT AGENT (CHAT INTERFACES) */}
              {(agentId === 'sales' || agentId === 'support') && (
                <div className="space-y-4">
                  <p className="text-slate-400 text-sm">Send a prompt below to interact with the model node in real-time. Test how the agent qualifies leads or replies to support requests.</p>
                  
                  {/* Chat Box */}
                  <div className="glass rounded-2xl border border-white/5 h-[360px] flex flex-col justify-between overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-white/5 bg-white/[0.01] flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono text-slate-400">node_agent_instance_#1</span>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto font-sans scrollbar-thin">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                            msg.sender === 'user' 
                              ? 'bg-indigo-600 text-white rounded-br-none' 
                              : 'glass text-slate-300 rounded-bl-none border border-white/5'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      {typing && (
                        <div className="flex justify-start">
                          <div className="glass rounded-2xl px-4 py-2.5 text-sm rounded-bl-none border border-white/5 flex items-center gap-1.5">
                            <span className="text-slate-400 text-xs">AI is typing</span>
                            <span className="flex gap-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" />
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.2s]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.4s]" />
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div ref={chatBottomRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="p-3 border-t border-white/5 bg-white/[0.01] flex gap-2">
                      <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask the agent a question..."
                        className="flex-1 glass rounded-xl px-4 py-2 text-sm text-white placeholder:text-slate-600 outline-none border border-transparent focus:border-indigo-500/50 transition-colors"
                      />
                      <button 
                        onClick={handleSendMessage}
                        className="btn-primary p-2 text-white rounded-xl shadow-lg flex items-center justify-center shrink-0 w-10 h-10 glow-indigo"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quick replies */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-slate-500 text-xs self-center">Try Prompts:</span>
                    {agentId === 'sales' ? (
                      <>
                        <button onClick={() => sendQuickReply("What are your plans and pricing?")} className="glass hover:bg-white/5 border border-white/5 rounded-full px-3 py-1 text-xs text-slate-400 hover:text-slate-200 transition-colors">"What are your plans and pricing?"</button>
                        <button onClick={() => sendQuickReply("How do you integrate with HubSpot?")} className="glass hover:bg-white/5 border border-white/5 rounded-full px-3 py-1 text-xs text-slate-400 hover:text-slate-200 transition-colors">"How do you integrate with HubSpot?"</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => sendQuickReply("How do I connect WhatsApp support?")} className="glass hover:bg-white/5 border border-white/5 rounded-full px-3 py-1 text-xs text-slate-400 hover:text-slate-200 transition-colors">"How do I connect WhatsApp support?"</button>
                        <button onClick={() => sendQuickReply("What is your refund policy?")} className="glass hover:bg-white/5 border border-white/5 rounded-full px-3 py-1 text-xs text-slate-400 hover:text-slate-200 transition-colors">"What is your refund policy?"</button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* MARKETING AGENT (CAMPAIGN GENERATION PLAYGROUND) */}
              {agentId === 'marketing' && (
                <div className="space-y-5">
                  <p className="text-slate-400 text-sm">Provide your product details and target goal. The AI agent will auto-generate an instant, high-converting campaign blueprint complete with Facebook Ads, Twitter copy, and email drafts.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Campaign Focus</label>
                      <select 
                        value={marketingGoal}
                        onChange={(e) => setMarketingGoal(e.target.value)}
                        className="w-full mt-1.5 glass rounded-xl px-3 py-2 text-sm text-slate-200 outline-none border border-white/5 focus:border-purple-500/50 transition-colors bg-[#080b1e]"
                      >
                        <option value="lead-gen">Lead Generation</option>
                        <option value="sales">Sales & Revenue</option>
                        <option value="awareness">Brand Engagement</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Your Product or Service</label>
                      <div className="flex gap-2 mt-1.5">
                        <input
                          type="text"
                          value={marketingTopic}
                          onChange={(e) => setMarketingTopic(e.target.value)}
                          placeholder="e.g. Eco-friendly sneakers, B2B SaaS software..."
                          className="flex-1 glass rounded-xl px-4 py-2 text-sm text-white placeholder:text-slate-600 outline-none border border-white/5 focus:border-purple-500/50 transition-colors"
                        />
                        <button 
                          onClick={handleGenerateCampaign}
                          disabled={marketingLoading || !marketingTopic}
                          className="btn-primary text-sm px-5 py-2 flex items-center gap-2 font-medium glow-purple disabled:opacity-50"
                        >
                          {marketingLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Output Container */}
                  {campaignOutput && (
                    <div className="glass rounded-2xl border border-purple-500/20 bg-purple-950/5 p-5 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto border-t-2 border-t-purple-500">
                      {campaignOutput}
                    </div>
                  )}

                  {!campaignOutput && !marketingLoading && (
                    <div className="glass rounded-2xl border border-white/5 p-8 text-center text-slate-500 text-sm italic">
                      Input your product name and click "Generate" to preview ad campaign outputs...
                    </div>
                  )}

                  {marketingLoading && (
                    <div className="glass rounded-2xl border border-white/5 p-12 text-center text-slate-400 text-sm flex flex-col items-center justify-center gap-3">
                      <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                      <span>Writing ad copy and compiling social media campaign grids...</span>
                    </div>
                  )}
                </div>
              )}

              {/* RESEARCH AGENT (COMPETITOR DOSSIER GENERATION) */}
              {agentId === 'research' && (
                <div className="space-y-5">
                  <p className="text-slate-400 text-sm">Enter the competitor brand or target sector. The agent will run mock internet search crawls, ingest financial signals, and structure a custom SWOT matrix report.</p>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={researchTopic}
                      onChange={(e) => setResearchTopic(e.target.value)}
                      placeholder="Enter competitor name (e.g. Salesforce, Zapier, MedPlus)..."
                      className="flex-1 glass rounded-xl px-4 py-2 text-sm text-white placeholder:text-slate-600 outline-none border border-white/5 focus:border-amber-500/50 transition-colors"
                    />
                    <button 
                      onClick={handleGenerateResearch}
                      disabled={researchLoading || !researchTopic}
                      className="btn-primary text-sm px-6 py-2 flex items-center gap-2 font-medium glow-orange disabled:opacity-50"
                    >
                      {researchLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      Research
                    </button>
                  </div>

                  {/* Logs */}
                  {researchLogs.length > 0 && (
                    <div className="glass rounded-xl p-3 border border-white/5 space-y-1.5 font-mono text-[10px] text-slate-500">
                      {researchLogs.map((log, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500/80" />
                          <span>{log}</span>
                        </div>
                      ))}
                      {researchLoading && (
                        <div className="flex items-center gap-2 text-slate-400 font-semibold animate-pulse">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Compiling market strategy blueprint...</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Dossier Output */}
                  {researchOutput && (
                    <div className="glass rounded-2xl border border-amber-500/20 bg-amber-950/5 p-5 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto border-t-2 border-t-amber-500">
                      {researchOutput}
                    </div>
                  )}

                  {!researchOutput && !researchLoading && (
                    <div className="glass rounded-2xl border border-white/5 p-8 text-center text-slate-500 text-sm italic">
                      Provide a target company or sector to compile an actionable strategic report...
                    </div>
                  )}
                </div>
              )}

              {/* SCHEDULING AGENT (VISUAL MEETING BOOKER) */}
              {agentId === 'scheduling' && (
                <div className="space-y-6">
                  <p className="text-slate-400 text-sm">Select an upcoming date and time slot from the agent booking console, type your information, and test the meeting scheduling automation.</p>
                  
                  {!bookingSuccess ? (
                    <form onSubmit={handleBookMeeting} className="space-y-4">
                      {/* Date Select Grid */}
                      <div>
                        <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">1. Select Date</label>
                        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                          {mockDates.map((item, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setSelectedDate(i)}
                              className={`rounded-xl p-2.5 border text-center transition-all ${
                                selectedDate === i 
                                  ? 'bg-teal-500/20 border-teal-500 text-white shadow-lg' 
                                  : 'glass border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                              }`}
                            >
                              <span className="block text-[10px] uppercase font-medium">{item.dayName}</span>
                              <span className="block text-lg font-bold font-heading mt-0.5">{item.dateNum}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Slot Select */}
                      {selectedDate !== null && (
                        <div className="animate-fadeIn">
                          <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">2. Select Time Slot ({mockDates[selectedDate].fullStr})</label>
                          <div className="flex flex-wrap gap-2">
                            {mockSlots.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={`rounded-lg px-4 py-2 border text-xs transition-all ${
                                  selectedSlot === slot 
                                    ? 'bg-teal-500/20 border-teal-500 text-white shadow-lg' 
                                    : 'glass border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* User Info Form */}
                      {selectedDate !== null && selectedSlot && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 animate-fadeIn">
                          <div>
                            <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-1.5">Your Full Name</label>
                            <input
                              type="text"
                              required
                              value={bookingName}
                              onChange={(e) => setBookingName(e.target.value)}
                              placeholder="John Doe"
                              className="w-full glass rounded-xl px-3.5 py-2 text-sm text-white placeholder:text-slate-600 outline-none border border-white/5 focus:border-teal-500/50 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-1.5">Your Email</label>
                            <div className="flex gap-2">
                              <input
                                type="email"
                                required
                                value={bookingEmail}
                                onChange={(e) => setBookingEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="flex-1 glass rounded-xl px-3.5 py-2 text-sm text-white placeholder:text-slate-600 outline-none border border-white/5 focus:border-teal-500/50 transition-colors"
                              />
                              <button 
                                type="submit"
                                className="btn-primary text-sm px-6 py-2.5 font-medium glow-teal"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </form>
                  ) : (
                    <div className="glass rounded-2xl border border-teal-500/20 bg-teal-950/10 p-8 text-center flex flex-col items-center justify-center gap-3 animate-pulse">
                      <CheckCircle2 className="w-12 h-12 text-teal-400" />
                      <h3 className="font-heading font-bold text-white text-lg">Meeting Scheduled!</h3>
                      <p className="text-slate-400 text-sm">Meeting booked for {mockDates[selectedDate || 0].fullStr} at {selectedSlot}. Calendar sync triggers and Google Meet links generated!</p>
                    </div>
                  )}

                  {/* Booked Meetings log */}
                  {bookedMeetings.length > 0 && (
                    <div className="pt-2 border-t border-white/5">
                      <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2.5">📅 Node Booking Log</label>
                      <div className="space-y-2">
                        {bookedMeetings.map((meet, idx) => (
                          <div key={idx} className="glass rounded-xl p-3 border border-white/5 flex items-center justify-between text-xs text-slate-400">
                            <span className="font-medium text-slate-300">Demo Call with {meet.name}</span>
                            <span className="font-mono text-teal-400 bg-teal-500/5 px-2 py-0.5 rounded-md">Date: {meet.date} | Slot: {meet.slot}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ANALYTICS AGENT (DYNAMIC KPI CHARTS & GROWTH FORECASTER) */}
              {agentId === 'analytics' && (
                <div className="space-y-6">
                  <p className="text-slate-400 text-sm">Adjust growth models and forecast timelines. The AI Analytics agent maps predictive points and renders automated business forecasts instantly.</p>
                  
                  {/* Dynamic SVG Chart */}
                  <div className="glass rounded-2xl p-4 border border-white/5 relative overflow-hidden bg-indigo-950/5">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Revenue Growth Analytics Projection</p>
                    <svg viewBox="0 0 500 200" className="w-full h-44 overflow-visible">
                      {/* Grid Lines */}
                      <line x1="30" y1="50" x2="480" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="30" y1="100" x2="480" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="30" y1="150" x2="480" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                      {/* X & Y Axis */}
                      <line x1="30" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                      <line x1="30" y1="20" x2="30" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

                      {/* Line Path */}
                      <path
                        d={renderSVGChart()}
                        fill="none"
                        stroke="rgb(99, 102, 241)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-out"
                      />

                      {/* Data dots */}
                      {[
                        { x: 30, y: 150 },
                        { x: 120, y: 130 },
                        { x: 210, y: 140 - (10 * (growthScenario === 'conservative' ? 0.5 : growthScenario === 'aggressive' ? 1.6 : 1.0)) },
                        { x: 300, y: 120 - (25 * (growthScenario === 'conservative' ? 0.5 : growthScenario === 'aggressive' ? 1.6 : 1.0)) },
                        { x: 390, y: 100 - (45 * (growthScenario === 'conservative' ? 0.5 : growthScenario === 'aggressive' ? 1.6 : 1.0)) },
                        { x: 480, y: 80 - (65 * (growthScenario === 'conservative' ? 0.5 : growthScenario === 'aggressive' ? 1.6 : 1.0)) }
                      ].map((pt, idx) => (
                        <circle
                          key={idx}
                          cx={pt.x}
                          cy={pt.y}
                          r="5.5"
                          className="fill-indigo-500 stroke-[#050816] stroke-2 transition-all duration-700 ease-out hover:scale-125 cursor-pointer"
                        />
                      ))}

                      {/* Chart Labels */}
                      <text x="30" y="195" fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle">Current</text>
                      <text x="120" y="195" fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle">+2 Mo</text>
                      <text x="210" y="195" fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle">+4 Mo</text>
                      <text x="300" y="195" fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle">+6 Mo</text>
                      <text x="390" y="195" fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle">+8 Mo</text>
                      <text x="480" y="195" fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle">+10 Mo</text>
                    </svg>
                  </div>

                  {/* Growth controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Forecast Timeline</label>
                        <span className="text-xs text-indigo-400 font-bold font-mono">{forecastMonths} Months</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="12"
                        step="2"
                        value={forecastMonths}
                        onChange={(e) => setForecastMonths(parseInt(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-2">Market Expansion Rate</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['conservative', 'moderate', 'aggressive'] as const).map((sc) => (
                          <button
                            key={sc}
                            onClick={() => setGrowthScenario(sc)}
                            className={`rounded-xl py-2 px-1 text-[10px] uppercase font-bold border transition-colors ${
                              growthScenario === sc 
                                ? 'bg-indigo-500/20 border-indigo-500 text-white shadow-lg' 
                                : 'glass border-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            {sc}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Output Card */}
                  <div className="glass rounded-xl p-4 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Projected Sourced Revenue</p>
                      <p className="font-heading font-extrabold text-2xl text-white mt-1">${calculateForecastValue()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-green-400 uppercase font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {growthScenario === 'conservative' ? '+8%' : growthScenario === 'aggressive' ? '+56%' : '+24%'} growth pace
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">Timeline accuracy 94.2%</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Checklist Features Section */}
            <section className="glass-card rounded-2xl p-6 border border-white/5">
              <h2 className="text-white font-heading font-bold text-lg mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Sourced Core Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agent.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-slate-300 text-sm font-medium leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar Column (40% width) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8">
            
            {/* Integrations Section */}
            <section className="glass-card rounded-2xl p-6 border border-white/5">
              <h2 className="text-white font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                Integration Connectors
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">Click on any integration connector below to dynamically toggle sync status.</p>
              
              <div className="space-y-3">
                {agent.integrations.map((item) => {
                  const isConnected = !!connectedIntegrations[item.name];
                  return (
                    <button
                      key={item.name}
                      onClick={() => toggleIntegration(item.name)}
                      className={`w-full text-left glass rounded-2xl p-4 border transition-all duration-300 flex items-center justify-between group ${
                        isConnected 
                          ? 'border-emerald-500/30 bg-emerald-950/5 shadow-lg shadow-emerald-950/10' 
                          : 'border-white/5 hover:border-white/10 hover:bg-white/[0.01]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-11 h-11 rounded-xl bg-[#080b1e] border border-white/5 text-xl flex items-center justify-center transition-transform group-hover:scale-105 ${isConnected ? 'shadow-inner' : ''}`}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{item.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{item.type}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md transition-colors ${
                          isConnected 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-white/5 text-slate-500 border border-white/5'
                        }`}>
                          {isConnected ? 'Connected' : 'Sync'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Deploy Settings */}
            <section className="glass-card rounded-2xl p-6 border border-white/5">
              <h2 className="text-white font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-400" />
                Active Deploy Channels
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">Activate nodes on these front-facing pipelines. Enable to listen to client queries.</p>
              
              <div className="space-y-3">
                {agent.deployOptions.map((opt) => {
                  const isActive = !!activeDeployOptions[opt.label];
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => toggleDeploy(opt.label)}
                      className={`w-full text-left glass rounded-xl p-3.5 border transition-colors flex items-center justify-between group ${
                        isActive 
                          ? 'border-indigo-500/30 bg-indigo-950/5' 
                          : 'border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg glass border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-white ${isActive ? 'text-indigo-400 border-indigo-500/20' : ''}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-xs">{opt.label}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</p>
                        </div>
                      </div>

                      <div className="relative shrink-0 flex items-center">
                        <div className={`w-9 h-5 rounded-full transition-colors relative ${isActive ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                          <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-transform ${isActive ? 'right-[3px] translate-x-0' : 'left-[3px]'}`} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

          </div>

        </div>

      </div>
    </main>
  );
}
