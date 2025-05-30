"use client";

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation"; // Corrected import for App Router
import Link from "next/link";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

type Providers = Record<string, Provider>;

export default function SignIn() {
  const [providers, setProviders] = useState<Providers | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const handleSignIn = async (providerId?: string) => {
    setError(""); // Clear previous errors
    let result;
    if (providerId) {
      result = await signIn(providerId, { redirect: false, callbackUrl: "/dashboard" });
    } else {
      // Credentials sign in
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }
      result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/dashboard",
      });
    }

    if (result?.error) {
      setError(result.error === "CredentialsSignin" ? "Invalid email or password." : result.error);
    } else if (result?.ok && result?.url) {
      router.push(result.url); // Redirect to dashboard or callbackUrl
    } else if (result?.ok) {
      router.push("/dashboard"); // Fallback redirect
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials or use a provider to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={() => handleSignIn()} className="w-full">
            Sign in with Email
          </Button>
          {providers &&
            Object.values(providers).map((provider) => {
              if (provider.id === "credentials") return null; // Don't show credentials as a button
              return (
                <Button
                  variant="outline"
                  key={provider.name}
                  onClick={() => handleSignIn(provider.id)}
                  className="w-full"
                >
                  Sign in with {provider.name}
                </Button>
              );
            })}
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center text-gray-500 w-full">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}