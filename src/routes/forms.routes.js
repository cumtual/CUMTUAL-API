import { Router } from "express";
import { getServiceType ,getBuissnes} from "../controllers/formSelects.controller.js";

const router = Router();

router.get('/serviceType', getServiceType);

router.get('/buissnes', getBuissnes);

export default router;