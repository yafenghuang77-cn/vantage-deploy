import { render, screen } from '@testing-library/react';

import Home from '@/app/page';

test('首页展示欢迎标题和可用的测试按钮', () => {
  render(<Home />);

  expect(screen.getByRole('heading', { level: 1, name: '欢迎' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '测试按钮' })).toBeEnabled();
});
