import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getApplications,
  deleteApplication,
  updateApplication,
} from '../services/applications.service';
import AddApplicationForm from '../components/AddApplicationForm';
import StatsChart from '../components/StatsChart';
import KanbanBoard from '../components/KanbanBoard';
import type { Application } from '../types';
import logo from '../assets/devtrack.svg';
import { LogOut, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<'kanban' | 'stats'>('kanban');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch {
      console.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (application: Application) => {
    setApplications([application, ...applications]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await deleteApplication(id);
      setApplications(applications.filter((app) => app.id !== id));
    } catch {
      console.error('Failed to delete application');
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateApplication(id, { status });
      setApplications(
        applications.map((app) =>
          app.id === id
            ? { ...app, status: status as Application['status'] }
            : app
        )
      );
    } catch {
      console.error('Failed to update application');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
     {/* Navbar */}
<nav className="bg-white shadow-sm px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-10">
  <img src={logo} alt="DevTrack" className="h-8 md:h-10" />
  <div className="flex items-center gap-2 md:gap-4">
    <span className="text-gray-600 text-sm hidden md:block">
      Hey, {user?.name}!
    </span>
    <button
  onClick={handleLogout}
  className="flex items-center gap-2 text-sm bg-red-50 text-red-600 px-3 md:px-4 py-2 rounded-lg hover:bg-red-100 transition"
>
  <LogOut size={14} />
  <span className="hidden md:block">Logout</span>
</button>
  </div>
</nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
      {/* Header */}
<div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
  <div>
    <h2 className="text-2xl font-bold text-gray-800">
      My Applications
    </h2>
    <p className="text-gray-500 text-sm mt-1">
      {applications.length} application
      {applications.length !== 1 ? 's' : ''} tracked
    </p>
  </div>
  <div className="flex items-center gap-3">
    <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
    <button
  onClick={() => setView('kanban')}
  className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
    view === 'kanban'
      ? 'bg-white text-blue-600 shadow-sm font-semibold'
      : 'text-gray-500 hover:text-gray-700'
  }`}
>
  Board
</button>
<button
  onClick={() => setView('stats')}
  className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
    view === 'stats'
      ? 'bg-white text-blue-600 shadow-sm font-semibold'
      : 'text-gray-500 hover:text-gray-700'
  }`}
>
  Stats
</button>
    </div>
    <button
  onClick={() => setShowForm(true)}
  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
>
  <Plus size={16} />
  <span className="hidden md:block">Add Application</span>
  <span className="md:hidden">Add</span>
</button>
  </div>
</div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
  {['applied', 'interview', 'offer', 'rejected'].map((status) => (
    <div
      key={status}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
    >
      <p className="text-gray-500 text-xs capitalize">{status}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">
        {applications.filter((a) => a.status === status).length}
      </p>
    </div>
  ))}
</div>

        {/* Content */}
        {loading ? (
          <div className="text-center text-gray-500 py-20">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-lg">No applications yet</p>
            <p className="text-sm mt-2">
              Click "Add Application" to get started
            </p>
          </div>
        ) : view === 'stats' ? (
          <StatsChart applications={applications} />
        ) : (
          <KanbanBoard
            applications={applications}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Add Application Modal */}
      {showForm && (
        <AddApplicationForm
          onAdd={handleAdd}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;