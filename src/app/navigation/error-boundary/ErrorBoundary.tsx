import i18n from '@/app/config/i18n';
import { ReloadOutlined } from '@ant-design/icons';
import { Alert, Button, Result } from 'antd';
import type { TFunction } from 'i18next';
import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private t: TFunction;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.t = i18n.t;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary поймал ошибку:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '40px auto' }}>
          <Result
            status="500"
            title={this.t('errorBoundary.title')}
            subTitle={this.t('errorBoundary.subTitle')}
            extra={
              <Button type="primary" icon={<ReloadOutlined />} onClick={this.handleReset}>
                {this.t('errorBoundary.extra')}
              </Button>
            }
          />

          {process.env.NODE_ENV === 'development' && (
            <Alert
              type="error"
              message={this.t('errorBoundary.alert.message')}
              description={
                <div>
                  <p>
                    <strong>{this.state.error?.toString()}</strong>
                  </p>
                  <details style={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.errorInfo?.componentStack}
                  </details>
                </div>
              }
              showIcon
            />
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
