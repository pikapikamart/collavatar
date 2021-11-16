import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { validateRequest } from "@/api-lib/middlewares/validateRequest";
import { createRequestSchema } from "@/api-lib/schemas/request.schema";
import { createProjectRequestHandler } from "@/api-lib/controller/requestProject.controller";


const handler = nc();

handler.use(connectDatabase);

// Send request for project collaboration
handler.post(verifyUser, validateRequest(createRequestSchema), createProjectRequestHandler);


export default handler;