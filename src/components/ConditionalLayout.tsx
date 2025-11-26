import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AdminSupplierHeader } from './AdminSupplierHeader';

type ConditionalLayoutProps = {
  children: React.ReactNode;
};

export const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  
  const isAdminOrSupplier = user?.role === 'admin' || user?.role === 'supplier';

  return (
    <div className="flex flex-col min-h-screen">
      {isAdminOrSupplier ? <AdminSupplierHeader /> : <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isAdminOrSupplier && <Footer />}
    </div>
  );
};
