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
    await server.listen(3000);
    server.log.info(`Server listening on http://localhost:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
