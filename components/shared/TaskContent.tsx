import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import Task from "./TaskContent/Task";

export default function TaskContent() {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            className="bg-white rounded-full p-7 hover:bg-primary-blue flex items-center justify-center"
            style={{
              width: "auto",
              height: "auto",
              padding: "1rem",
              aspectRatio: "1/1",
            }}
          >
            <Image
              src="/logo/todo.png"
              width={26}
              height={26}
              alt="popup"
              className="h-5 w-5"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-4 mr-7 bg-white shadow-lg rounded-lg"
          style={{ width: "700px", height: "400px" }}
        >
          <ScrollArea className="h-full overflow-auto">
            <div className="flex flex-col space-y-4 h-full">
              <Task />
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  );
}
