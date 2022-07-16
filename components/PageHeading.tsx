/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

interface PageHeadingProps {
  heading: string;
  backHref: string;
}

export default function PageHeading({ heading, backHref }: PageHeadingProps) {
  return (
    <div className={tw`flex space-x-4 items-center`}>
      <a href={backHref}>
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </a>
      <h1 className={tw`text-2xl font-bold text-gray-100`}>{heading}</h1>
    </div>
  );
}
