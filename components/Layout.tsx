/** @jsx h */
import { ComponentChildren, h } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";

export default function Layout({
  children,
  title,
}: {
  children: ComponentChildren;
  title: string;
}) {
  return (
    <div className={tw`h-screen bg-gray-900 text-gray-100`}>
      {/* navbar */}
      <Head>
        <title>{title}</title>
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

      <main className={tw`container mx-auto px-4 py-8`}>{children}</main>

      {/* footer */}
    </div>
  );
}
