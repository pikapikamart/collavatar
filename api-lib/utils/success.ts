import { NextApiResponse } from "next";


export const ClientSuccess = (res: NextApiResponse, status: number, message = "", data: any = null, ) =>{
  const success = {
    status: status,
    message: message,
    data: data
  }

  return res.status(status).json(success);
}