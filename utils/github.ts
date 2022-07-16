const GITHUB_API = "https://api.github.com";

export async function fetchUserInfo(username: string) {
  const userInfo = await fetch(`${GITHUB_API}/users/${username}`);
  return [userInfo.status, await userInfo.json()];
}
