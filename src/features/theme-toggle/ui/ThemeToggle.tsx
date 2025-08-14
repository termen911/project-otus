import { useTheme } from '@/app/providers/theme/useTheme';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      size="large"
      type="text"
      onClick={toggleTheme}
      icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
    />
  );
};
