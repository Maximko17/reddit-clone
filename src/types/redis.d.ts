import { VoteType } from "@prisma/client";

export type CachedPost = {
   id: string;
   content: string;
   title: string;
   authorUsername: string;
   currentVote: VoteType | null;
   createdAt: Date;
};
