'use client';

import Link from 'next/link';
import { useWatch } from 'react-hook-form';

export default function ForgetPasswordLink() {
  const email = useWatch({ name: 'email' });
  console.log(email);

  const params = new URLSearchParams();

  if (email) {
    params.append('email', email);
  }

  return (
    <Link
      href={`/forget-password?${params.toString()}`}
      className="text-small text-primary-400 hover:text-primary-500 hover:underline"
    >
      Forgot password?
    </Link>
  );
}
