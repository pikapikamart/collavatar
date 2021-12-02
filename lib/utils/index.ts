

export type ErrorStatus = {
  status: number,
  title: string,
  error: string
}

export type SuccessStatus = {
  status: number,
  message: string,
  data: any
}

export type FetchedDataStatus = SuccessStatus | ErrorStatus;

export const fetcher = async( input: RequestInfo, init: RequestInit = {}, ...args: any[]) =>{
  const fetchedData = await fetch(input, init);
  let payload;

  try {
      // handle things
      // ....
      payload = await fetchedData.json();
      
  } catch( error ) {
    // .....
  }

  return payload as ErrorStatus | SuccessStatus;
}

export const buildFetchedUpdate = (method: string, body: any) =>{
  const fetchUpdateData = {
    method: method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }

  return fetchUpdateData;
}