// app/profile/[username]/page.tsx
import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const user = await getProfileByUsername(params.username);
  if (!user) return { title: "User not found" };
  return {
    title: user.name ?? user.username,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

export default async function ProfilePageServer(props: PageProps) {
  const params = await props.params; // ✅ await params
  console.log("✅ Params:", params);

  const user = await getProfileByUsername(params.username);
  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}
