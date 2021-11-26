

export const fetcher = async( input: RequestInfo, init: RequestInit = {}, ...args: any[]) =>{
  const fetchedData = await fetch(input, init);
  let payload;

  try {
      // handle things
      // ....
      payload = await fetchedData.json();
      if ( fetchedData.ok ) return payload;
  } catch( error ) {

  }
}
