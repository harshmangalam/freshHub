/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps } from "$fresh/server.ts";
export default function Home({ data }: PageProps) {
  return (
    <div className={tw`h-screen bg-gray-900 text-gray-100`}>
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

      <main className={tw`container mx-auto px-4 py-8`}>
        <form
          method="post"
          className={tw`max-w-md  mx-auto bg-gray-800 p-4 rounded-xl shadow-md`}
        >
          <div className={tw`flex flex-col space-y-2`}>
            <label htmlFor="username">Github Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className={tw`bg-gray-700 px-4 py-2 rounded-md border-2 ${
                data?.error ? "border-red-400" : "border-blue-400"
              } focus:outline-none`}
              placeholder={"harshmangalam"}
            />
            {data?.error && (
              <p className={tw`text-sm text-red-400`}>Invalid username</p>
            )}
          </div>
          <button
            className={tw`bg-gray-700 text-lg font-bold w-full mt-4 py-2 px-4 rounded-md`}
          >
            Continue
          </button>
        </form>
      </main>
    </div>
  );
}
