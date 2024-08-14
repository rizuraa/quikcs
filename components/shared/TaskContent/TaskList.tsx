import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Clock, MoreHorizontal, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

interface Task {
  id: number;
  title: string;
  date: string | null;
  tbd: string | null;
  description: string | null;
  completed: boolean;
}

interface TaskListProps {
  filter: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskList({ filter, tasks, setTasks }: TaskListProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const filteredTasks = tasks.filter((task) =>
    filter === "urgent" ? task.tbd !== null : true
  );

  const handleDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <>
      {filteredTasks.map((task) => (
        <Accordion
          key={task.id}
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem
            value={`item-${task.id}`}
            className="border-b border-gray-200"
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-gray-600"
                    checked={task.completed}
                    onChange={() => {
                      setTasks((prevTasks) =>
                        prevTasks.map((t) =>
                          t.id === task.id
                            ? { ...t, completed: !t.completed }
                            : t
                        )
                      );
                    }}
                  />
                  <span
                    className={`${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex items-center space-x-4">
                  {task.tbd && (
                    <span className="text-red-500 text-sm">{task.tbd}</span>
                  )}
                  <span className="text-gray-500 text-sm">{task.date}</span>
                </div>
                <AccordionTrigger className="flex items-center justify-between p-2 w-full text-left" />
                <DropdownMenu>
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
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <AccordionContent className="p-4 text-gray-700">
              <div className="ml-4 space-y-4">
                <div className="flex items-center">
                  <Clock className="mr-4" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center space-x-2"
                      >
                        <span>{task.date ? task.date : "Select Date"}</span>

                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        // Jika task.date ada, ubah menjadi objek Date dan gunakan sebagai tanggal yang dipilih
                        selected={task.date ? new Date(task.date) : undefined}
                        onDayClick={(date) => {
                          setSelectedDate(date);
                          // Update task date when a date is selected
                          const updatedTasks = tasks.map((t) =>
                            t.id === task.id
                              ? {
                                  ...t,
                                  date: date.toISOString().split("T")[0],
                                }
                              : t
                          );
                          setTasks(updatedTasks);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-start">
                  <Pencil className="h-6 w-6 mr-4 mt-1" />
                  <span className="leading-relaxed items-center ml-1">
                    {task.description || "No description available"}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
}
