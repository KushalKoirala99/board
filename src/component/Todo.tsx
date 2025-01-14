import { useState } from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";

// type TodoProps = {
//   id: string;
//   column: { id: string; title: string; tasks: Task[] };
//   searchQuery: string;
// };

// type Task = {
//     id: number;
//     title: string;
//     tasks: { id: number; text: string; }[]
//   }

// export const Todo = ({ id, column, searchQuery }: TodoProps) => {
//   const [newTask, setNewTask] = useState<string>("");

//   const { setNodeRef: setDroppableRef } = useDroppable({
//     id: column.id,
//   });

//   const filteredTasks = column.tasks.filter((task) =>
//     task.text.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAddTask = () => {
//     if (newTask.trim() === "") return;
//     const newTaskObj = { id: Date.now(), text: newTask };
//     column.tasks.push(newTaskObj); // Update local tasks array
//     setNewTask("");
//   };

//   return (
//     <div ref={setDroppableRef} className="bg-white shadow-lg p-4 rounded-lg w-[300px] h-[550px] ">
//       <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
//       <div className="flex space-x-4 mb-4">
//         <input
//           type="text"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           placeholder="Add task"
//           className="p-2 border rounded-md flex-1"
//         />
//         <button onClick={handleAddTask} className="bg-blue-500 text-white px-3 py-2">
//           Add
//         </button>
//       </div>

//       <ul className="space-y-2">
//         {filteredTasks.map((task) => (
//           <Task key={task.id} task={task} columnId={id} />
//         ))}
//       </ul>
//     </div>
//   );
// };


type TodoProps = {
  id: string;
  column: { id: string; title: string; tasks: Task[] };
  searchQuery: string;
};

type Task = {
  id: number;
  title: string;
  tasks: { id: number; text: string; }[];
};

export const Todo = ({ id, column, searchQuery }: TodoProps) => {
  const [newTask, setNewTask] = useState<string>("");

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: column.id,
  });

  const filteredTasks = column.tasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = { id: Date.now(), text: newTask };
    column.tasks.push(newTaskObj); // Update local tasks array
    setNewTask("");
  };

  return (
    <motion.div
      ref={setDroppableRef}
      className="bg-white shadow-lg p-4 rounded-lg w-[300px] h-[550px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add task"
          className="p-2 border rounded-md flex-1"
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white px-3 py-2">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} columnId={id} />
        ))}
      </ul>
    </motion.div>
  );
};


type TaskProps = {
    task: { id: number; text: string };
    columnId: string;
  };
  
  const Task = ({ task, columnId }: TaskProps) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: `${columnId}:${task.id}`,
    });
  
    return (
      <motion.li
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="p-2 bg-gray-100 rounded-md shadow-sm"
        initial={{ opacity: 1 }}
        animate={{ opacity: isDragging ? 0.5 : 1 }}  // Fading effect when dragging
        transition={{ duration: 0.2 }}  // Smooth transition
        style={{
          // Adding an optional smooth transition effect for the dragged task
          cursor: isDragging ? "grabbing" : "pointer",
          boxShadow: isDragging ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none", // Shadow effect when dragging
        }}
      >
        {task.text}
      </motion.li>
    );
  };