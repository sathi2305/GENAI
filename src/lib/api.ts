import {
  Project,
  Task,
  DocumentItem,
  ResearchSource,
  MemoryItem,
  Approval,
  NotificationItem,
  Hackathon,
  EmailItem,
  Deployment,
  ActivityLog,
  ChatMessage,
  DashboardStats,
  AgentRun,
  ScheduledTask,
  ScheduledTaskExecution,
} from '../types/index.ts';

const API_BASE = '/api/v1';

export async function fetchStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
}

export async function fetchTasks(projectId?: string): Promise<Task[]> {
  const url = projectId ? `${API_BASE}/tasks?projectId=${encodeURIComponent(projectId)}` : `${API_BASE}/tasks`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(data: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
}

export async function fetchDocuments(projectId?: string): Promise<DocumentItem[]> {
  const url = projectId ? `${API_BASE}/documents?projectId=${encodeURIComponent(projectId)}` : `${API_BASE}/documents`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch documents');
  return res.json();
}

export async function uploadDocument(doc: Partial<DocumentItem>): Promise<DocumentItem> {
  const res = await fetch(`${API_BASE}/documents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doc),
  });
  if (!res.ok) throw new Error('Failed to upload document');
  return res.json();
}

export async function fetchResearch(projectId?: string): Promise<ResearchSource[]> {
  const url = projectId ? `${API_BASE}/research?projectId=${encodeURIComponent(projectId)}` : `${API_BASE}/research`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch research');
  return res.json();
}

export async function addResearchSource(data: Partial<ResearchSource>): Promise<ResearchSource> {
  const res = await fetch(`${API_BASE}/research`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add research source');
  return res.json();
}

export async function fetchMemories(projectId?: string): Promise<MemoryItem[]> {
  const url = projectId ? `${API_BASE}/memories?projectId=${encodeURIComponent(projectId)}` : `${API_BASE}/memories`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch memories');
  return res.json();
}

export async function addMemory(data: Partial<MemoryItem>): Promise<MemoryItem> {
  const res = await fetch(`${API_BASE}/memories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add memory');
  return res.json();
}

export async function fetchApprovals(): Promise<Approval[]> {
  const res = await fetch(`${API_BASE}/approvals`);
  if (!res.ok) throw new Error('Failed to fetch approvals');
  return res.json();
}

export async function approveAction(id: string, notes?: string): Promise<Approval> {
  const res = await fetch(`${API_BASE}/approvals/${id}/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes }),
  });
  if (!res.ok) throw new Error('Failed to approve action');
  return res.json();
}

export async function rejectAction(id: string, notes?: string): Promise<Approval> {
  const res = await fetch(`${API_BASE}/approvals/${id}/reject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes }),
  });
  if (!res.ok) throw new Error('Failed to reject action');
  return res.json();
}

export async function fetchNotifications(): Promise<NotificationItem[]> {
  const res = await fetch(`${API_BASE}/notifications`);
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}

export async function markNotificationRead(id: string): Promise<void> {
  await fetch(`${API_BASE}/notifications/${id}/read`, { method: 'PUT' });
}

export async function markAllNotificationsRead(): Promise<void> {
  await fetch(`${API_BASE}/notifications/read-all`, { method: 'PUT' });
}

export async function fetchHackathons(): Promise<Hackathon[]> {
  const res = await fetch(`${API_BASE}/hackathons`);
  if (!res.ok) throw new Error('Failed to fetch hackathons');
  return res.json();
}

export async function updateHackathon(id: string, data: Partial<Hackathon>): Promise<Hackathon> {
  const res = await fetch(`${API_BASE}/hackathons/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update hackathon');
  return res.json();
}

export async function fetchEmails(): Promise<EmailItem[]> {
  const res = await fetch(`${API_BASE}/emails`);
  if (!res.ok) throw new Error('Failed to fetch emails');
  return res.json();
}

export async function simulateEmail(email: Partial<EmailItem>): Promise<EmailItem> {
  const res = await fetch(`${API_BASE}/emails/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  });
  if (!res.ok) throw new Error('Failed to simulate email');
  return res.json();
}

export async function fetchDeployments(projectId?: string): Promise<Deployment[]> {
  const url = projectId ? `${API_BASE}/deployments?projectId=${encodeURIComponent(projectId)}` : `${API_BASE}/deployments`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch deployments');
  return res.json();
}

export async function triggerDeployment(projectId: string, platform: string, environment: string): Promise<Deployment> {
  const res = await fetch(`${API_BASE}/deployments/trigger`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, platform, environment }),
  });
  if (!res.ok) throw new Error('Failed to trigger deployment');
  return res.json();
}

export async function fetchActivityLogs(): Promise<ActivityLog[]> {
  const res = await fetch(`${API_BASE}/activity`);
  if (!res.ok) throw new Error('Failed to fetch activity logs');
  return res.json();
}

export async function fetchMessages(conversationId: string = 'conv-default'): Promise<ChatMessage[]> {
  const res = await fetch(`${API_BASE}/messages?conversationId=${encodeURIComponent(conversationId)}`);
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
}

export async function sendAgentMessage(
  prompt: string,
  projectId: string = 'proj-1',
  conversationId: string = 'conv-default',
  attachedFiles: string[] = [],
  model?: string
): Promise<{ message: ChatMessage; agentRun: AgentRun }> {
  const res = await fetch(`${API_BASE}/agent/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, projectId, conversationId, attachedFiles, model }),
  });
  if (!res.ok) throw new Error('Agent execution failed');
  return res.json();
}

// Scheduled Tasks API
export async function fetchScheduledTasks(): Promise<ScheduledTask[]> {
  const res = await fetch(`${API_BASE}/schedules`);
  if (!res.ok) throw new Error('Failed to fetch scheduled tasks');
  return res.json();
}

export async function createScheduledTask(data: Partial<ScheduledTask>): Promise<ScheduledTask> {
  const res = await fetch(`${API_BASE}/schedules`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create scheduled task');
  return res.json();
}

export async function updateScheduledTask(id: string, data: Partial<ScheduledTask>): Promise<ScheduledTask> {
  const res = await fetch(`${API_BASE}/schedules/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update scheduled task');
  return res.json();
}

export async function deleteScheduledTask(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/schedules/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete scheduled task');
}

export async function runScheduledTaskNow(id: string): Promise<{ success: boolean; summary: string; execution: ScheduledTaskExecution }> {
  const res = await fetch(`${API_BASE}/schedules/${id}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to trigger scheduled task');
  }
  return res.json();
}

export async function fetchScheduledExecutions(taskId?: string): Promise<ScheduledTaskExecution[]> {
  const url = taskId
    ? `${API_BASE}/schedules/executions?taskId=${encodeURIComponent(taskId)}`
    : `${API_BASE}/schedules/executions`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch execution history');
  return res.json();
}
