/** @jsx h */
/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps, Handlers } from "$fresh/server.ts";
import { fetchUserInfo } from "../utils/github.ts";
import { Head } from "$fresh/runtime.ts";

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
      const user = await fetchUserInfo(username);

      if (!user) {
        return new Response(undefined, {
          status: 302,
          headers: {
            location: "/",
          },
        });
      }
      return ctx.render({ user });
    } catch (error) {
      return ctx.render({ error: error.message });
    }
  },
};
export default function Greet({ data, params }: PageProps) {
  return (
    <div>
      <Head>
        <title>{data?.error ? "Error" : params.username}</title>
      </Head>
    </div>
  );
}
