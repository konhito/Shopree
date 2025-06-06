"use client";

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard";

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600",
              footerActionLink: "text-orange-500 hover:text-orange-600",
            },
          }}
          redirectUrl={redirectUrl}
        />
      </div>
    </div>
  );
}
