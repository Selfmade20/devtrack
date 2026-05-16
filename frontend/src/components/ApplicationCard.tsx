import { Trash2, DollarSign, Calendar, Send, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import type { Application } from '../types';

interface Props {
  application: Application;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  hideStatusDropdown?: boolean;
}

const statusColors: Record<string, string> = {
  applied: 'bg-blue-100 text-blue-700',
  interview: 'bg-yellow-100 text-yellow-700',
  offer: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const statusIcons: Record<string, React.ReactNode> = {
  applied: <Send size={10} />,
  interview: <MessageSquare size={10} />,
  offer: <CheckCircle size={10} />,
  rejected: <XCircle size={10} />,
};

const ApplicationCard = ({
  application,
  onDelete,
  onStatusChange,
  hideStatusDropdown,
}: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition group">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">
            {application.company}
          </h3>
          <p className="text-gray-500 text-xs truncate">{application.role}</p>
        </div>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ml-2 shrink-0 flex items-center gap-1 ${statusColors[application.status]}`}
        >
          {statusIcons[application.status]}
          {application.status.charAt(0).toUpperCase() +
            application.status.slice(1)}
        </span>
      </div>

      {application.salary && (
        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
          <DollarSign size={11} className="text-gray-400" />
          R{application.salary}/month
        </p>
      )}

      <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
        <Calendar size={11} />
        {new Date(application.appliedDate).toLocaleDateString()}
      </p>

      <div className="flex gap-2">
        {!hideStatusDropdown && (
          <select
            value={application.status}
            onChange={(e) => onStatusChange(application.id, e.target.value)}
            className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        )}
        <button
          onClick={() => onDelete(application.id)}
          className="flex items-center gap-1 text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
        >
          <Trash2 size={11} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;