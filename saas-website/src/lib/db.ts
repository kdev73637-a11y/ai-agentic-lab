import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  plan: string;
  createdAt: string;
}

// Store users in a local JSON file (acts as a simple database)
const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

function ensureDb(): void {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

export function getAllUsers(): User[] {
  ensureDb();
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw) as User[];
}

export function findUserByEmail(email: string): User | undefined {
  return getAllUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return getAllUsers().find((u) => u.id === id);
}

export function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
  plan?: string;
}): User {
  ensureDb();
  const users = getAllUsers();
  const newUser: User = {
    id: randomUUID(),
    name: data.name,
    email: data.email.toLowerCase(),
    passwordHash: data.passwordHash,
    plan: data.plan || 'free',
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
  return newUser;
}
