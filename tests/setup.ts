import '@testing-library/jest-dom';

// jsdom 不执行媒体查询；Ant Design 的响应式组件需要订阅接口。
Object.defineProperty(window, 'matchMedia', {
  configurable: true,
  writable: true,
  value: jest.fn((query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(() => false),
  })),
});

afterEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
});
