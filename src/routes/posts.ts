import { FastifyInstance } from "fastify";
import postsController from "../controllers/posts";

export const setRoutes = (app: FastifyInstance) => {
  app.get("/posts", postsController.getAllPosts);
  app.get("/posts/:id", postsController.getPostById);
  app.post("/posts", postsController.createPost);
  app.put("/posts/:id", postsController.updatePost);
  app.delete("/posts/:id", postsController.deletePost);
};
