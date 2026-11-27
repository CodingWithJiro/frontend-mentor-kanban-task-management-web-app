import type { Metadata } from 'next';
import LoginForm from '@/components/auth/login-form';

const siteUrl = 'https://kanbanweb.vercel.app/login';

export const metadata: Metadata = {
  title: 'Login | Kanban',
  description:
    'Login to your Kanban account to organize your work, manage tasks, and track your progress.',
  keywords: [
    'Kanban Login',
    'Login Account',
    'Task Management',
    'Project Management',
  ],
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <LoginForm />
    </main>
  );
}
