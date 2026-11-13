'use client';

import type { ChangeEvent, SubmitEvent } from 'react';
import { useState } from 'react';
import { validateForm } from '@/utils/validate-form';
import { registerSchema } from '../../../shared/schemas/register.schema.ts';
import { API_URL } from '@/config/env.ts';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      name,
      username,
      email,
      password,
    };
    const validationResult = validateForm({
      data: userData,
      schema: registerSchema,
    });
    if (!validationResult.success) return;
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(validationResult.data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      console.log('Registration successful!', result);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </li>
        <li>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </li>
        <li>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </li>
        <li>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </li>
      </ul>

      <button type="submit">Create Account</button>
    </form>
  );
}
