import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { getAllProjectsHandler } from "@/api-lib/controller/projects.controller";


const handler = nc();

handler.use(connectDatabase);

// Get all projects for client side
handler.get(getAllProjectsHandler);


export default handler;