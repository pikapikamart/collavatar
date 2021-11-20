import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { getUserProjects, userProjectSelections } from "@/api-lib/controller/projects.controller";


const handler = nc();

handler.use(connectDatabase);

handler.get(verifyUser, getUserProjects(userProjectSelections.collaborated));


export default handler;