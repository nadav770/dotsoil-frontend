import React, { Suspense } from 'react';
import AppRoutes from './routes';

export default function App() {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>טוען…</div>}>
      <AppRoutes />
    </Suspense>
  );
}