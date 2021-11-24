import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { getUserProjects } from "@/api-lib/controller/projects.controller";


const handler = nc();

handler.use(connectDatabase);

handler.get(verifyUser, getUserProjects("ownedProjects"));


export default handler;