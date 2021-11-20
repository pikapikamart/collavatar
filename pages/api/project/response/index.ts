import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { validateRequest } from "@/api-lib/middlewares/validateRequest";
import { createResponseSchema } from "@/api-lib/schemas/notifcation.schema";
import { respondProjectRequestHandler } from "@/api-lib/controller/notification.controller";


const handler = nc();

handler.use(connectDatabase);

// Send request for project collaboration
handler.post(verifyUser, validateRequest(createResponseSchema), respondProjectRequestHandler);


export default handler;