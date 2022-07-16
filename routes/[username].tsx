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
      const [status, user] = await fetchUserInfo(username);

      if (status !== 200) {
        return new Response(undefined, {
          status: 302,
          headers: {
            location: "/",
          },
        });
      }
      return ctx.render({ user });
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
export default function Greet({ data, params }: PageProps) {
  const user = data?.user;
  const error = data?.error;
  const username = params.username;
  return (
    <div className={tw`min-h-screen bg-gray-900 text-gray-100`}>
      <Head>
        <title>{error ? "Error" : username}</title>
      </Head>

      <nav
        className={tw`flex justify-between items-center h-16 bg-gray-800 px-4`}
      >
        <div className={tw`flex items-center space-x-3`}>
          <img
            src="favicon.ico"
            alt="FreshLogo"
            className={tw`w-10 h-10 object-fit`}
          />
          <h1 className={tw`font-bold text-2xl`}>FreshHub</h1>
        </div>
      </nav>

      <main className={tw` max-w-5xl grid place-items-center mx-auto px-4 py-8`}>
        <div className={tw``}>
          <div className={tw``}>
            <img
              src={user.avatar_url}
              alt={user.name}
              className={tw`w-64 h-64 aspect-square rounded-full`}
            />

            <div className={tw`mt-4`}>
              <h2 className={tw`text-2xl font-bold`}>{user.name}</h2>
              <h2 className={tw`text-xl text-gray-400`}>{user.login}</h2>
            </div>
            <p className={tw`mt-4 text-gray-300 max-w-md`}>{user.bio}</p>

            <div className={tw`mt-4 flex items-center space-x-2`}>
              <div className={tw`flex items-center space-x-1`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={tw`h-4 w-4`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <p className={tw`font-bold`}>{user.followers}</p>
                <p className={tw`text-gray-300 text-sm`}>
                  {user.followers > 1 ? "followers" : "follower"}
                </p>
              </div>
              <span>&bull;</span>
              <div className={tw`flex items-center space-x-1`}>
                <p className={tw`font-bold`}>{user.following}</p>
                <p className={tw`text-gray-300 text-sm`}>
                  {user.following > 1 ? "followings" : "following"}
                </p>
              </div>
            </div>

            <div className={tw`mt-4 flex flex-col space-y-2`}>
              <div className={tw`flex items-center space-x-2`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={tw`h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>

                <p className={tw`text-gray-300`}>{user.company}</p>
              </div>

              <div className={tw`flex items-center space-x-2`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={tw`h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <p className={tw`text-gray-300`}>{user.location}</p>
              </div>

              <div className={tw`flex items-center space-x-2`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={tw`h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>

                <p className={tw`text-gray-300`}>{user.blog}</p>
              </div>

              <div className={tw`flex items-center space-x-2`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={tw`h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                  />
                </svg>
                <p className={tw`text-gray-300`}>@{user.twitter_username}</p>
              </div>
            </div>
          </div>

          <div className={tw`mt-8`}>
            <div className={tw`flex items-center gap-4 flex-wrap`}>
              {links.map((link) => (
                <a
                  key={link.name}
                  href={`/${username}/${link.href}`}
                  className={tw`bg-gray-700 rounded-full px-4 py-2`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const links = [
  {
    name: "Repositories",
    href: "repositories",
  },
  {
    name: "Subscriptions",
    href: "subscriptions",
  },
  {
    name: "Organizations",
    href: "organizations",
  },
  {
    name: "Events",
    href: "events",
  },
  {
    name: "Received Events",
    href: "received_events",
  },
];
