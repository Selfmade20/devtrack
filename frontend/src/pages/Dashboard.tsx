import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getApplications,
  deleteApplication,
  updateApplication,
} from '../services/applications.service';
import AddApplicationForm from '../components/AddApplicationForm';
import ApplicationCard from '../components/ApplicationCard';
import type { Application } from '../types';
import logo from '../assets/devtrack.svg';
import KanbanBoard from '../components/KanbanBoard';


const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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
          app.id === id ? { ...app, status: status as Application['status'] } : app
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
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <div className="flex justify-center mb-6">
     <img src={logo} alt="DevTrack" className="h-20" />
      </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm">Hey, {user?.name}!</span>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              My Applications
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {applications.length} application
              {applications.length !== 1 ? 's' : ''} tracked
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            + Add Application
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {['applied', 'interview', 'offer', 'rejected'].map((status) => (
            <div key={status} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm capitalize">{status}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {applications.filter((a) => a.status === status).length}
              </p>
            </div>
          ))}
        </div>

        {/* Applications Grid */}
        {loading ? (
  <div className="text-center text-gray-500 py-20">Loading...</div>
) : applications.length === 0 ? (
  <div className="text-center text-gray-400 py-20">
    <p className="text-lg">No applications yet</p>
    <p className="text-sm mt-2">Click "Add Application" to get started</p>
  </div>
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