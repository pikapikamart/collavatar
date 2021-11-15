import * as yup from "yup";


const payload = {
  body: yup.object({
    projectName: yup.string().required("Project name is required."),
    projectLink: yup.string().required("Project link is required"),
    projectLimitation: yup.boolean(),
    projectCapacity: yup.number().required("Project member capacity is required")
      .min(0, "Project capacity minimum is 0."),
    projectTags: yup.array().of(yup.object({
      tagName: yup.string().required("Tagname is required"),
      needed: yup.boolean().required()
    })),
    projectDescription: yup.string().required("Project description is required.")
  })
};

export const createProjectSchema = yup.object({
  ...payload
})