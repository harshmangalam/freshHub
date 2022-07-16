const GITHUB_API = "https://api.github.com";

const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN");
export async function fetchUserInfo(username: string) {
  const response = await fetch(`${GITHUB_API}/users/${username}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });

  return [response.status, await response.json()];
}

export async function fetchRepositories(username: string) {
  const response = await fetch(`${GITHUB_API}/users/${username}/repos`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });
  return [response.status, await response.json()];
}
