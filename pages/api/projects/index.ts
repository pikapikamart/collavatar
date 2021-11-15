import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { getProjectsHandler } from "@/api-lib/controller/projects.controller";


const handler = nc();

handler.use(connectDatabase);

handler.get(verifyUser, getProjectsHandler);


export default handler;