import fastify from "fastify";
import dotenv from "dotenv";
import cors from "fastify-cors";
import connectDB from "./connection/mongoose";
import { setRoutes } from "./routes/posts";

dotenv.config();

const server = fastify({ logger: true });

const startServer = async () => {
  try {
    await connectDB();
    server.register(cors, { origin: true });
    server.get("/", async () => ({
      status: "ok",
      message: "API is running 🚀",
    }));
    setRoutes(server);
    await server.listen({ port: 3000, host: "0.0.0.0" });
    server.log.info(`Server listening on http://0.0.0.0:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
