import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/api-lib/db";
import { verifyUser } from "@/api-lib/middlewares/verifyUser";
import nc from "next-connect";


const handler = nc();

handler.use(connectDatabase);

// Update existing project
handler.patch(verifyUser)


export default handler;