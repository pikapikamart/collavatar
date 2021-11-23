import nc from "next-connect";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { getAccessTokenHandler } from "@/api-lib/controller/token.controller";


const handler = nc();

// Get user repos
handler.get(verifyUser, getAccessTokenHandler);

export default handler;