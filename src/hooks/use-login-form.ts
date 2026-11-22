import type { FormData } from '@/types/login-form-type';
import type { InputData } from '@/types/login-form-type';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

export default function useLoginForm() {
  const [formData, setFormData] = useState<FormData>({
    identifier: '',
    password: '',
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
  };
}
