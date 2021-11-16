import * as yup from "yup";


const payload = {
  body: yup.object({
    position: yup.string(),
    message: yup.string().required("Message for owner is required.")
  })
};


export const createRequestSchema = yup.object({
  ...payload
});