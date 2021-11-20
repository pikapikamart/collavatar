

interface GithubEmail {
  email: string,
  primary: boolean,
  verified: boolean,
  visibility: null | string
}

export const fetchGithubEmail = async( accessToken: string ) =>{
  const githubEmail = await fetch("https://api.github.com/user/emails", {
      headers: {
        "Authorization": `token ${accessToken}`
      }
    });
  
  const processedEmail: GithubEmail[] = await githubEmail.json();
  const primaryEmail = processedEmail.find(( email: GithubEmail) => email.primary);

  return primaryEmail? primaryEmail.email : "";
}

