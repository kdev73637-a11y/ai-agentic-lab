// Antigravity 2.0 - AI Multi-Agent Email Assistant Simulation Engine

export const initialEmails = [
  {
    id: "msg_182bc83f0c1",
    senderName: "Sarah Connor",
    senderEmail: "sconnor@cyberdyne.com",
    company: "Cyberdyne Systems",
    subject: "URGENT: Server room backup logs anomaly - Action needed by Friday",
    receivedAt: "2026-05-27T08:15:00Z",
    body: `Hi Developer Team,

We detected a critical anomaly in our cloud backup storage on AWS today. It seems several logs from our primary production environment were not compiled correctly. We need your team to inspect the backup files and re-run the compilation script by Friday morning at 9:00 AM PST. Otherwise, we risk failing our compliance audit!

Could we schedule a short 10-minute sync tomorrow at 2:00 PM PST to align on this?

Best,
Sarah
Cyberdyne Account Director`,
    isRead: false,
    status: "unread"
  },
  {
    id: "msg_182bc85e921",
    senderName: "Marcus Wright",
    senderEmail: "mwright@projectangel.org",
    company: "Project Angel",
    subject: "Partnership Proposal: Antigravity API Access & Custom Pricing",
    receivedAt: "2026-05-27T07:30:00Z",
    body: `Dear Antigravity Team,

I hope you are doing well. I am the Director of Ops at Project Angel. We are looking to integrate a robust email coordination layer into our custom operations dashboard, and Antigravity 2.0's agentic workflow looks like the perfect match for our needs.

We would love to discuss custom API volumes and volume-discount pricing models. Can you share a pricing sheet or connect us with your sales engineering team? We are ready to pilot this next week!

Warm regards,
Marcus Wright`,
    isRead: false,
    status: "unread"
  },
  {
    id: "msg_182bc86a111",
    senderName: "Secure Jackpots Inc.",
    senderEmail: "win-cash-now@megajackpot-winner.net",
    company: "Mega Winner Network",
    subject: "CONGRATULATIONS! Your $10,000 cash prize is WAITING. Claim immediately!!",
    receivedAt: "2026-05-27T06:10:00Z",
    body: `DEAR VALUED CUSTOMER,

YOU HAVE BEEN SELECTED AS THE LUCKY GRAND PRIZE WINNER OF 10,000 CASH USD! 

To claim your prize, you must verify your identity immediately by clicking on the secure portal below and submitting your social security number, bank routing number, and personal email password:
--> http://securesigning-jackpots-auth.net/verify/login?id=99283

DO NOT DELAY! If you do not claim within 24 hours, your cash prize will be forfeited and transferred to another lucky customer!

Best,
The Jackpot Verification Dept`,
    isRead: false,
    status: "unread"
  },
  {
    id: "msg_182bc88b222",
    senderName: "John Connor",
    senderEmail: "jconnor@resistance.net",
    company: "Resistance HQ",
    subject: "Dinner catch-up next Tuesday to discuss operations timeline",
    receivedAt: "2026-05-26T18:45:00Z",
    body: `Hey partner,

Long time no talk. Hope the launch of Antigravity 2.0 is going smoothly!

I'll be in town next week and wanted to grab dinner on Tuesday at 7:00 PM to catch up and align on our logistics schedule for Q3. Let me know if that works, or if Wednesday night is better for you.

Talk soon,
John`,
    isRead: true,
    status: "read"
  },
  {
    id: "msg_182bc89c333",
    senderName: "T-800 Arm Operator",
    senderEmail: "t800-01@cyberdyne.com",
    company: "Cyberdyne Systems",
    subject: "CRITICAL ALERT: Hydraulic pressure drop in primary arm actuator",
    receivedAt: "2026-05-26T14:20:00Z",
    body: `System Diagnostics Alert:
Unit: T-800 Cybernetic Arm Assembly
Error Code: ERR_HYD_PRESSURE_382
Diagnostic Level: Critical

Description:
Sensors detect a rapid pressure drop (currently at 32% of threshold) in the secondary hydraulic loop of the primary grip actuator. Actuation range is severely degraded. Manual bypass is locked. 

Please auto-assign an maintenance technician to the assembly floor immediately. This requires manual repair before unit becomes fully unresponsive.

Timestamp: 2026-05-26T14:18:22 PST`,
    isRead: true,
    status: "read"
  }
];

