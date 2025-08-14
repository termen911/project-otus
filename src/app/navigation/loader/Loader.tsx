import React from 'react';
import { Spin, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface LoaderProps {
  tip?: string; // Текст под спиннером
  size?: 'small' | 'default' | 'large';
  fullScreen?: boolean; // Показывать ли на весь экран
  center?: boolean; // Центрировать ли содержимое
}

export const Loader: React.FC<LoaderProps> = ({
  tip = 'Загрузка...',
  size = 'default',
  fullScreen = false,
  center = true,
}) => {
  const loader = (
    <Space direction="vertical" align="center" style={{ display: 'flex' }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size={size} />
      <Text type="secondary">{tip}</Text>
    </Space>
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        {loader}
      </div>
    );
  }

  return center ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        padding: '20px',
      }}
    >
      {loader}
    </div>
  ) : (
    loader
  );
};
