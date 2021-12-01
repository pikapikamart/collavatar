

export const ClientError = (message="") => ({
  401: {
    status: 401,
    title: "Unauthorized access.",
    error: message? message : "Make sure that you are currently logged in to continue."
  },
  403: {
    status: 403,
    title: "User forbidden.",
    error: message? message : "Can't process request due to user account not created."
  },
  404: {
    status: 404,
    title: "Not found.",
    error: message
  },
  409: {
    status: 409,
    title: "Conflict",
    error: message
  }
});