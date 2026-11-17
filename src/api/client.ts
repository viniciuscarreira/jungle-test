import axios from 'axios';
import type { NFT } from '../data/nfts';
export const api = axios.create({ baseURL: '/api', timeout: 8000 });
export type CatalogFilters = { search?: string; category?: string; network?: string; maxPrice?: number; sort?: string };
export async function fetchCatalog(filters: CatalogFilters): Promise<NFT[]> {
  const response = await api.get<{ items: NFT[] }>('/nfts', { params: filters });
  return response.data.items;
}
export async function fetchNFT(id: string): Promise<NFT> {
  const response = await api.get<NFT>(`/nfts/${encodeURIComponent(id)}`);
  return response.data;
}
