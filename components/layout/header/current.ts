

const currentLink: Record<string, string> = {
  "Collabs": "Freely collaboarate with others.",
  "Dashboard": "",
  "Workspace": "Work project with your team."
}

export const checkCurrentLink = ( link: string ) =>{
  const name = link.charAt(1).toUpperCase() + link.slice(2);

  return {
    name,
    text: currentLink[name]
  }
}