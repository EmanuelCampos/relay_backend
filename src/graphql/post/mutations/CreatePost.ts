import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";

import PostModel from "../PostModel";
import { PostEdge } from "../PostType";

export default mutationWithClientMutationId({
  name: "CreatePost",
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ title, body }) => {
    const post = new PostModel({ title, body });
    await post.save();

    return {
      post,
      error: null,
      success: "Post created successfully",
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
          cursor: toGlobalId("Post", post.id),
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
