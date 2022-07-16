/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps, Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { fetchRepositories } from "../../utils/github.ts";
import Repository from "../../components/Repsitory.tsx";

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  private: boolean;
  stargazers_count: number;
  forks_count: number;
}
export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const username = ctx.params.username;
      if (!username) {
        return new Response(undefined, {
          status: 302,
          headers: {
            location: "/",
          },
        });
      }
      const [status, repos] = await fetchRepositories(username);

      if (status !== 200) {
        return new Response(undefined, {
          status: 302,
          headers: {
            location: "/",
          },
        });
      }
      return ctx.render({ repos });
    } catch (error) {
      console.log(error);
      return new Response(undefined, {
        status: 302,
        headers: {
          location: "/",
        },
      });
    }
  },
};

export default function Repositories({
  data,
  params,
}: PageProps<{ repos: Repository[] }>) {
  const repos = data?.repos;
  const username = params.username;
  return (
    <div className={tw`min-h-screen bg-gray-900 text-gray-100`}>
      <Head>
        <title>{username} | Repository</title>
      </Head>

      <main className={tw`max-w-5xl mx-auto py-8 px-4 `}>
        <h1 className={tw`text-2xl font-bold text-gray-100`}>Repositories</h1>
        <div className={tw`grid grid-cols-1 md:grid-cols-2 gap-4 mt-4`}>
          {repos.map((repo) => (
            <Repository
              id={repo.id}
              name={repo.name}
              description={repo.description}
              isPrivate={repo.private}
              forks_count={repo.forks_count}
              language={repo.language}
              stargazers_count={repo.stargazers_count}
              key={repo.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
