'use client';

import { useAuth } from '@/hooks/use-auth';

interface AuthSensitiveContentProps {
  children: React.ReactNode;
}

export function AuthSensitiveContent({ children }: AuthSensitiveContentProps) {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return null;
  }

  return <>{children}</>;
}
