/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

interface UserProps {
  id: number;
  login: string;
  avatar_url: string;
  type: string;
}
export default function User({ avatar_url, id, login, type }: UserProps) {
  return (
    <article className={tw`border border-gray-700  rounded-md p-4`}>
      <div className={tw`flex items-center justify-between`}>
        <div className={tw`flex-1 flex items-center space-x-3`}>
          <img src={avatar_url} alt={login} className={tw`w-10 h-10 rounded-full`} />
          <a
            href="/"
            className={tw`font-bold block  text-blue-400 hover:underline`}
          >
            {login}
          </a>
        </div>

        <p
          className={tw`text-xs px-2 py-1 border border-gray-700 rounded-full`}
        >
          {type}
        </p>
      </div>
    </article>
  );
}
