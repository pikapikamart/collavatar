import { AnySchema } from "yup";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { validateError } from "@/api-lib/utils/errors";


export const validateRequest = ( schema: AnySchema) => async(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) =>{
  try {
    await schema.validate({
      body: req.body
    });
    return next()
  } catch( error ) {
    validateError(error, 400, res)
  }
}