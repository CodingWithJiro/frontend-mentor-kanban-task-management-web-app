import SignUpForm from '@/components/auth/sign-up-form';
import type { Metadata } from 'next';

const siteUrl = 'https://kanbanweb.vercel.app/sign-up';

export const metadata: Metadata = {
  title: 'Sign Up | Kanban',
  description:
    'Create your Kanban account to organize your work, manage tasks, and track your progress.',
  keywords: [
    'Kanban Sign Up',
    'Create Account',
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

export default function SignUp() {
  return (
    <main>
      <SignUpForm />
    </main>
  );
}
