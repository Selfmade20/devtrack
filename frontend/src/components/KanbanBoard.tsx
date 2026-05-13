import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import type { Application } from '../types';
import KanbanColumn from './KanbanColumn';

interface Props {
  applications: Application[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

const columns = [
  { status: 'applied', title: 'Applied', color: 'bg-blue-500' },
  { status: 'interview', title: 'Interview', color: 'bg-yellow-500' },
  { status: 'offer', title: 'Offer', color: 'bg-green-500' },
  { status: 'rejected', title: 'Rejected', color: 'bg-red-500' },
];

const KanbanBoard = ({ applications, onDelete, onStatusChange }: Props) => {
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a column
    if (!destination) return;

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Status changed — update it
    if (destination.droppableId !== source.droppableId) {
      onStatusChange(draggableId, destination.droppableId);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            title={col.title}
            color={col.color}
            applications={applications.filter(
              (app) => app.status === col.status
            )}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;