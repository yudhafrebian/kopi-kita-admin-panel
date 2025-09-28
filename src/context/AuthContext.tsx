// src/context/AuthContext.tsx
import { keepLogin } from '@/utils/apiHelper';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Admin = {
  name: string;
  email: string;
};

type AuthContextType = { 
  admin: Admin | null; 
  setAdmin: (a: Admin | null) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await keepLogin();
        if (response?.data?.data) {
          setAdmin({
            name: response.data.data.name,
            email: response.data.data.email,
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // selesai cek
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
