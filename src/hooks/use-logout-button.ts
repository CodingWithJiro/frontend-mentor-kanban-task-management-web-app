import { logoutAccount } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function useLogoutButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const updateAuth = useAuthStore((state) => state.updateAuth);
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    const dialog = confirmDialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleOpenConfirmModal = () => {
    setIsOpen(true);
  };
  const handleCloseConfirmModal = () => {
    setIsOpen(false);
  };
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAccount();
    updateAuth(null, null);
    setIsOpen(false);
    router.push('/');
  };

  return {
    handleLogout,
    confirmDialogRef,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
    isLoggingOut,
  };
}
