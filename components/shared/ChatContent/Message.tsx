import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Message() {
  return (
    <>
      <div className="p-4 space-y-4">
        {/* Message 1 - Right Side (Your Message) */}
        <div className="flex justify-end">
          <div className="bg-purple-100 text-purple-800 p-3 rounded-lg max-w-xs shadow-md">
            <p>
              No worries. It will be completed ASAP. I've asked him yesterday.
            </p>
            <span className="block text-right text-xs text-gray-500">
              19:32
            </span>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          Today June 09, 2021
        </div>

        {/* Message 2 - Left Side (Other's Message) */}
        <div className="flex justify-start">
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg max-w-xs shadow-md">
            <p>
              Hello Obaidullah, I will be your case advisor for case #029290. I
              have assigned some homework for you to fill. Please keep up with
              the due dates. Should you have any questions, you can message me
              anytime. Thanks.
            </p>
            <div>
              <span className="block text-right text-xs text-gray-500">
                19:32
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t bg-white flex items-center space-x-2">
        <Input
          type="text"
          placeholder="pesan"
          className="flex-1"
        />
        <Button
          type="submit"
          className="bg-primary-blue"
        >
          Subscribe
        </Button>
      </div>
    </>
  );
}
