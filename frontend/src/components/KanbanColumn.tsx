import { Droppable, Draggable } from '@hello-pangea/dnd';
import type { Application } from '../types';
import ApplicationCard from './ApplicationCard';

interface Props {
  status: string;
  title: string;
  applications: Application[];
  color: string;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

const KanbanColumn = ({
  status,
  title,
  applications,
  color,
  onDelete,
  onStatusChange,
}: Props) => {
  return (
    <div className="flex-1 min-w-[260px]">
      {/* Column Header */}
      <div className={`flex items-center gap-2 mb-4`}>
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <span className="ml-auto bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded-full">
          {applications.length}
        </span>
      </div>

      {/* Droppable area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] rounded-xl p-2 transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-gray-100'
            }`}
          >
            {applications.map((app, index) => (
              <Draggable key={app.id} draggableId={app.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-3 ${snapshot.isDragging ? 'opacity-80 rotate-1' : ''}`}
                  >
                    <ApplicationCard
                      application={app}
                      onDelete={onDelete}
                      onStatusChange={onStatusChange}
                      hideStatusDropdown
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {applications.length === 0 && (
              <div className="text-center text-gray-400 text-sm py-8">
                Drop here
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;