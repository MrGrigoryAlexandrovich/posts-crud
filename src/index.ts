import fastify from "fastify";
import dotenv from "dotenv";
import connectDB from "./connection/mongoose";
import { setRoutes } from "./routes/posts";
import cors from "@fastify/cors";

const server = fastify({ logger: true });
dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    await server.register(cors, {
      origin: true,
    });

    setRoutes(server);

    server.get("/", async () => {
      return { status: "ok", message: "API is running 🚀" };
    });

    await server.listen({ port: 3000, host: "0.0.0.0" });
    server.log.info(`Server listening on http://0.0.0.0:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
