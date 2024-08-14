import React from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

export default function MainSearch() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon
            className="h-5 w-5 text-white"
            aria-hidden="true"
          />
        </div>
        <Input
          //   placeholder="search"
          className="bg-primary-blur rounded-none border-0"
        />
      </div>
    </>
  );
}
