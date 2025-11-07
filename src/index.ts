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

    await server.register(cors, {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });

    server.addHook("onSend", async (req, reply, payload) => {
      reply.header("Access-Control-Allow-Origin", "*");
      reply.header(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
      );
      reply.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      return payload;
    });

    server.options("/*", (_, reply) => {
      reply
        .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
        .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        .code(204)
        .send();
    });

    server.get("/", async () => ({
      status: "ok",
      message: "API is running",
    }));

    setRoutes(server);

    await server.listen({ port: 3000, host: "0.0.0.0" });
    server.log.info("Server listening on http://0.0.0.0:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
