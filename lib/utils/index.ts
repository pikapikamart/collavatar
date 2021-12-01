

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
  console.log(fetchedData);
  console.log(payload);
  if ( fetchedData.ok ) return payload;
}
