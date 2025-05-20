import { ReactNode } from 'react';
import { ToastContainer } from '../components/commons/Toastr/Toastr';
import PortalProvider from './PortalContext';

export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <PortalProvider>
      {children}
      <ToastContainer />
    </PortalProvider>
  );
}
