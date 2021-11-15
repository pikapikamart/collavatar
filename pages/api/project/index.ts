import nc from "next-connect";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { validateRequest } from "@/api-lib/middlewares/validateRequest";
import { connectDatabase } from "@/api-lib/db";
import { createProjectSchema } from "@/api-lib/schemas/project.schemas";
import { createProjectHandler } from "@/api-lib/controller/project.controller";


const handler = nc();

handler.use(connectDatabase);

// project creation
handler.post(verifyUser, validateRequest(createProjectSchema), createProjectHandler);
// edit project


export default handler;