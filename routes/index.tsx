/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Home() {
  return (
    <div className={tw`h-screen bg-gray-900 text-gray-100`}>
      <nav className={tw`flex justify-between items-center h-16 bg-gray-800 px-4`}>
        <div className={tw`flex items-center space-x-3`}>
          <img
            src="favicon.ico"
            alt="FreshLogo"
            className={tw`w-10 h-10 object-fit`}
          />
          <h1 className={tw`font-bold text-2xl`}>FreshHub</h1>
        </div>
      </nav>
      
    </div>
  );
}
