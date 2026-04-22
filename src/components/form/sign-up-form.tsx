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
// import { signUpSchema } from "@/schemas/auth";
// import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";

import type { z } from "zod";

import Link from "next/link";
import Loader from "../loader";
import { signUpSchema } from "@/schemas/auth";

export function SignUpForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    // setIsSigningUp(true);
    // await authClient.signUp.email({
    //   email: data.email,
    //   password: data.password,
    //   name: data.fullName,
    //   fetchOptions: {
    //     onSuccess: () => {
    //       toast.success("Account created successfully");
    //       router.push("/");
    //     },
    //     onError: ({ error }) => {
    //       toast.error(error.message || "Failed to create account");
    //     },
    //   },
    // });
    // setIsSigningUp(false);
    toast.success("Account created successfully");
    router.push("/home");
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
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
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <div className="relative flex items-center">
                    <Input
                      id="confirm-password"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      placeholder="********"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {isConfirmPasswordVisible ? (
                      <Eye
                        className="absolute right-2 size-5 cursor-pointer"
                        onClick={() =>
                          setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                        }
                      />
                    ) : (
                      <EyeClosed
                        className="absolute right-2 size-5 cursor-pointer"
                        onClick={() =>
                          setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                        }
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
              <Button type="submit" disabled={isSigningUp}>
                {isSigningUp ? (
                  <Loader label="Signing up..." />
                ) : (
                  "Create Account"
                )}
              </Button>
              <FieldDescription className="px-6 text-center">
                Already have an account? <Link href="/sign-in">Sign in</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
