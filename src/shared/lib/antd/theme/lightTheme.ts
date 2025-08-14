import { theme, type ThemeConfig } from 'antd';

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#74d414',
    colorInfo: '#74d414',
    colorBgContainer: '#ffffff',
    colorText: '#000000',
    colorTextSecondary: '#666666',
    colorBgLayout: '#f5f5f5',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerColor: '#000000',
    },
  },
  algorithm: theme.defaultAlgorithm,
};
