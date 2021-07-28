import PostModel from "./PostModel";

export async function loadAll() {
  const posts = await PostModel.find().sort({ createdAt: -1 });

  if (!posts) {
    return null;
  }

  return posts;
}
