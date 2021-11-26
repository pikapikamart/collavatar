

export const fetcher = async( input: RequestInfo, init: RequestInit, ...args: any[]) =>{
  const fetchedData = await fetch(input, init);
  
}