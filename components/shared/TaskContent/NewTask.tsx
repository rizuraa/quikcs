import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Clock, MoreHorizontal, Pencil } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NewTaskProps {
  onAddTask: (task: {
    title: string;
    date: string | null;
    tbd: string | null;
    description: string | null;
  }) => void;
}

interface Task {
  id: number;
  title: string;
  date: string | null;
  tbd: string | null;
  description: string | null;
  completed: boolean;
}

export default function NewTask({ onAddTask }: NewTaskProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState<Date | null>(null);

  // Format date for displaying
  const formattedDate = date ? date.toISOString().split("T")[0] : "Select Date";

  const getNextId = (tasks: Task[]): number => {
    const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 3); // 3 karena ID dimulai dari 4
    return maxId + 1;
  };

  const handleSubmit = () => {
    const newTaskData = {
      id: getNextId([]), // Ganti dengan daftar tugas yang ada jika sudah ada

      title,
      date: date ? date.toISOString().split("T")[0] : null,
      tbd: null, // atau sesuai logika Anda
      description,
    };

    onAddTask(newTaskData); // Panggil onAddTask dengan data tugas baru
    // Reset form setelah submit
    setTitle("");
    setDate(null);
    setDescription("");
  };

  return (
    <>
      <div>
        <Accordion
          type="single"
          collapsible
          className="w-full hover:no-underline"
        >
          <AccordionItem
            value="item-1"
            className="border-b border-gray-200"
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-gray-600"
                  />
                  <Input
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row ">
                <AccordionTrigger className="flex items-center justify-between p-2 w-full text-left"></AccordionTrigger>
                <DropdownMenu
                  open={open}
                  onOpenChange={setOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-[200px]"
                  >
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <AccordionContent className="p-4 text-gray-700">
              <div className="ml-4 space-y-4">
                {/* Time and Calendar */}
                <div className="flex items-center">
                  <Clock className=" mr-4" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center space-x-2"
                      >
                        <span>{formattedDate}</span>
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date || undefined}
                        onDayClick={(date) => setDate(date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Text with Icon */}
                <div className="flex items-start">
                  <Pencil className="h-6 w-6 mr-4 mt-1" />
                  <Input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="space-x-2 border-none focus-visible:outline-none"
                  />
                </div>
              </div>
              <Button
                size="sm"
                className="mt-2 w-full"
                onClick={handleSubmit}
              >
                submit
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