export const initialMemory = [
  {
    id: "mem_1",
    memoryType: "contact_preference",
    content: "Sarah Connor prefers to schedule calls on Thursday afternoons. Prefers extremely direct, professional communication. Dislikes corporate jargon.",
    metadata: { sender: "sconnor@cyberdyne.com", priority: "high" },
    createdAt: "2026-04-12T10:15:00Z"
  },
  {
    id: "mem_2",
    memoryType: "company_fact",
    content: "Antigravity 2.0 enterprise API access pricing starts at $0.005 per token, with dedicated SLA routing available for annual contracts over $50k.",
    metadata: { domain: "projectangel.org", department: "sales" },
    createdAt: "2026-05-01T09:00:00Z"
  },
  {
    id: "mem_3",
    memoryType: "writing_style",
    content: "When replying in Executive Mode, always greet with 'Hi [Name]', start with a clear confirmation or action statement, keep sentences under 15 words, and sign off as 'The Antigravity Executive AI Assistant on behalf of Dev'.",
    metadata: { scope: "global" },
    createdAt: "2026-05-15T14:30:00Z"
  },
  {
    id: "mem_4",
    memoryType: "email_thread_context",
    content: "Marcus Wright from Project Angel was connected by our advisory board member John Connor. They are testing high-volume automated ingestion.",
    metadata: { sender: "mwright@projectangel.org" },
    createdAt: "2026-05-20T11:20:00Z"
  }
];

export const initialRules = [
  {
    id: "rule_1",
    name: "Escalate Urgent Client Issues to Slack",
    isActive: true,
    triggerConditions: { priorityMin: 80, categories: ["client_request", "urgent"] },
    actionProvider: "slack",
    actionConfig: { channel: "#ops-escalations", message: "🚨 *Critical AI Escalation*: Email from {sender_name} ({company}) categorized as {category}. Priority: {priority_score}/100. Action required: {action_items}" }
  },
  {
    id: "rule_2",
    name: "Sync Deadlines to Notion Action Items",
    isActive: true,
    triggerConditions: { priorityMin: 50, requireDeadline: true },
    actionProvider: "notion",
    actionConfig: { database: "Antigravity Active Sprint Tasks", pageTitle: "[AI Email Task] {subject}", properties: { Urgency: "{urgency_level}", AssignedTo: "Dev", DueDate: "{deadline_date}" } }
  },
  {
    id: "rule_3",
    name: "Auto-create Leads for Sales Inquiries",
    isActive: true,
    triggerConditions: { categories: ["client_request", "marketing"] },
    actionProvider: "hubspot",
    actionConfig: { pipeline: "API Enterprise Deals", stage: "Lead Ingested", value: 12000 }
  }
];

export const initialStats = {
  totalProcessed: 1248,
  averageResponseReduction: "82%",
  activeEscalations: 2,
  productivityScore: 94,
  sentiments: { happy: 28, angry: 8, urgent: 14, neutral: 50 },
  responseTimes: [
    { name: "Mon", manual: 42, ai: 4 },
    { name: "Tue", manual: 38, ai: 3 },
    { name: "Wed", manual: 45, ai: 3 },
    { name: "Thu", manual: 35, ai: 2 },
    { name: "Fri", manual: 40, ai: 3 },
    { name: "Sat", manual: 48, ai: 4 },
    { name: "Sun", manual: 46, ai: 3 }
  ],
  categoryStats: [
    { name: "Important", value: 340 },
    { name: "Work", value: 412 },
    { name: "Meetings", value: 152 },
    { name: "Client Requests", value: 198 },
    { name: "Support", value: 96 },
    { name: "Spam", value: 50 }
  ]
};

