import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => { await page.goto('/'); });
test('exibe catálogo e abre NFT específico', async ({ page }) => {
  await expect(page.getByText('Emerald Ape #042').first()).toBeVisible();
  await page.getByText('Emerald Ape #042').first().click();
  await expect(page).toHaveURL(/\/nft\/1/);
  await expect(page.getByRole('heading', { name: 'Emerald Ape #042' })).toBeVisible();
});
test('filtros e pesquisa atualizam catálogo', async ({ page }) => {
  await page.getByRole('button', { name: 'Pesquisar', exact: true }).click();
  await page.getByRole('textbox', { name: 'Pesquisar NFTs' }).fill('Emerald Ape');
  await expect(page.getByText('Emerald Ape #042').first()).toBeVisible();
  await expect(page.getByText('Golden Beat #207')).toHaveCount(0);
});
test('carrinho vazio impede finalizar', async ({ page }) => {
  await page.evaluate(() => { localStorage.setItem('kurio-cart', '[]'); });
  await page.goto('/carrinho');
  await expect(page.getByText('Seu carrinho está vazio.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Conectar e finalizar' })).toBeDisabled();
});
test('detalhes adiciona ao carrinho', async ({ page }) => {
  await page.goto('/nft/1');
  await page.getByRole('button', { name: 'COMPRAR' }).click();
  await expect(page).toHaveURL(/\/carrinho/);
  await expect(page.getByText('Emerald Ape #042').first()).toBeVisible();
});
test('cadastro, sessão e logout demonstrativos', async ({ page }) => {
  await page.getByRole('button', { name: /Entrar/ }).first().click();
  await page.getByRole('button', { name: 'Criar conta' }).first().click();
  await page.getByRole('textbox', { name: 'Nome de usuário' }).fill('Teste Kurio');
  await page.getByRole('textbox', { name: 'E-mail', exact: true }).fill(`teste${Date.now()}@example.com`);
  await page.getByLabel('Senha', { exact: true }).fill('senha12345');
  await page.getByLabel('Confirmar senha').fill('senha12345');
  await page.getByRole('button', { name: 'Criar conta' }).last().click();
  await expect(page.getByRole('button', { name: /Teste Kurio/ })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: /Teste Kurio/ })).toBeVisible();
  await page.getByRole('button', { name: 'Sair' }).click();
  await expect(page.getByRole('button', { name: /Entrar/ }).first()).toBeVisible();
});


test('visitante não pode acessar pagamento diretamente', async ({ page }) => {
  await page.goto('/pagamento');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('checkout solicita login e preserva carrinho', async ({ page }) => {
  await page.goto('/nft/1');
  await page.getByRole('button', { name: 'COMPRAR' }).click();
  await expect(page).toHaveURL(/\/carrinho/);
  await page.getByRole('button', { name: 'Conectar e finalizar' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Criar conta' }).first().click();
  await page.getByRole('textbox', { name: 'Nome de usuário' }).fill('Comprador Teste');
  await page.getByRole('textbox', { name: 'E-mail', exact: true }).fill(`checkout${Date.now()}@example.com`);
  await page.getByLabel('Senha', { exact: true }).fill('senha12345');
  await page.getByLabel('Confirmar senha').fill('senha12345');
  await page.getByRole('button', { name: 'Criar conta' }).last().click();
  await expect(page).toHaveURL(/\/carrinho/);
  await expect(page.getByText('Emerald Ape #042').first()).toBeVisible();
  await page.getByRole('button', { name: 'Conectar e finalizar' }).click();
  await expect(page).toHaveURL(/\/pagamento/);
});

test('visitante não pode visualizar confirmação de pedido', async ({ page }) => {
  await page.goto('/confirmacao');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('dialog')).toBeVisible();
});
