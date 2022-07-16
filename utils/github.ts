const GITHUB_API = "https://api.github.com";

export async function fetchUserInfo(username: string) {
  const userInfo = await fetch(`${GITHUB_API}/users/${username}`, {
    headers: {
      Authorization: `Bearer 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`,
    },
  });
  return [userInfo.status, await userInfo.json()];
}
