import nc from "next-connect";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { connectDatabase } from "@/api-lib/db";
import { updateUserHandler } from "@/api-lib/controller/user.controller";


const handler = nc();

handler.use(connectDatabase);

// Update user information
handler.patch(verifyUser, updateUserHandler);


export default handler;