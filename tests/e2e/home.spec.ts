import { expect, test } from '@playwright/test';

test('首页可访问，刷新后仍显示欢迎内容', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('欢迎');
  await expect(page.getByRole('heading', { level: 1, name: '欢迎' })).toBeVisible();
  await expect(page.getByRole('button', { name: '测试按钮' })).toBeEnabled();

  await page.reload();

  await expect(page.getByRole('heading', { level: 1, name: '欢迎' })).toBeVisible();
  await expect(page.getByRole('button', { name: '测试按钮' })).toBeVisible();
  expect(await page.pageErrors()).toEqual([]);
});
