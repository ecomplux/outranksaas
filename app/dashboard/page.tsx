"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import DashboardComponent from "@/components/app/dashboard"; // Renamed to avoid conflict
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      // If not authenticated, redirect to sign-in page
      // Using signIn() function for a cleaner redirect to the configured sign-in page
      signIn(undefined, { callbackUrl: "/dashboard" });
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p className="flex min-h-screen w-full flex-col items-center justify-center">Loading...</p>;
  }

  if (!session) {
    // This will be briefly shown before redirect or if redirect fails
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        <p>You are not signed in.</p>
        <button onClick={() => signIn()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Sign In
        </button>
      </div>
    );
  }

  // If session exists, display the dashboard
  return <DashboardComponent />;
}