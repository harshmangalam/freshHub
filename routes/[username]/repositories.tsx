/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps, Handlers } from "$fresh/server.ts";
import { fetchRepositories } from "../../utils/github.ts";
import Repository from "../../components/Repsitory.tsx";
import Layout from "../../components/Layout.tsx";
import PageHeading from "../../components/PageHeading.tsx";

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
    <Layout title={`${username} | Repository`}>
      <div className={tw`max-w-5xl mx-auto `}>
        <PageHeading heading="Repositories" backHref={`/${username}`} />
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
      </div>
    </Layout>
  );
}
