/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps, Handlers } from "$fresh/server.ts";
import { fetchFollowing } from "../../services/github.ts";
import Layout from "../../components/Layout.tsx";
import User from "../../components/User.tsx";
import PageHeading from "../../components/PageHeading.tsx";
import { Status } from "https://deno.land/std@0.146.0/http/http_status.ts";

interface User {
  id: number;
  login: string;
  avatar_url: string;
  type: string;
}
export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const username = ctx.params.username;
      if (!username) {
        return new Response(undefined, {
          status: Status.Found,
          headers: {
            location: "/",
          },
        });
      }
      const [status, users] = await fetchFollowing(username);

      if (status !== Status.OK) {
        return new Response(undefined, {
          status: Status.Found,
          headers: {
            location: "/",
          },
        });
      }
      return ctx.render({ users });
    } catch (error) {
      console.log(error);
      return new Response(undefined, {
        status: Status.Found,
        headers: {
          location: "/",
        },
      });
    }
  },
};

export default function Following({
  data,
  params,
}: PageProps<{ users: User[] }>) {
  const users = data?.users;
  const username = params.username;
  return (
    <Layout title={`${username} | Following`}>
      <div className={tw`max-w-5xl mx-auto `}>
        <PageHeading heading="Following" backHref={`/${username}`} />
        <div className={tw`grid grid-cols-1 md:grid-cols-3 gap-4 mt-4`}>
          {users.map((user) => (
            <User
              avatar_url={user.avatar_url}
              id={user.id}
              login={user.login}
              key={user.id}
              type={user.type}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
