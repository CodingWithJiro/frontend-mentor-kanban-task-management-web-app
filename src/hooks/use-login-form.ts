import type { FormData } from '@/types/login-form-type';
import type { InputData } from '@/types/login-form-type';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

export default function useLoginForm() {
  const [formData, setFormData] = useState<FormData>({
    identifier: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputData: InputData[] = [
    { name: 'identifier', label: 'Email or username', type: 'text' },
    {
      name: 'password',
      label: 'Password',
      type: `${showPassword ? 'text' : 'password'}`,
    },
  ];

  return { formData, inputData, handleChange };
}
