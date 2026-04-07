'use client';

import { SignedIn, SignedOut, SignUpButton, UserButton } from '@clerk/nextjs';
import { UserIcon } from '@heroicons/react/24/solid';

export default function AuthNav() {
  return (
    <div className="ml-6 pl-6 border-l border-gray-300">
      <SignedIn>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <SignUpButton mode="modal">
          <div className="login flex items-center gap-2 hover:underline cursor-pointer">
            <UserIcon className="h-6 w-6 text-blue-500" />
            <p>Sign Up</p>
          </div>
        </SignUpButton>
      </SignedOut>
    </div>
  );
}
