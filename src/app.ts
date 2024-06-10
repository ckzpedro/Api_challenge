import express from "express";
import { router } from "./routes/router";
import cors from 'cors'

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.cors()
    this.middleware();
    this.router();
  }

  private cors() {
    this.server.use(cors({ credentials: true, origin: process.env.APP_URL }));
  }

  private middleware() {
    this.server.use(express.json());
  }

  private router() {
    this.server.use(router);
  }
}