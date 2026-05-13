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

const ApplicationCard = ({
  application,
  onDelete,
  onStatusChange,
  hideStatusDropdown,
}: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">
            {application.company}
          </h3>
          <p className="text-gray-500 text-sm">{application.role}</p>
        </div>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[application.status]}`}
        >
          {application.status.charAt(0).toUpperCase() +
            application.status.slice(1)}
        </span>
      </div>

      {application.salary && (
        <p className="text-sm text-gray-600 mb-3">
          💰 R{application.salary}/month
        </p>
      )}

      <p className="text-xs text-gray-400 mb-4">
        Applied: {new Date(application.appliedDate).toLocaleDateString()}
      </p>

      <div className="flex gap-2">
        {!hideStatusDropdown && (
          <select
            value={application.status}
            onChange={(e) => onStatusChange(application.id, e.target.value)}
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        )}

        <button
          onClick={() => onDelete(application.id)}
          className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;