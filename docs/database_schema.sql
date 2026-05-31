-- Antigravity 2.0 - AI Email Assistant Agent System Schema
-- Target Database: PostgreSQL 15+ with pgvector extension

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector"; -- Vector DB support for Agent Memory

-- =========================================================================
-- 1. ORGANIZATIONS & USERS
-- =========================================================================

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('superadmin', 'admin', 'user', 'read-only')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Preferences & AI Writing Style Profile
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    default_reply_mode VARCHAR(50) DEFAULT 'professional' CHECK (default_reply_mode IN ('professional', 'friendly', 'executive', 'formal', 'short', 'support', 'sales')),
    auto_reply_enabled BOOLEAN DEFAULT FALSE,
    require_approval_for_sensitive BOOLEAN DEFAULT TRUE,
    signature TEXT,
    timezone VARCHAR(100) DEFAULT 'UTC',
    security_redaction_enabled BOOLEAN DEFAULT TRUE,
    notification_settings JSONB DEFAULT '{"email": true, "slack": false, "inbox_alerts": true}'::jsonb
);

-- =========================================================================
-- 2. INTEGRATIONS & OAUTH CREDENTIALS
-- =========================================================================

CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL CHECK (provider IN ('gmail', 'outlook', 'slack', 'notion', 'hubspot', 'trello')),
    auth_token TEXT NOT NULL,
    refresh_token TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    connection_status VARCHAR(50) DEFAULT 'active' CHECK (connection_status IN ('active', 'expired', 'revoked')),
    config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, provider)
);

-- =========================================================================
-- 3. EMAILS & THREADS
-- =========================================================================

CREATE TABLE email_threads (
    id VARCHAR(255) PRIMARY KEY, -- Maps to Gmail/Outlook thread ID
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject TEXT,
    is_resolved BOOLEAN DEFAULT FALSE,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE emails (
    id VARCHAR(255) PRIMARY KEY, -- Maps to Gmail/Outlook message ID
    thread_id VARCHAR(255) REFERENCES email_threads(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    sender_email VARCHAR(255) NOT NULL,
    sender_name VARCHAR(255),
    recipient_email VARCHAR(255) NOT NULL,
    subject TEXT,
    body_text TEXT,
    body_html TEXT,
    received_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    inbox_folder VARCHAR(100) DEFAULT 'inbox',
    
    -- AI Classification & Scoring
    priority_score INT CHECK (priority_score BETWEEN 0 AND 100),
    category VARCHAR(50) CHECK (category IN ('important', 'work', 'personal', 'finance', 'marketing', 'client_request', 'support_ticket', 'meetings', 'follow_ups', 'urgent')),
    urgency_level VARCHAR(20) CHECK (urgency_level IN ('low', 'medium', 'high', 'critical')),
    sentiment VARCHAR(20) CHECK (sentiment IN ('happy', 'angry', 'urgent', 'neutral')),
    
    -- AI Generated Insights
    one_liner_summary TEXT,
    bullet_points JSONB DEFAULT '[]'::jsonb,
    action_items JSONB DEFAULT '[]'::jsonb,
    deadlines JSONB DEFAULT '[]'::jsonb, -- Array of date/description objects
    meeting_requests JSONB DEFAULT '[]'::jsonb, -- Array of proposed times/descriptions
    
    -- Security Flags
    phishing_score INT DEFAULT 0 CHECK (phishing_score BETWEEN 0 AND 100),
    is_spam BOOLEAN DEFAULT FALSE,
    redacted_content TEXT, -- Content with PII/sensitive info blacked out
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Email Attachments
CREATE TABLE email_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email_id VARCHAR(255) REFERENCES emails(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    size_bytes INT NOT NULL,
    storage_url TEXT NOT NULL, -- S3 / Cloud Storage URL
    extracted_text TEXT, -- Text extracted via OCR/PDF parsing
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 4. MULTI-AGENT PIPELINE LOGS
-- =========================================================================

CREATE TABLE agent_execution_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email_id VARCHAR(255) REFERENCES emails(id) ON DELETE CASCADE,
    agent_name VARCHAR(100) NOT NULL CHECK (agent_name IN ('email_reader', 'intent_detector', 'priority_scoring', 'sentiment_analyzer', 'security_spam', 'reply_writer', 'task_automation')),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
    input_payload JSONB,
    output_payload JSONB,
    processing_time_ms INT,
    error_message TEXT,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 5. AI DRAFT REPLIES
-- =========================================================================

CREATE TABLE draft_replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email_id VARCHAR(255) REFERENCES emails(id) ON DELETE CASCADE,
    reply_mode VARCHAR(50) NOT NULL,
    subject TEXT NOT NULL,
    body_content TEXT NOT NULL,
    approval_status VARCHAR(50) DEFAULT 'pending_approval' CHECK (approval_status IN ('pending_approval', 'approved', 'edited', 'sent', 'discarded')),
    approved_by UUID REFERENCES users(id),
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 6. AUTOMATION RULES & WORKFLOWS
-- =========================================================================

CREATE TABLE automation_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Filter Criteria
    trigger_conditions JSONB NOT NULL, -- e.g., {"priority_min": 80, "categories": ["client_request", "urgent"]}
    
    -- Integration Action
    action_provider VARCHAR(50) NOT NULL, -- slack, notion, hubspot, webhook
    action_config JSONB NOT NULL, -- e.g., {"channel_id": "C12345", "notion_db_id": "xyz"}
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Automated Workflow Execution History
CREATE TABLE workflow_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rule_id UUID REFERENCES automation_rules(id) ON DELETE CASCADE,
    email_id VARCHAR(255) REFERENCES emails(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'success' CHECK (status IN ('success', 'failed')),
    execution_details JSONB,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 7. LONG-TERM VECTOR MEMORY (RAG)
-- =========================================================================

CREATE TABLE agent_memory_vectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    memory_type VARCHAR(50) NOT NULL CHECK (memory_type IN ('contact_preference', 'company_fact', 'email_thread_context', 'writing_style')),
    content TEXT NOT NULL,
    embedding VECTOR(1536) NOT NULL, -- OpenAI text-embedding-3-small dimension
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create HNSW index for high performance vector cosine distance searches
CREATE INDEX ON agent_memory_vectors USING hnsw (embedding vector_cosine_ops);
