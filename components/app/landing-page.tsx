"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Placeholder for an actual logo if you have one
const Logo = () => (
  <div className="flex items-center space-x-2">
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 0L32 16L16 32L0 16L16 0Z"
        fill="url(#paint0_linear_1_2)"
      />
      <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="white" />
      <defs>
        <linearGradient
          id="paint0_linear_1_2"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
    <span className="font-bold text-2xl text-purple-700">Outrank</span>
  </div>
);

export default function LandingPage() {
  const router = useRouter();

  const handleStartForFree = () => {
    router.push("/auth/signin");
  };

  const handleJoinWithGoogle = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 text-gray-800">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="#" className="hover:text-purple-600">
            How it works
          </Link>
          <Link href="#" className="hover:text-purple-600">
            Writing Examples
          </Link>
          <Link href="#" className="hover:text-purple-600">
            Pricing
          </Link>
          <Link href="#" className="hover:text-purple-600">
            Blog
          </Link>
          <Button
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
            onClick={handleJoinWithGoogle}
          >
            {/* Placeholder for Google Icon */}
            <span className="mr-2">G</span> Join with Google
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleStartForFree}
          >
            Start for Free →
          </Button>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button placeholder */}
          <Button variant="ghost" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Grow Organic Traffic
          <br />
          on <span className="text-purple-600">Auto-Pilot</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Get traffic and outrank competitors with Backlinks & SEO-optimized
          content while you sleep.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <Button
            size="lg"
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700 w-full sm:w-auto"
            onClick={handleJoinWithGoogle}
          >
            {/* Placeholder for Google Icon */}
            <span className="mr-2">G</span> Join with Google
          </Button>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
            onClick={handleStartForFree}
          >
            Get Started for Free →
          </Button>
        </div>
        <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
          {/* Placeholder for avatars */}
          <span>👥</span>
          <span>50k+ Articles Created</span>
        </div>

        {/* Floating UI elements - basic representation */}
        <div className="relative mt-16 hidden md:block">
          {/* These are highly simplified placeholders. Actual implementation would require more complex positioning and styling. */}
          <div className="absolute top-[-50px] left-[10%] bg-white p-4 rounded-lg shadow-xl w-48">
            <p className="text-sm font-semibold">SEO Content Score</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
              <div className="bg-green-500 h-2.5 rounded-full" style={{width: "97%"}}></div>
            </div>
            <p className="text-2xl font-bold text-green-500 text-center">97%</p>
          </div>
          <div className="absolute top-[100px] right-[15%] bg-white p-3 rounded-lg shadow-lg text-sm">
            🔑 Power keywords
          </div>
          <div className="absolute bottom-[-80px] left-[20%] bg-white p-4 rounded-lg shadow-xl w-60">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">5</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Sun</span>
            </div>
            <p className="font-semibold text-sm mb-1">how to monetize blog</p>
            <p className="text-xs text-gray-500">Volume: 2950</p>
            <p className="text-xs text-gray-500 mb-2">Difficulty: 12</p>
          </div>
           <div className="absolute top-[0px] right-[5%] bg-white p-3 rounded-lg shadow-lg text-sm">
            🖼️ Personal Images
          </div>
          <div className="absolute top-[150px] right-[5%] bg-white p-4 rounded-lg shadow-xl w-60">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">4</span>
               <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">Sat</span>
            </div>
            <p className="font-semibold text-sm mb-1">how to write blog posts</p>
            <p className="text-xs text-gray-500">Volume: 2154</p>
            <p className="text-xs text-gray-500 mb-2">Difficulty: 9</p>
            <Button size="sm" className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs">Visit Article</Button>
          </div>
        </div>
      </main>
    </div>
  );
}