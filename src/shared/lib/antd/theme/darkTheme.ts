import { theme, type ThemeConfig } from 'antd';

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#74d414',
    colorInfo: '#74d414',
    colorBgContainer: '#141414',
    colorText: '#ffffff',
    colorTextSecondary: '#a6a6a6',
    colorBgLayout: '#000000',
  },
  components: {
    Layout: {
      headerBg: '#141414',
      headerColor: '#ffffff',
    },
  },
  algorithm: theme.darkAlgorithm,
};
