import { logoutAccount } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useSwitchAccountButton() {
  const [isSwitching, setIsSwitching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const updateAuth = useAuthStore((state) => state.updateAuth);
  const router = useRouter();

  useEffect(() => {
    if (!errorMessage) return;
    const timeout = setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

  const handleSwitchAccount = async () => {
    setIsSwitching(true);
    setErrorMessage(null);
    try {
      await logoutAccount();
      updateAuth(null, null);
      router.push('/login');
    } catch {
      setErrorMessage('Switching failed. Please try again.');
    } finally {
      setIsSwitching(false);
    }
  };

  return { isSwitching, errorMessage, handleSwitchAccount };
}
