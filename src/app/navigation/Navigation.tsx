import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { useAppTranslation } from '../providers/i18n/useAppTranslation';
import { ErrorBoundary } from './error-boundary/ErrorBoundary';
import { Loader } from './loader/Loader';
import { ProtectedRoute } from './protected-route/ProtectedRoute';

const LazyComponent = ({
  component: Component,
  fallback,
}: {
  component: React.ComponentType;
  fallback: React.ReactNode;
}) => (
  <ErrorBoundary>
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

const NotFoundPage = lazy(() =>
  import('@/pages/errors/not-found').then((module) => ({ default: module.NotFoundPage }))
);

const SignInPage = lazy(() =>
  import('@/pages/auth/signin').then((module) => ({ default: module.SignInPage }))
);

const SignupPage = lazy(() =>
  import('@/pages/auth/signup').then((module) => ({ default: module.SignupPage }))
);

const ProfilePage = lazy(() =>
  import('@/pages/profile').then((module) => ({ default: module.ProfilePage }))
);

const OperationsPage = lazy(() =>
  import('@/pages/operations').then((module) => ({ default: module.OperationsPage }))
);

export const Navigation = () => {
  const { t } = useAppTranslation('app.navigation');
  return (
    <Routes>
      <Route
        path="/auth/signin"
        element={
          <LazyComponent
            component={SignInPage}
            fallback={<Loader tip={t('loading')} fullScreen={false} />}
          />
        }
      />
      <Route
        path="/auth/signup"
        element={
          <LazyComponent
            component={SignupPage}
            fallback={<Loader tip={t('loading')} fullScreen={false} />}
          />
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <LazyComponent
              component={ProfilePage}
              fallback={<Loader tip={t('loading')} fullScreen={false} />}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <LazyComponent
            component={OperationsPage}
            fallback={<Loader tip={t('loading')} fullScreen={false} />}
          />
        }
      />
      <Route
        path="*"
        element={
          <LazyComponent
            component={NotFoundPage}
            fallback={<Loader tip={t('loading')} fullScreen={false} />}
          />
        }
      />
    </Routes>
  );
};
