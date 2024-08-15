import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import NewTask from "./NewTask";
import { Loader2 } from "lucide-react";

interface Task {
  id: number;
  title: string;
  date: string | null;
  tbd: string | null;
  description: string | null;
  completed: boolean;
}

export default function Task() {
  const [filter, setFilter] = useState<string>("all");
  const [newTask, setNewTask] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch tasks from the API
    fetch("https://my-json-server.typicode.com/rizuraa/dummytask/task")
      .then((response) => response.json())
      .then((data: Task[]) => {
        setTasks(data.map((task) => ({ ...task, completed: false })));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, []);

  const handleAddTask = (task: Omit<Task, "id" | "completed">) => {
    const newTask: Task = {
      ...task,
      id: tasks.length + 1, // Generate new ID
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center items-center h-full"
        style={{ marginTop: "150px" }}
      >
        <Loader2 className="animate-spin" />
        <span className="ml-2 mt-2">Loading Task List</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">My Task</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={filter}
              onValueChange={setFilter}
            >
              <DropdownMenuRadioItem value="all">
                Personal Errands
              </DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioItem value="urgent">
                Urgent To-Do
              </DropdownMenuRadioItem>
              <DropdownMenuSeparator />
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={() => setNewTask(true)}>New Task</Button>
      </div>
      <div>
        <TaskList
          filter={filter}
          tasks={tasks}
          setTasks={setTasks}
        />
        <div className="mt-2">
          {newTask && <NewTask onAddTask={handleAddTask} />}
        </div>
      </div>
    </>
  );
}
