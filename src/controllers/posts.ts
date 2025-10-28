import { FastifyReply, FastifyRequest } from "fastify";
import PostModel from "../models/Posts";

interface ICreatePostBody {
  readonly title: string;
  readonly description: string;
}

interface IUpdatePostBody {
  readonly title?: string;
  readonly description?: string;
}

interface IPostParams {
  readonly id: string;
}

class PostsController {
  async createPost(
    request: FastifyRequest<{ Body: ICreatePostBody }>,
    reply: FastifyReply
  ) {
    try {
      const { title, description } = request.body;
      const post = new PostModel({ title, description });
      await post.save();
      return reply.code(201).send(post);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ message: "Error creating post" });
    }
  }

  async getAllPosts(request: FastifyRequest, reply: FastifyReply) {
    try {
      const posts = await PostModel.find();
      return reply.code(200).send(posts);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ message: "Error fetching posts" });
    }
  }

  async getPostById(
    request: FastifyRequest<{ Params: IPostParams }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const post = await PostModel.findById(id);
      if (!post) {
        return reply.code(404).send({ message: "Post not found" });
      }
      return reply.code(200).send(post);
    } catch (error) {
      request.log.error(error);
      return reply.code(400).send({ message: "Invalid post ID" });
    }
  }

  async updatePost(
    request: FastifyRequest<{ Params: IPostParams; Body: IUpdatePostBody }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const { title, description } = request.body;
      const post = await PostModel.findByIdAndUpdate(
        id,
        { title, description, updatedAt: new Date() },
        { new: true }
      );
      if (!post) {
        return reply.code(404).send({ message: "Post not found" });
      }
      return reply.code(200).send(post);
    } catch (error) {
      request.log.error(error);
      return reply.code(400).send({ message: "Error updating post" });
    }
  }

  async deletePost(
    request: FastifyRequest<{ Params: IPostParams }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const post = await PostModel.findByIdAndDelete(id);
      if (!post) {
        return reply.code(404).send({ message: "Post not found" });
      }
      return reply.code(204).send();
    } catch (error) {
      request.log.error(error);
      return reply.code(400).send({ message: "Error deleting post" });
    }
  }
}

export default new PostsController();
