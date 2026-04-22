"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
// import { signInSchema } from "@/schemas/auth";
// import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/auth";

import type { z } from "zod";

import Link from "next/link";
import Loader from "../loader";

export function SignInForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    // setIsSigningIn(true);
    // await authClient.signIn.email({
    //   email: data.email,
    //   password: data.password,
    //   fetchOptions: {
    //     onSuccess: () => {
    //       toast.success("Signed in successfully");
    //       router.push("/");
    //     },
    //     onError: ({ error }) => {
    //       toast.error(error.message || "Failed to sign in");
    //     },
    //   },
    // });
    // setIsSigningIn(false);
    toast.success("Signed in successfully");
    router.push("/home");
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="relative flex items-center">
                    <Input
                      id="password"
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="********"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {isPasswordVisible ? (
                      <Eye
                        className="absolute right-2 size-5 cursor-pointer"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      />
                    ) : (
                      <EyeClosed
                        className="absolute right-2 size-5 cursor-pointer"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      />
                    )}
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <Button type="submit" disabled={isSigningIn}>
                {isSigningIn ? <Loader label="Signing in..." /> : "Sign in"}
              </Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
