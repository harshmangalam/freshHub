/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

interface LinkButtonProps {
  name: string;
  href: string;
}
export default function LinkButton({ name, href }: LinkButtonProps) {
  return (
    <a href={href} className={tw`bg-gray-700 rounded-full px-4 py-2`}>
      {name}
    </a>
  );
}
