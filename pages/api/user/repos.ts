import nc from "next-connect";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { getReposHandler } from "@/api-lib/controller/repos.controller";


const handler = nc();

// Get user repos
handler.get(verifyUser, getReposHandler);

export default handler;