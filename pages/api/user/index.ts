import nc from "next-connect";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { connectDatabase } from "@/api-lib/db";
import { updateUserHandler } from "@/api-lib/controller/user.controller";


const handler = nc();

handler.use(connectDatabase);

handler.patch(verifyUser, updateUserHandler);

// handle delete account


export default handler;