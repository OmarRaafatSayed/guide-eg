import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleAIGuide } from "./routes/ai-guide";
import { handleGetProducts, handleGetProduct, handleGetFilters } from "./routes/marketplace";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/ai-guide", handleAIGuide);
  
  // Marketplace API routes
  app.get("/api/marketplace/products", handleGetProducts);
  app.get("/api/marketplace/products/:id", handleGetProduct);
  app.get("/api/marketplace/filters", handleGetFilters);

  return app;
}
