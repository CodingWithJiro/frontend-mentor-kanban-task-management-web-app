import type { ChangeEvent, SubmitEvent } from 'react';
import type { FormData, InputData } from '@/types/login-form.type';
import type { AuthResponse } from '@/types/auth.type';
import { validateForm } from '@/utils/validate-form';
import { useState } from 'react';
import { loginSchema } from '../../shared/schemas/login.schema';
import { loginAccount } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';

export default function useLoginForm() {
  const [formData, setFormData] = useState<FormData>({
    identifier: '',
    password: '',
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
  });
  const updateAuth = useAuthStore((state) => state.updateAuth);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      identifier: formData.identifier,
      password: formData.password,
    };
    const validationResult = validateForm({
      data: userData,
      schema: loginSchema,
    });
    if (!validationResult.success) {
      console.log('Login failed. Invalid credentials.');
      return;
    }
    try {
      const result: AuthResponse = await loginAccount(validationResult.data);
      updateAuth(result.accessToken, result.user);
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  const handlePasswordVisibilityToggle = (field: 'password') => {
    setPasswordVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const inputData: InputData[] = [
    { name: 'identifier', label: 'Email or username', type: 'text' },
    {
      name: 'password',
      label: 'Password',
      type: `${passwordVisibility.password ? 'text' : 'password'}`,
    },
  ];

  return {
    formData,
    inputData,
    handleChange,
    passwordVisibility,
    handlePasswordVisibilityToggle,
    handleSubmit,
  };
}
