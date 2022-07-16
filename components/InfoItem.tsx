/** @jsx h */
import { h, VNode } from "preact";
import { tw } from "@twind";

interface InfoItemProps {
  icon: VNode;
  text: string;
}
export default function InfoItem({ text, icon }: InfoItemProps) {
  return (
    <div className={tw`flex items-center space-x-2`}>
      {icon}
      <p className={tw`text-gray-300`}>{text}</p>
    </div>
  );
}
