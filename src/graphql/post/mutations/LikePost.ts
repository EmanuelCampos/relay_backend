import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import mongoose from "mongoose";

import PostModel from "../PostModel";
import { PostEdge } from "../PostType";

export default mutationWithClientMutationId({
  name: "LikePost",
  inputFields: {
    postId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ userId, postId }) => {
    const { ObjectId } = mongoose.Types;

    const post = await PostModel.findById(postId);

    if (!post) {
      return null;
    }

    if (!userId) {
      return null;
    }

    const hasLiked = post.hasLiked.some((user) => user == userId);

    if (hasLiked) {
      await PostModel.updateOne(
        { _id: ObjectId(postId) },
        {
          $inc: { likesCount: -1 },
          $pull: {
            hasLiked: ObjectId(userId),
          },
        },
        { new: true }
      );

      return {
        post: {
          ...post,
          likesCount: post.likesCount - 1,
        },
        error: null,
        success: "Post unliked successfully",
      };
    }

    await PostModel.updateOne(
      { _id: ObjectId(postId) },
      {
        $inc: { likesCount: 1 },
        $push: {
          hasLiked: ObjectId(userId),
        },
      }
    );

    return {
      post: {
        ...post,
        likesCount: post.likesCount + 1,
      },
      error: null,
      success: "Post liked successfully",
    };
  },
  outputFields: {
    postEdge: {
      type: PostEdge,
      resolve: async ({ post }) => {
        if (!post) {
          return null;
        }

        return {
          cursor: toGlobalId("Post", String(post._id)),
          node: post,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }: { error: string }) => error,
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }: { success: string }) => success,
    },
  },
});
