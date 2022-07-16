/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps, Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { fetchRepositories } from "../../utils/github.ts";

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

export default function Repositories({data}:PageProps) {
    const repos = data?.repos
  return <div>
    {JSON.stringify(repos)}
  </div>
}
