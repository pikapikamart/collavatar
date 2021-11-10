

interface GithubEmail {
  email: string,
  primary: boolean,
  verified: boolean,
  visibility: null | string
}

export const fetchGithubEmail = async( accessToken: String ) =>{
  const githubEmail = await fetch("https://api.github.com/user/emails", {
      headers: {
        "Authorization": `token ${accessToken}`
      }
    });
  
  const processedEmail = await githubEmail.json();

  const primaryEmail: GithubEmail = processedEmail.find(( email: GithubEmail) => email.primary);

  return primaryEmail.email;
}