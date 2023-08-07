import Link from "next/link";
import { Icons } from "./Icons";
import UserAuthForm from "./UserAuthForm";

export default function SignUp() {
   return (
      <div className="container mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[400px]">
         <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto w-6 h-6" />
            <p className="text-sm max-w-xs mx-auto">
               By continuing, you are setting up a Reddit v2.0 account agree to
               our User Agreement and Privacy Policy.
            </p>

            <UserAuthForm />

            <p className="px-8 text-center text-sm text-zinc-700">
               ALready a Redditor 2.0?{" "}
               <Link
                  href="/sign-in"
                  className="hover:text-zinc-800 text-sm underline underline-offset-4"
               >
                  Sign in
               </Link>
            </p>
         </div>
      </div>
   );
}
