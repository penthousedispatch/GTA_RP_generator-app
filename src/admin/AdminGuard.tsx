import type { PropsWithChildren, ReactNode } from 'react';

const ADMIN_FLAG_STORAGE_KEY = 'gta_rp_admin_enabled';

export function isAdminEnabled(): boolean {
  try {
    return window.localStorage.getItem(ADMIN_FLAG_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminEnabled(enabled: boolean): void {
  window.localStorage.setItem(ADMIN_FLAG_STORAGE_KEY, String(enabled));
}

type AdminGuardProps = PropsWithChildren<{
  fallback?: ReactNode;
}>;

export function AdminGuard({ children, fallback = null }: AdminGuardProps) {
  if (!isAdminEnabled()) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
