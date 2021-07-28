import { GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post Type",
  fields: () => ({
    id: globalIdField("Post"),
    title: {
      type: GraphQLString,
      resolve: (post) => post.title,
    },
    body: {
      type: GraphQLString,
      resolve: (post) => post.body,
    },
    likesCount: {
      type: GraphQLString,
      resolve: (post) => post.likesCount,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (post) => post.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (post) => post.updatedAt,
    },
  }),
});

const { connectionType: PostConnection, edgeType: PostEdge } =
  connectionDefinitions({
    nodeType: PostType,
  });

export { PostConnection, PostEdge };

export default PostType;
