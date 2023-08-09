"use client";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { SubscribeToSubredditPayload } from "@/lib/validators/subredit";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { FC, startTransition } from "react";
import { Button } from "./ui/Button";

interface SubscribeLeaveToggleProps {
   isSubscribed: boolean;
   subredditId: string;
   subredditName: string;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
   subredditId,
   isSubscribed,
   subredditName,
}) => {
   const { loginToast } = useCustomToast();
   const router = useRouter();

   const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
      mutationFn: async () => {
         const payload: SubscribeToSubredditPayload = {
            subredditId,
         };

         const { data } = await axios.post("/api/subreddit/subscribe", payload);
         return data as string;
      },
      onError: (err) => {
         if (err instanceof AxiosError) {
            if (err.response?.status === 401) {
               return loginToast();
            }
         }

         toast({
            title: "There was a problem.",
            description: "Try again later.",
            variant: "destructive",
         });
      },
      onSuccess: () => {
         startTransition(() => {
            router.refresh();
         });

         toast({
            title: "Subscribed!",
            description: `You are now subcribed to '${subredditName}'`,
            variant: "success",
         });
      },
   });

   const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
      mutationFn: async () => {
         const payload: SubscribeToSubredditPayload = {
            subredditId,
         };

         const { data } = await axios.post(
            "/api/subreddit/unsubscribe",
            payload
         );
         return data as string;
      },
      onError: (err) => {
         if (err instanceof AxiosError) {
            if (err.response?.status === 401) {
               return loginToast();
            }
         }

         toast({
            title: "There was a problem.",
            description: "Try again later.",
            variant: "destructive",
         });
      },
      onSuccess: () => {
         startTransition(() => {
            router.refresh();
         });

         toast({
            title: "Unsubcribed!",
            description: `You unsubscribed from '${subredditName}'`,
            variant: "success",
         });
      },
   });

   return isSubscribed ? (
      <Button
         isLoading={isUnsubLoading}
         className="w-full mt-1 mb-4"
         onClick={() => unsubscribe()}
      >
         Leave community
      </Button>
   ) : (
      <Button
         isLoading={isSubLoading}
         className="w-full mt-1 mb-4"
         onClick={() => subscribe()}
      >
         Join to post
      </Button>
   );
};

export default SubscribeLeaveToggle;