import express, { Router } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import emailSendRoutes from "./routes/emailSend.routes.js";
import formsSelect from "./routes/forms.routes.js";

const app = express();

const corsOptions = {
  origin: ["https://cumtual.com", "http://localhost:3000", "http://5.183.9.167"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.get("/", (req, res) => {
    res.send("Bienvenido a la API de Cumtual!");
});

app.use(helmet());
app.use(cors(corsOptions));
app.use();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Limitar solicitudes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por IP
  message:
    "Demasiadas solicitudes desde esta IP, por favor intenta nuevamente más tarde.",
});
app.use(limiter());

app.disable("x-powered-by");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send("Ocurrió un error en el servidor.");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ocurrió un error en el servidor.");
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use("/api/leads", limiter, emailSendRoutes);
app.use("/api/", limiter ,formsSelect);

export default app;
