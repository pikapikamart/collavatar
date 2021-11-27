

export const fetcher = async( input: RequestInfo, init: RequestInit = {}, ...args: any[]) =>{
  const fetchedData = await fetch(input, init);
  let payload;

  try {
      // handle things
      // ....
      payload = await fetchedData.json();
      console.log(payload);
      console.log(JSON.parse(payload));
      if ( fetchedData.ok ) return payload;
  } catch( error ) {

  }
}
