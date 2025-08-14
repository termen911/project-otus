import { BaseLayout } from '@/widgets/base-layout';
import { BrowserRouter } from 'react-router';
import { Navigation } from './navigation/Navigation';
import { AppInitializer } from './providers/AppInitializer';
import { I18nProvider } from './providers/i18n/I18nProvider';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { ThemeProvider } from './providers/theme/ThemeProvider';
import './styles/global.scss';

export const App = () => {
  return (
    <I18nProvider>
      <BrowserRouter basename={process.env.NODE_ENV === 'development' ? '/' : '/project-otus/'}>
        <ReactQueryProvider>
          <AppInitializer>
            <ThemeProvider>
              <BaseLayout>
                <Navigation />
              </BaseLayout>
            </ThemeProvider>
          </AppInitializer>
        </ReactQueryProvider>
      </BrowserRouter>
    </I18nProvider>
  );
};
