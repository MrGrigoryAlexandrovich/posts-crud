import fastify from "fastify";
import dotenv from "dotenv";
import connectDB from "./connection/mongoose";
import { setRoutes } from "./routes/posts";

const server = fastify({ logger: true });
dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    setRoutes(server);

    server.get("/", async () => {
      return { status: "ok", message: "Posts API is running 🚀" };
    });

    await server.listen({ port: 3000, host: "0.0.0.0" });
    server.log.info(`Server listening on http://0.0.0.0:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
