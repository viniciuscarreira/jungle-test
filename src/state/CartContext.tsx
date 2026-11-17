import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
export type CartItem = { id: number; name: string; token: string; price: number; quantity: number; image: string };
export type Order = { id: string; date: string; items: CartItem[]; subtotal: number; discount: number; networkFee: number; total: number; provider: string; ownerEmail: string };
const starter: CartItem[] = [];
function load<T>(key: string, fallback: T): T { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } }
type CartState = { items: CartItem[]; couponApplied: boolean; subtotal: number; discount: number; networkFee: number; total: number; order: Order | null; addItem: (item: CartItem) => void; updateQuantity: (id: number, amount: number) => void; removeItem: (id: number) => void; applyCoupon: (code: string) => boolean; checkout: (provider: string, ownerEmail: string) => Order | null };
const Context = createContext<CartState | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
 const [items, setItems] = useState<CartItem[]>(() => load('kurio-cart', starter));
 const [couponApplied, setCouponApplied] = useState(() => load('kurio-coupon', false));
 const [order, setOrder] = useState<Order | null>(() => load('kurio-order', null));
 useEffect(() => { localStorage.setItem('kurio-cart', JSON.stringify(items)); }, [items]);
 useEffect(() => { localStorage.setItem('kurio-coupon', JSON.stringify(couponApplied)); }, [couponApplied]);
 useEffect(() => { if(order) localStorage.setItem('kurio-order', JSON.stringify(order)); }, [order]);
 const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
 const discount = couponApplied ? subtotal * .1 : 0;
 const networkFee = items.length ? .016 : 0;
 const total = subtotal - discount + networkFee;
 const value = useMemo<CartState>(() => ({ items, couponApplied, subtotal, discount, networkFee, total, order,
  addItem(item) { setItems(old => { const found = old.find(i => i.id === item.id); return found ? old.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i) : [...old, item]; }); },
  updateQuantity(id, amount) { setItems(old => old.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + amount) } : i)); },
  removeItem(id) { setItems(old => old.filter(i => i.id !== id)); },
  applyCoupon(code) { const valid = code.trim().toUpperCase() === 'KURIO10'; setCouponApplied(valid); return valid; },
  checkout(provider, ownerEmail) { if (!items.length || !ownerEmail) return null; const next: Order = { id: `SIM-${Date.now()}`, date: new Date().toISOString(), items: items.map(i => ({...i})), subtotal, discount, networkFee, total, provider, ownerEmail }; setOrder(next); setItems([]); setCouponApplied(false); return next; },
 }), [items, couponApplied, subtotal, discount, networkFee, total, order]);
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useCart() { const context = useContext(Context); if (!context) throw new Error('CartProvider ausente'); return context; }
