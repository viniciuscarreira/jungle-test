import { http, HttpResponse, delay } from 'msw';
import { nfts, getNFT } from '../data/nfts';
const demoUsers = new Map<string, { name: string; email: string }>();
const demoOrders: Array<{ id: string; email: string; items: unknown[]; status: string }> = [];
export const handlers = [
  http.get('/api/health', () => HttpResponse.json({ status: 'ok', service: 'kurio-msw' })),
  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json() as { name?: string; email?: string };
    if (!body.email || !body.name) return HttpResponse.json({ message: 'Nome e e-mail obrigatórios' }, { status: 400 });
    const user = { name: body.name, email: body.email.toLowerCase() };
    demoUsers.set(user.email, user);
    return HttpResponse.json({ user, token: 'demo-token-not-for-production' }, { status: 201 });
  }),
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as { email?: string };
    const user = demoUsers.get((body.email || '').toLowerCase());
    if (!user) return HttpResponse.json({ message: 'Usuário de demonstração não encontrado' }, { status: 401 });
    return HttpResponse.json({ user, token: 'demo-token-not-for-production' });
  }),
  http.post('/api/orders', async ({ request }) => {
    const body = await request.json() as { email?: string; items?: unknown[] };
    if (!body.email || !Array.isArray(body.items) || !body.items.length) return HttpResponse.json({ message: 'Pedido inválido' }, { status: 400 });
    const order = { id: `demo-${Date.now()}`, email: body.email, items: body.items, status: 'simulated' };
    demoOrders.push(order);
    return HttpResponse.json(order, { status: 201 });
  }),
  http.get('/api/orders', ({ request }) => {
    const email = new URL(request.url).searchParams.get('email');
    return HttpResponse.json({ items: demoOrders.filter(order => order.email === email) });
  }),
  http.get('/api/nfts', async ({ request }) => {
    await delay(180);
    const params = new URL(request.url).searchParams;
    if (params.get('simulateError') === 'true') return HttpResponse.json({ message: 'Serviço temporariamente indisponível' }, { status: 503 });
    const search = (params.get('search') ?? '').toLocaleLowerCase('pt-BR');
    const category = params.get('category');
    const network = params.get('network');
    const maxPrice = Number(params.get('maxPrice') ?? 12.3);
    const sort = params.get('sort');
    const items = nfts.filter(nft =>
      (!search || `${nft.name} ${nft.creator}`.toLocaleLowerCase('pt-BR').includes(search)) &&
      (!category || nft.category === category) &&
      (!network || nft.network === network) &&
      Number(nft.price) <= maxPrice
    );
    if (sort === 'new') items.sort((a,b) => b.created-a.created);
    if (sort === 'popular') items.sort((a,b) => b.popularity-a.popularity);
    return HttpResponse.json({ items, total: items.length });
  }),
  http.get('/api/nfts/:id', async ({ params }) => {
    await delay(100);
    const nft = getNFT(String(params.id));
    return nft ? HttpResponse.json(nft) : HttpResponse.json({ message: 'NFT não encontrado' }, { status: 404 });
  }),
  http.post('/api/orders/preview', async ({ request }) => {
    await delay(200);
    const body = await request.json() as { items?: unknown[] };
    if (!Array.isArray(body.items) || body.items.length === 0) return HttpResponse.json({ message: 'Carrinho vazio' }, { status: 400 });
    return HttpResponse.json({ status: 'simulated', message: 'Prévia demonstrativa criada' });
  }),
];
