import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

type FavoritesValue = { favorites: number[]; isFavorite: (id: number) => boolean; toggleFavorite: (id: number) => boolean };
const FavoritesContext = createContext<FavoritesValue | null>(null);
const keyFor = (email: string) => `kurio-demo-favorites-v1:${email.toLowerCase()}`;
function readFavorites(email: string): number[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(keyFor(email)) || '[]');
    return Array.isArray(value) ? value.filter((id): id is number => typeof id === 'number' && Number.isInteger(id)) : [];
  } catch { return []; }
}
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [stored, setStored] = useState<{ email: string; ids: number[] } | null>(null);
  const email = user?.email ?? '';
  const favorites = useMemo(() => email ? (stored?.email === email ? stored.ids : readFavorites(email)) : [], [email, stored]);
  function toggleFavorite(id: number): boolean {
    if (!email) return false;
    const next = favorites.includes(id) ? favorites.filter(value => value !== id) : [...favorites, id];
    localStorage.setItem(keyFor(email), JSON.stringify(next));
    setStored({ email, ids: next });
    return true;
  }
  return <FavoritesContext.Provider value={{ favorites, isFavorite: id => favorites.includes(id), toggleFavorite }}>{children}</FavoritesContext.Provider>;
}
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites deve estar dentro de FavoritesProvider');
  return context;
}
