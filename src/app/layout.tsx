import './globals.css';
import './globals.less';

import { Suspense } from 'react';

import { AntdRegistry } from '@ant-design/nextjs-registry';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '欢迎',
  description: '欢迎使用 Vantage Deploy',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <Suspense fallback={null}>
          <AntdRegistry>{children}</AntdRegistry>
        </Suspense>
      </body>
    </html>
  );
}
