import { logoutAccount } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';

export default function useLogoutButton() {
  const updateAuth = useAuthStore((state) => state.updateAuth);
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAccount();
    updateAuth(null, null);
    router.push('/');
  };

  return { handleLogout };
}
