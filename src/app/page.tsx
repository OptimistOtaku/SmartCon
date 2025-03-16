import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import { HeroSection } from "~/app/_components/hero-section";
import { Features } from "~/app/_components/features";
import { HowItWorks } from "~/app/_components/how-it-works";


export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <HeroSection />
        <Features />
        <HowItWorks />
        
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await auth();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.call();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
