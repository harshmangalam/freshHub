/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps, Handlers } from "$fresh/server.ts";
import { fetchUserInfo } from "../services/github.ts";
import Layout from "../components/Layout.tsx";
import { Status } from "https://deno.land/std@0.146.0/http/http_status.ts";


export const handler: Handlers = {
  async POST(req, ctx) {
    try {
      // get form data from request
      const formData = await req.formData();
      // extract username from form data
      const username = formData.get("username");
      // add validation
      if (!username || username.toString().trim().length === 0) {
        return ctx.render({ error: "Username should not be empty" });
      }

      // check if username exists
      const [status] = await fetchUserInfo(String(username));
      // handle different error status code
      if (status === Status.NotFound) {
        return ctx.render({ error: "User not found" });
      }
      if (status === Status.Forbidden) {
        return ctx.render({
          error: "Exceeded github api limit try after an hour",
        });
      }

      // redirect to user profile screen
      return new Response(undefined, {
        headers: {
          location: `/${username}`,
        },
        status: Status.Found,
      });
    } catch (error) {
      return ctx.render({ error: error.message });
    }
  },
};
export default function Home({ data }: PageProps) {
  return (
    <Layout title={"Home"}>
      <form
        method="post"
        className={tw`max-w-md  mx-auto bg-gray-800 p-4 rounded-xl shadow-md`}
      >
        <div className={tw`flex flex-col space-y-2`}>
          <label htmlFor="username">Github Username</label>
          <input
            autoFocus
            type="text"
            name="username"
            id="username"
            className={tw`bg-gray-700 px-4 py-2 rounded-md border-2 ${
              data?.error ? "border-red-400" : "border-blue-400"
            } focus:outline-none`}
            placeholder={"harshmangalam"}
          />
          {data?.error && (
            <p className={tw`text-sm text-red-400`}>{data.error}</p>
          )}
        </div>
        <button
          className={tw`focus:outline-none hover:bg-gray-600 bg-gray-700 text-lg font-bold w-full mt-4 py-2 px-4 rounded-md`}
        >
          Continue
        </button>
      </form>
    </Layout>
  );
}