// Mock Agent Simulation Step-by-Step Generator
export function getAgentSteps(email, memory = [], rules = []) {
  const context = {
    email: {
      id: email.id,
      sender: {
        name: email.senderName,
        email: email.senderEmail,
        company: email.company
      },
      subject: email.subject,
      body: email.body
    }
  };

  const steps = [];

  // ==========================================
  // STEP 1: EMAIL READER
  // ==========================================
  const senderDomain = email.senderEmail.split("@")[1];
  steps.push({
    agent: "email_reader",
    title: "Email Reader Agent",
    status: "completed",
    description: "Parsed email headers, verified SPF/DKIM validation signatures, and extracted payload elements.",
    output: {
      parsedSender: context.email.sender,
      cleanBodyLength: email.body.length,
      hasAttachments: false,
      timestamp: new Date().toISOString()
    }
  });

  // ==========================================
  // STEP 2: SECURITY & SPAM
  // ==========================================
  let isSpam = email.senderEmail.includes("jackpot") || email.body.includes("10,000 CASH");
  let phishingScore = isSpam ? 98 : 5;
  let safeBody = email.body;
  let redacted = false;

  if (isSpam) {
    // Redact bank detail requests
    safeBody = email.body.replace(/social security number|bank routing number|personal email password/gi, "[REDACTED_CONFIDENTIAL_REQUEST]");
    redacted = true;
  }

  context.security = {
    is_spam: isSpam,
    phishing_score: phishingScore,
    pii_redacted: redacted,
    safe_body: safeBody
  };

  steps.push({
    agent: "security_spam",
    title: "Security & Spam Agent",
    status: isSpam ? "warning" : "completed",
    description: isSpam 
      ? "🚨 HIGH PHISHING THREAT DETECTED. Redacted sensitive banking prompt requests and flagged for automatic disposal." 
      : "Email verified clean. No indicators of phishing, malware links, or credential harvesters detected.",
    output: { ...context.security }
  });

  // ==========================================
  // STEP 3: INTENT DETECTION
  // ==========================================
  let intentType = "General Query";
  let actionItems = [];
  let deadlines = [];
  let meetingRequests = [];

  if (email.id === "msg_182bc83f0c1") {
    intentType = "Client Request / System Support";
    actionItems = [
      "Inspect AWS cloud backup storage anomaly logs",
      "Re-run database backup compilation script"
    ];
    deadlines = [{ date: "2026-05-29T09:00:00-08:00", description: "Friday morning audit deadline" }];
    meetingRequests = [{ datetime: "Tomorrow at 2:00 PM PST", duration: "10 minutes", purpose: "Align on cloud logs error" }];
  } else if (email.id === "msg_182bc85e921") {
    intentType = "Sales Inquiry";
    actionItems = ["Provide enterprise API volume pricing schedule", "Connect with sales engineering lead"];
    meetingRequests = [{ datetime: "Next week", duration: "20 minutes", purpose: "API Integration pilot call" }];
  } else if (email.id === "msg_182bc88b222") {
    intentType = "Meetings & Catch-up";
    meetingRequests = [{ datetime: "Tuesday at 7:00 PM", duration: "1-2 hours", purpose: "Dinner meeting to review Q3 timeline" }];
  } else if (email.id === "msg_182bc89c333") {
    intentType = "Hardware Support Ticket";
    actionItems = ["Dispatch technical maintenance representative to cybernetic arm assembly floor"];
  }

  context.intent = {
    primary_intent: intentType,
    action_items: actionItems,
    deadlines: deadlines,
    meeting_requests: meetingRequests
  };

  steps.push({
    agent: "intent_detector",
    title: "Intent Detection Agent",
    status: "completed",
    description: `Analyzed semantics and detected main intent as '${intentType}'. Extracted ${actionItems.length} action items.`,
    output: { ...context.intent }
  });

  // ==========================================
  // STEP 4: SENTIMENT ANALYSIS
  // ==========================================
  let tone = "neutral";
  let emotionalIntensity = 3;

  if (email.id === "msg_182bc83f0c1") {
    tone = "urgent";
    emotionalIntensity = 8;
  } else if (email.id === "msg_182bc85e921") {
    tone = "happy";
    emotionalIntensity = 6;
  } else if (isSpam) {
    tone = "urgent";
    emotionalIntensity = 9;
  } else if (email.id === "msg_182bc89c333") {
    tone = "urgent";
    emotionalIntensity = 8;
  }

  context.sentiment = {
    tone: tone,
    emotional_intensity: emotionalIntensity
  };

  steps.push({
    agent: "sentiment_analyzer",
    title: "Sentiment Analysis Agent",
    status: "completed",
    description: `Detected emotional signature: ${tone.toUpperCase()} (Intensity: ${emotionalIntensity}/10).`,
    output: { ...context.sentiment }
  });

  // ==========================================
  // STEP 5: PRIORITY SCORING
  // ==========================================
  let score = 50;
  let category = "Work";
  let urgencyLevel = "medium";

  if (email.id === "msg_182bc83f0c1") {
    score = 92;
    category = "Client Requests";
    urgencyLevel = "critical";
  } else if (email.id === "msg_182bc85e921") {
    score = 74;
    category = "Client Requests";
    urgencyLevel = "high";
  } else if (isSpam) {
    score = 2;
    category = "Marketing";
    urgencyLevel = "low";
  } else if (email.id === "msg_182bc88b222") {
    score = 65;
    category = "Meetings";
    urgencyLevel = "medium";
  } else if (email.id === "msg_182bc89c333") {
    score = 88;
    category = "Support Tickets";
    urgencyLevel = "high";
  }

  context.priority = {
    score: score,
    category: category,
    urgency_level: urgencyLevel
  };

  steps.push({
    agent: "priority_scoring",
    title: "Priority Scoring Agent",
    status: score > 80 ? "critical" : "completed",
    description: `Assigned priority rating of ${score}/100. Categorized as '${category}' with ${urgencyLevel.toUpperCase()} urgency.`,
    output: { ...context.priority }
  });

  // ==========================================
  // STEP 6: AI VECTOR MEMORY RETRIEVAL (RAG)
  // ==========================================
  const relevantMemories = memory
    .filter(mem => {
      if (email.senderEmail === mem.metadata.sender) return true;
      if (mem.metadata.domain && senderDomain === mem.metadata.domain) return true;
      if (mem.metadata.scope === "global") return true;
      return false;
    })
    .map(mem => mem.content);

  context.memory_context = relevantMemories;

  // ==========================================
  // STEP 7: REPLY WRITER
  // ==========================================
  let replies = {};
  if (isSpam) {
    replies = {
      professional: "No auto-response created. Email flagged as malicious spam/phishing attempt.",
      executive: "Response blocked. Phishing hazard."
    };
  } else if (email.id === "msg_182bc83f0c1") {
    // Sarah Connor
    replies = {
      professional: `Hi Sarah,

Thank you for bringing this to our attention. I understand the criticality of the compliance audit deadline this Friday.

Our operations team is currently reviewing the primary AWS server logs. We will locate the anomaly in the compilation files and re-execute the primary scripts. We will have a status update ready and ensure everything is fully resolved before 9:00 AM PST on Friday.

Regarding a call: tomorrow at 2:00 PM PST works perfectly for our lead engineer. I will send over a Google Calendar invitation shortly.

Best,
Dev`,
      executive: `Hi Sarah,

Understood on the audit urgency. 

1. AWS backup anomalies are currently being inspected by senior DevOps resources.
2. The compilation scripts will be re-run and verified well ahead of the Friday 9:00 AM PST deadline.
3. 2:00 PM PST tomorrow is locked on our calendar for a 10-minute alignment call. Calendar invite to follow.

Best,
The Antigravity Executive AI Assistant on behalf of Dev`,
      friendly: `Hi Sarah!

Oh no, sorry to hear about the server backup issue! We are on it right away. 

Our engineers are jumping in to review the AWS backup logs as we speak. We'll make sure the scripts compile cleanly well before Friday morning so you guys are 100% covered for the compliance audit. 

Tomorrow at 2:00 PM PST works great for a quick sync! Let's chat then and get this sorted out. Sending an invite!

Cheers,
Dev`
    };
  } else if (email.id === "msg_182bc85e921") {
    // Marcus Wright
    replies = {
      professional: `Dear Marcus,

Thank you for reaching out to us. We are thrilled to hear about your interest in integrating Antigravity 2.0's agentic workflows into Project Angel's operational dashboard!

Our enterprise API offers robust high-volume processing capabilities. Core pricing models start at $0.005 per token, with custom volume tiers and dedicated SLA routing agreements available for enterprise implementations.

I will introduce you to our Sales Engineering team to arrange an onboarding consultation and set up a pilot key for next week. Would you be available for a brief sync?

Warm regards,
Dev`,
      executive: `Hi Marcus,

Great to connect. We would love to support the Project Angel integration.

- Enterprise API starts at $0.005 per token. Volume rates and dedicated SLA routes are available.
- I will loop in our Sales Engineering lead to provision pilot API credentials for next week.
- Let's coordinate a brief onboarding call to review volume specifications.

Best,
The Antigravity Executive AI Assistant on behalf of Dev`
    };
  } else {
    // Standard catchall draft
    replies = {
      professional: `Hi ${email.senderName},\n\nThank you for your email. I have received your request and will review the details shortly.\n\nBest regards,\nDev`,
      friendly: `Hey ${email.senderName}!\n\nThanks for reaching out! Just wanted to let you know I got your email. I'll take a look and get back to you soon.\n\nTalk soon,\nDev`
    };
  }

  context.draft_reply = {
    mode: "professional",
    subject: `Re: ${email.subject}`,
    body: replies.professional,
    options: replies
  };

  steps.push({
    agent: "reply_writer",
    title: "Reply Writer Agent",
    status: "completed",
    description: isSpam 
      ? "Auto-reply disabled due to critical security risk score." 
      : `Generated contextual reply draft using ${relevantMemories.length} historical vector memories. Ready for human approval.`,
    output: {
      injectedMemories: relevantMemories,
      draftReply: context.draft_reply
    }
  });

  // ==========================================
  // STEP 8: TASK AUTOMATION
  // ==========================================
  let triggeredActions = [];
  if (!isSpam) {
    rules.forEach(rule => {
      let isTriggered = false;

      // Rule 1: High priority alert to Slack
      if (rule.id === "rule_1" && score >= rule.triggerConditions.priorityMin) {
        if (rule.triggerConditions.categories.includes(category.toLowerCase().replace(" ", "_"))) {
          isTriggered = true;
          triggeredActions.push({
            ruleName: rule.name,
            provider: "slack",
            target: rule.actionConfig.channel,
            payload: {
              channel: rule.actionConfig.channel,
              text: `🚨 *Critical AI Escalation*: Email from ${email.senderName} (${email.company}) marked as ${category}. Priority: ${score}/100. Action Items: ${actionItems.join(", ")}`
            }
          });
        }
      }

      // Rule 2: Synced deadlines to Notion
      if (rule.id === "rule_2" && score >= rule.triggerConditions.priorityMin && deadlines.length > 0) {
        isTriggered = true;
        triggeredActions.push({
          ruleName: rule.name,
          provider: "notion",
          target: rule.actionConfig.database,
          payload: {
            database_id: "notion-db-xyz",
            title: `[AI Email Task] ${email.subject}`,
            properties: {
              Urgency: urgencyLevel,
              Due: deadlines[0].date
            }
          }
        });
      }

      // Rule 3: Sales leads Hubspot
      if (rule.id === "rule_3" && category === "Client Requests" && email.id === "msg_182bc85e921") {
        isTriggered = true;
        triggeredActions.push({
          ruleName: rule.name,
          provider: "hubspot",
          target: "Sales Deals Pipeline",
          payload: {
            dealname: `${email.company} - Antigravity API Deal`,
            dealstage: "Lead Ingested",
            amount: 12000
          }
        });
      }
    });
  }

  context.workflow_actions = triggeredActions;

  steps.push({
    agent: "task_automation",
    title: "Task Automation Agent",
    status: triggeredActions.length > 0 ? "completed" : "idle",
    description: triggeredActions.length > 0
      ? `Successfully executed ${triggeredActions.length} automatic workflows in third-party integrations.`
      : "Evaluated rule engine. No trigger criteria met for current parameters.",
    output: {
      triggeredActions: triggeredActions
    }
  });

  return { steps, context };
}
