import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ChatListProps {
  onSelect: () => void; // Fungsi untuk memilih chat
}

export default function ChatList({ onSelect }: ChatListProps) {
  return (
    <>
      <div className="w-full">{/* <Separator className="mt-2" /> */}</div>
      <div
        className="flex flex-row mt-3"
        onClick={onSelect}
      >
        <div>
          <Image
            src="/logo/chatlogo.png"
            width={51}
            height={34}
            alt="logo"
            className="h-max w-max"
          />
        </div>
        <div className="ml-3">
          <div className="text-primary-blue">19104035 - Fariz Maulana</div>
          <div>
            <h3 className="font-bold">User:</h3>
          </div>
          <div>
            <h3>Lorem, ipsum dolor sit amet consectetur</h3>
          </div>
        </div>
        <div className="ml-3">Januari, 23 2023</div>
      </div>
      <Separator className="my-2" />
    </>
  );
}
