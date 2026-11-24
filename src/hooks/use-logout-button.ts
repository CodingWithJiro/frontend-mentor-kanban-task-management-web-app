import { logoutAccount } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function useLogoutButton() {
  const updateAuth = useAuthStore((state) => state.updateAuth);
  const router = useRouter();
  const confirmDialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenConfirmModal = () => {
    if (confirmDialogRef.current?.open) return;
    confirmDialogRef.current?.showModal();
  };
  const handleCloseConfirmModal = () => {
    confirmDialogRef.current?.close();
  };
  const handleLogout = async () => {
    await logoutAccount();
    updateAuth(null, null);
    router.push('/');
  };

  return {
    handleLogout,
    confirmDialogRef,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
  };
}
