import { NextApiResponse } from "next";
import { ValidationError } from "yup";


export const validateError = (error: unknown, httpStatus: number, res: NextApiResponse) =>{
  if ( error instanceof ValidationError ) {
    console.log(error);
    const errorMessage = error.errors.join(".");
    return ClientError(res, httpStatus, errorMessage);
  } 
  if ( error instanceof Error ) {
    console.log(error);
    return ClientError(res, httpStatus, error.message);
  } else {
    console.log(error);
    return ClientError(res, 500);
  }
}

export const ClientError = (res: NextApiResponse, status: number, message="") => {
  const error = {
    status: status,
    title: "",
    error: ""
  }
  
  switch( status ) {
    case 401: 
      error.title = "Unauthorized access.",
      error.error = message? message : "Make sure that you are currently logged in to continue."
      break;
    case 403: 
      error.title = "User forbidden.",
      error.error = message? message : "Can't process request due to user account not created."
      break;
    case 404:
      error.title = "Not found.",
      error.error = message;
      break
    case 409: 
      error.title = "Conflict",
      error.error = message;
      break;
    case 500:
      error.title = "Server error.";
      error.error = "Please try again later.";
      break;
  }

  return res.status(status).json(error);
};