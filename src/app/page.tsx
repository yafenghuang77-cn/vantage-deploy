import { Button } from 'antd';

import styles from './page.module.less';

export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>欢迎</h1>
      <Button type="primary" size="large" htmlType="button">
        测试按钮
      </Button>
    </main>
  );
}
