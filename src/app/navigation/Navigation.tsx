import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { ErrorBoundary } from './error-boundary/ErrorBoundary';
import { Loader } from './loader/Loader';
import { ProtectedRoute } from './protected-route/ProtectedRoute';

const LazyComponent = ({ component: Component }: { component: React.ComponentType }) => (
  <ErrorBoundary>
    <Suspense fallback={<Loader tip="Загружаем страницу..." fullScreen={false} />}>
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

const ProfilePage = lazy(() => import('@/pages/profile').then((module) => ({ default: module.ProfilePage })));

const HomePage = lazy(() => import('@/pages/home').then((module) => ({ default: module.HomePage })));

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/auth/signin" element={<LazyComponent component={SignInPage} />} />
      <Route path="/auth/signup" element={<LazyComponent component={SignupPage} />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <LazyComponent component={ProfilePage} />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<LazyComponent component={HomePage} />} />
      <Route path="*" element={<LazyComponent component={NotFoundPage} />} />
    </Routes>
  );
};
