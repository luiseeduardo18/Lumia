
export enum UserPlan {
  FREE = 'FREE',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM'
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
  credits: number;
  isAuthenticated: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastUpdate: number;
}

export enum AppView {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  ANALYSIS = 'ANALYSIS',
  KNOWLEDGE = 'KNOWLEDGE',
  BLUEPRINT = 'BLUEPRINT',
  SEARCH = 'SEARCH',
  CHAT = 'CHAT',
  PEOPLE_SEARCH = 'PEOPLE_SEARCH',
  PRICING = 'PRICING'
}
