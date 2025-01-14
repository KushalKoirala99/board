import { useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Todo } from "./component/Todo";


type Task = {
  id: number;
  title: string;
  tasks: { id: number; text: string; }[]
}
function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [columns, setColumns] = useState<{ id: string; title: string; tasks: Task[] }[]>([
    { id: "todo-1", title: "Todo 1", tasks: [] },
    { id: "in-progress", title: "In Progress", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ]);
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddColumn = () => {
    if (newColumnTitle.trim() === "") return;
    const newColumn = {
      id: `column-${Date.now()}`,
      title: newColumnTitle,
      tasks: [],
    };
    setColumns((prev) => [...prev, newColumn]);
    setNewColumnTitle("");
  };

  const handleDeleteColumn = (columnTitle: string) => {
    setColumns((prevColumns) => prevColumns.filter((col) => col.title !== columnTitle))
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const [sourceColumnId, taskId] = active.id.toString().split(":");
    const destinationColumnId = over.id;

    if (sourceColumnId !== destinationColumnId) {
      setColumns((prevColumns) => {
        const sourceColumn = prevColumns.find((col) => col.id === sourceColumnId)!;
        // const destinationColumn = prevColumns.find((col) => col.id === destinationColumnId)!;
        const task = sourceColumn.tasks.find((t) => t.id === Number(taskId));

        if (!task) return prevColumns;

        return prevColumns.map((col) => {
          if (col.id === sourceColumnId) {
            return { ...col, tasks: col.tasks.filter((t) => t.id !== Number(taskId)) };
          }
          if (col.id === destinationColumnId) {
            return { ...col, tasks: [...col.tasks, task] };
          }
          return col;
        });
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex-col h-screen overflow-hidden">
        <div className="p-6 flex justify-end gap-5">
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search tasks..."
              className="p-3 border rounded-md"
            />
          </div>
          <div>
            <input
              type="text"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="New column title..."
              className="p-3 border rounded-md"
            />
            <button onClick={handleAddColumn} className="bg-green-500 text-white px-3 py-2 ml-2">
              Add Column
            </button>
          </div>
        </div>

        <div className="flex h-[600px] gap-6 overflow-x-hidden overflow-y-auto px-6 pb-6">
          <SortableContext items={columns.map((col) => col.id)} strategy={horizontalListSortingStrategy}>
            {columns.map((col) => (
              <div key={col.id} className="relative">
                <div className="absolute top-2 right-4">
                  <button
                    onClick={() => handleDeleteColumn(col.title)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Column"
                  >
                    ✕
                  </button>
                </div>
                <Todo key={col.id} id={col.id} column={col} searchQuery={searchQuery} />
              </div>
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}
export default App;
