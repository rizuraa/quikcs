import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { SearchIcon, XIcon } from "lucide-react";
import ChatList from "./ChatContent/ChatList";
import Message from "./ChatContent/Message";
import { ChevronLeftIcon } from "lucide-react";

export default function ChatContent() {
  const [activeComponent, setActiveComponent] = useState("ChatList");
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleBack = () => {
    setActiveComponent("ChatList");
  };

  const handleSelect = () => {
    setActiveComponent("message");
  };

  const handlePopoverChange = (open: boolean) => {
    if (open) {
      setActiveComponent("ChatList");
    }
    setPopoverOpen(open);
  };

  const renderComponent = () => {
    if (activeComponent === "message") {
      return <Message />;
    }
    return <ChatList onSelect={handleSelect} />;
  };

  return (
    <Popover
      open={popoverOpen}
      onOpenChange={handlePopoverChange}
    >
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
          onClick={() => handlePopoverChange(true)}
        >
          <Image
            src="/logo/chat.png"
            width={26}
            height={26}
            alt="popup"
            className="h-5 w-5"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-4 mr-7 bg-white shadow-lg rounded-lg relative"
        style={{ width: "600px", height: "400px" }}
      >
        <div className="flex flex-col h-full">
          {activeComponent === "message" && (
            <div className="flex items-center mb-2">
              <Button
                variant="outline"
                size="icon"
                className="border-none"
                onClick={handleBack}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <div className="ml-2 font-semibold">Message Title</div>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 border-none"
                onClick={() => handlePopoverChange(false)}
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
          )}
          <ScrollArea className="flex-1 overflow-auto">
            {activeComponent !== "message" && (
              <div className="w-full relative">
                <Input
                  type="search"
                  className="pl-8"
                />
                <SearchIcon className="absolute left-2.5 top-2.5 mb-5 text-gray-500 dark:text-gray-400 flex flex-end active:border-none" />
                <Separator className="mt-2" />
              </div>
            )}
            {renderComponent()}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
