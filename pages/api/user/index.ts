import nc from "next-connect";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { connectDatabase } from "@/api-lib/db";
import { updateUserHandler, getCurrentUserHandler } from "@/api-lib/controller/user.controller";


const handler = nc();

handler.use(connectDatabase);

// Get current user information
handler.get(verifyUser, getCurrentUserHandler)
// Update user information
handler.patch(verifyUser, updateUserHandler);


export default handler;