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

    // 🔥 Full open CORS config
    server.register(cors, {
      origin: "*", // dozvoli sve izvore
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // dozvoli sve HTTP metode
      allowedHeaders: ["Content-Type", "Authorization"], // dozvoli tipične headere
    });

    // ✅ health check ruta
    server.get("/", async () => ({
      status: "ok",
      message: "API is running 🚀",
    }));

    // ✅ tvoje rute
    setRoutes(server);

    // ✅ fallback za preflight OPTIONS (nije obavezno, ali pomaže u nekim browserima)
    server.options("/*", (_, reply) => {
      reply
        .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
        .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        .send();
    });

    await server.listen({ port: 3000, host: "0.0.0.0" });
    server.log.info(`✅ Server listening on http://0.0.0.0:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
