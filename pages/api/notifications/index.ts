import nc from "next-connect";
import { connectDatabase } from "@/api-lib/db";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import { getNotificationsHandler } from "@/api-lib/controller/notif.controller";


const handler = nc();

handler.use(connectDatabase);

// Get all nofitications
handler.get(verifyUser, getNotificationsHandler);


export default handler;