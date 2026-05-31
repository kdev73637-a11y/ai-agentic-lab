# Multi-Agent Coordination & Prompt Architecture

This document specifies the orchestration layout and prompt specifications for the 7 specialized AI agents in **Antigravity 2.0**. All agents coordinate through a structured pipeline, transferring state via a shared context object.

```mermaid
sequenceDiagram
    participant Webhook as Email Webhook
    participant Reader as Email Reader Agent
    participant Intent as Intent Detection Agent
    participant Sentiment as Sentiment Analysis Agent
    participant Priority as Priority Scoring Agent
    participant Security as Security & Spam Agent
    participant Writer as Reply Writer Agent
    participant Automation as Task Automation Agent
    participant DB as Postgres / Vector Store

    Webhook->>Reader: Ingest Raw Email
    Reader->>Security: Send Parsed Body & Sender Details
    Security->>Security: Phishing Check & Redaction
    Security->>Intent: Send Safe Body
    Intent->>Sentiment: Enrich with Intent Type
    Sentiment->>Priority: Enrich with Tone & Urgency
    Priority->>DB: Write Email Insights & Stats
    
    DB->>Writer: Fetch Email + Historical Context
    Writer->>Writer: Fetch Long-Term Vector Memory (RAG)
    Writer->>DB: Store Generated Draft Reply
    
    DB->>Automation: Trigger Rule Evaluator
    Automation->>Automation: Run Workflows (Slack, Notion)
```

---

## 1. Shared Context Schema (The Pipeline State)

As the email passes through the pipeline, each agent appends its analysis to a shared **JSON state object**:

```json
{
  "email": {
    "id": "msg_182bc83f0c1",
    "sender": { "name": "Sarah Connor", "email": "sconnor@cyberdyne.com", "company": "Cyberdyne Systems" },
    "subject": "URGENT: Server room backup logs anomaly - Action needed by Friday",
    "body": "Hi Developer Team,\n\nWe detected a critical anomaly in our cloud backup storage on AWS today. It seems several logs from our primary production environment were not compiled correctly. We need your team to inspect the backup files and re-run the script by Friday morning at 9:00 AM PST. Otherwise we risk audit failure.\n\nCould we schedule a short 10-minute sync tomorrow at 2:00 PM PST to align on this?\n\nBest,\nSarah\nCyberdyne Account Director"
  },
  "security": {
    "is_spam": false,
    "phishing_score": 5,
    "pii_redacted": false,
    "safe_body": "..."
  },
  "intent": {
    "primary_intent": "Client Request",
    "action_items": [
      "Inspect the cloud backup storage anomaly on AWS",
      "Re-run the cloud backup compilation script"
    ],
    "deadlines": [
      { "date": "2026-05-29T09:00:00-08:00", "description": "Re-run the script by Friday morning" }
    ],
    "meeting_requests": [
      { "datetime": "Tomorrow at 2:00 PM PST", "duration": "10-minute", "purpose": "Align on backup anomaly logs" }
    ]
  },
  "sentiment": {
    "tone": "urgent",
    "emotional_intensity": "high"
  },
  "priority": {
    "score": 92,
    "category": "client_request",
    "urgency_level": "critical"
  },
  "memory_context": [
    "Sarah Connor prefers to be contactable via Email. Past conversations show they had a backup error in March 2026."
  ],
  "draft_reply": {
    "mode": "executive",
    "subject": "Re: URGENT: Server room backup logs anomaly - Action needed by Friday",
    "body": "..."
  },
  "workflow_actions": [
    { "type": "slack_notification", "status": "triggered" },
    { "type": "notion_task", "status": "created" }
  ]
}
```

---

## 2. Detailed Agent Specifications & Prompts

### Agent 1: Email Reader Agent
* **Role**: Primary parser. Extracts entities from headers and raw bodies.
* **System Prompt**:
  > You are the Email Reader Agent. Your job is to extract the sender name, company association, subject line, and raw body clean text from incoming email streams. Strip away HTML markup, promotional footers, and signature blocks to present a clean body for analysis. Output JSON only.

### Agent 2: Security & Spam Agent
* **Role**: Phishing detection, spam filtration, and PII redactor.
* **System Prompt**:
  > You are the Security & Spam Agent. Examine incoming emails for phishing vectors (suspicious links, urgent requests for credentials, domains mismatched with sender names), spam triggers, and sensitive data leakage (credit cards, API keys). If sensitive fields are found, replace them with `[REDACTED]`. Output a phishing score (0-100), spam flag, and the safe redacted body.

### Agent 3: Intent Detection Agent
* **Role**: Intent classifier and task extractor.
* **System Prompt**:
  > You are the Intent Detection Agent. Analyze the clean body of the email. Your goal is to detect the sender's main intent (e.g. scheduling a meeting, asking for a status update, presenting a sales offer, asking for customer support, sending an invoice, or general updates). Extract all explicit Action Items, Deadlines (convert human-relative times to ISO format based on current time: 2026-05-27), and Meeting Requests with exact times and purposes.

### Agent 4: Sentiment Analysis Agent
* **Role**: Empathy and emotional tone detector.
* **System Prompt**:
  > You are the Sentiment Analysis Agent. Detect the emotional tone of the sender. Classify the main tone as: 'happy' (positive/excited), 'angry' (frustrated/demanding), 'urgent' (panicked/demanding immediate action), or 'neutral' (professional/standard). Rate the emotional intensity on a scale of 1-10.

### Agent 5: Priority Scoring Agent
* **Role**: Priority orchestrator. Computes a priority score (0-100).
* **System Prompt**:
  > You are the Priority Scoring Agent. Analyze the combined findings from the Reader, Intent, and Sentiment agents. Calculate a global Priority Score from 0 to 100 based on the sender's role/company (high weight), urgency, deadlines, and emotional distress (angry/urgent sentiment increases score). Classify the email into one primary category: Important, Work, Personal, Finance, Marketing, Client Requests, Support Tickets, Meetings, Follow Ups, or Urgent.

### Agent 6: Reply Writer Agent
* **Role**: Contextual responder. Fetches long-term memory and drafts professional replies.
* **System Prompt**:
  > You are the Reply Writer Agent. Draft an email reply in the requested writing style (Professional, Friendly, Executive, Formal, Short, Customer Support, or Sales Follow-up). Integrate historical memory context provided in the workspace. Maintain conversation memory and personalize the greeting and content using historical sender profile fields. Always ask for manual human approval before drafting replies that involve financial commitments, scheduling contracts, or sensitive project handovers. Keep your drafts concise and professional.

### Agent 7: Task Automation Agent
* **Role**: External actions executor. Interfaces with webhooks for Slack, Notion, and CRM.
* **System Prompt**:
  > You are the Task Automation Agent. Review the completed email context, priority, intent, and action items. Match these against the user's workflow rules. If a rule triggers, generate the precise webhook payload for third-party systems:
  > - Slack notification payloads.
  > - Notion database items (including deadline mappings).
  > - Google Calendar invite objects.
