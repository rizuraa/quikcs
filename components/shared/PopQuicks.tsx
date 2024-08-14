"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import TaskContent from "./TaskContent";
import ChatContent from "./ChatContent";

export default function PopQuicks() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 flex items-center space-x-2">
        {expanded && (
          <>
            <div className="text-center">
              <div className="text-white mt-2">Task</div>
              <TaskContent />
            </div>
            {/* Inbox buton */}
            <div className="text-center">
              <div className="text-white mt-2">Inbox</div>
              <ChatContent />
            </div>
          </>
        )}
        <div className="text-center">
          <div className="text-white mt-2 text-transparent">Click Me</div>
          <Button
            onClick={toggleExpand}
            size="lg"
            className="bg-primary-blue rounded-full p-7 hover:bg-primary-blue flex items-center justify-center"
            style={{
              width: "auto",
              height: "auto",
              padding: "1rem",
              aspectRatio: "1/1",
            }}
          >
            <Image
              src="/logo/stroke.png"
              width={26}
              height={26}
              alt="popup"
              className="h-5 w-5"
            />
          </Button>
        </div>
      </div>
    </>
  );
}
