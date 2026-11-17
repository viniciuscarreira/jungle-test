import { createContext, useContext, useState, type ReactNode } from 'react';

type User = { name: string; email: string };
type StoredAccount = User & { salt: string; passwordHash: string };
type AuthContextValue = {
  user: User | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};
const ACCOUNTS_KEY = 'kurio-demo-accounts-v1';
const SESSION_KEY = 'kurio-demo-session-v1';
const AuthContext = createContext<AuthContextValue | null>(null);

function readAccounts(): StoredAccount[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed as StoredAccount[] : [];
  } catch { return []; }
}
function readSession(): User | null {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    if (parsed && typeof parsed === 'object' && 'email' in parsed && 'name' in parsed &&
      typeof parsed.email === 'string' && typeof parsed.name === 'string') return parsed as User;
  } catch { /* invalid stored session */ }
  return null;
}
async function hashPassword(password: string, salt: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
}
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readSession);
  function setSession(next: User | null) {
    if (next) localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    else localStorage.removeItem(SESSION_KEY);
    setUser(next);
  }
  async function register(name: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    if (cleanName.length < 2) throw new Error('Informe um nome com pelo menos 2 caracteres.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) throw new Error('Informe um e-mail válido.');
    if (password.length < 8) throw new Error('A senha deve ter pelo menos 8 caracteres.');
    const accounts = readAccounts();
    if (accounts.some(a => a.email === normalizedEmail)) throw new Error('Este e-mail já está cadastrado.');
    const salt = crypto.randomUUID();
    const passwordHash = await hashPassword(password, salt);
    accounts.push({ name: cleanName, email: normalizedEmail, salt, passwordHash });
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    setSession({ name: cleanName, email: normalizedEmail });
  }
  async function login(email: string, password: string) {
    const account = readAccounts().find(a => a.email === email.trim().toLowerCase());
    if (!account || (await hashPassword(password, account.salt)) !== account.passwordHash)
      throw new Error('E-mail ou senha incorretos.');
    setSession({ name: account.name, email: account.email });
  }
  async function changePassword(currentPassword: string, newPassword: string) {
    if (!user) throw new Error('Entre na sua conta para alterar a senha.');
    if (newPassword.length < 8) throw new Error('A nova senha deve ter pelo menos 8 caracteres.');
    if (currentPassword === newPassword) throw new Error('A nova senha deve ser diferente da atual.');
    const accounts = readAccounts();
    const account = accounts.find(a => a.email === user.email);
    if (!account || await hashPassword(currentPassword, account.salt) !== account.passwordHash)
      throw new Error('Senha atual incorreta.');
    const salt = crypto.randomUUID();
    account.salt = salt;
    account.passwordHash = await hashPassword(newPassword, salt);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }
  return <AuthContext.Provider value={{ user, register, login, changePassword, logout: () => setSession(null) }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve estar dentro de AuthProvider');
  return context;
}
