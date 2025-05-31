"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Logo = () => (
  <div className="flex items-center space-x-2">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="url(#paint0_linear_1_2)" />
      <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="white" />
      <defs>
        <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStartForFree = () => router.push("/auth/signin");
  const handleJoinWithGoogle = () => signIn("google", { callbackUrl: "/dashboard" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 text-gray-800">
      <header className="container mx-auto px-6 py-6 flex justify-between items-center relative">
        <Logo />
        <nav className="hidden md:flex space-x-6 items-center">
          {["How it works", "Writing Examples", "Pricing", "Blog"].map((item, i) => (
            <Link key={i} href="#" className="hover:text-purple-600">{item}</Link>
          ))}
          <Button
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
            onClick={handleJoinWithGoogle}
          >
            <span className="mr-2">G</span> Join with Google
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleStartForFree}>
            Start for Free →
          </Button>
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
          {menuOpen && (
            <div className="absolute top-20 right-6 bg-white rounded-lg shadow-lg p-4 space-y-3 z-50">
              {["How it works", "Writing Examples", "Pricing", "Blog"].map((item, i) => (
                <Link key={i} href="#" className="block text-gray-700 hover:text-purple-600">{item}</Link>
              ))}
              <Button
                variant="outline"
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                onClick={handleJoinWithGoogle}
              >
                <span className="mr-2">G</span> Join with Google
              </Button>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleStartForFree}
              >
                Start for Free →
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Grow Organic Traffic<br />on <span className="text-purple-600">Auto-Pilot</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Get traffic and outrank competitors with Backlinks & SEO-optimized content while you sleep.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <Button
            size="lg"
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700 w-full sm:w-auto"
            onClick={handleJoinWithGoogle}
          >
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
          <span>👥</span>
          <span>50k+ Articles Created</span>
        </div>

        <div className="relative mt-20 hidden md:block">
          <div className="absolute -top-12 left-[10%] bg-white p-4 rounded-xl shadow-lg w-52">
            <p className="text-sm font-semibold">SEO Content Score</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "97%" }}></div>
            </div>
            <p className="text-xl font-bold text-green-600 text-center">97%</p>
          </div>
          {/* <div className="absolute top-[80px] right-[5%] bg-white px-3 py-2 rounded-lg shadow-md text-sm font-medium">
            🔑 Power Keywords
          </div> */}
          <div className="absolute top-[-65px] right-[5%] bg-white p-4 rounded-xl shadow-lg w-64">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">4</span>
              <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">Sat</span>
            </div>
            <p className="font-semibold text-sm mb-1">How to write blog posts</p>
            <p className="text-xs text-gray-500">Volume: 2,154</p>
            <p className="text-xs text-gray-500 mb-3">Difficulty: 9</p>
            <Button size="sm" className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs">Visit Article</Button>
          </div>
          {/* <div className="absolute top-[250px] right-[5%] bg-white px-3 py-2 rounded-lg shadow-md text-sm font-medium">
            🖼️ Personal Images
          </div> */}
          {/* <div className="absolute bottom-[-80px] left-[10%] bg-white p-4 rounded-xl shadow-lg w-64">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">5</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Sun</span>
            </div>
            <p className="font-semibold text-sm mb-1">How to monetize blog</p>
            <p className="text-xs text-gray-500">Volume: 2,950</p>
            <p className="text-xs text-gray-500">Difficulty: 12</p>
          </div> */}
        </div>
      </main>
    </div>
  );
}
