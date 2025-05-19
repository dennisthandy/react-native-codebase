import { ReactNode } from 'react';
import PortalProvider from './PortalContext';

export default function ContextProvider({ children }: { children: ReactNode }) {
  return <PortalProvider>{children}</PortalProvider>;
}
