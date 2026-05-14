import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
  } from 'recharts';
  import type { Application } from '../types';
  
  interface Props {
    applications: Application[];
  }
  
  const COLORS = {
    applied: '#3b82f6',
    interview: '#f59e0b',
    offer: '#22c55e',
    rejected: '#ef4444',
  };
  
  const StatsChart = ({ applications }: Props) => {
    // Build bar chart data
    const barData = [
      {
        name: 'Applied',
        count: applications.filter((a) => a.status === 'applied').length,
        fill: COLORS.applied,
      },
      {
        name: 'Interview',
        count: applications.filter((a) => a.status === 'interview').length,
        fill: COLORS.interview,
      },
      {
        name: 'Offer',
        count: applications.filter((a) => a.status === 'offer').length,
        fill: COLORS.offer,
      },
      {
        name: 'Rejected',
        count: applications.filter((a) => a.status === 'rejected').length,
        fill: COLORS.rejected,
      },
    ];
  
    // Build pie chart data — only include statuses with count > 0
    const pieData = barData.filter((d) => d.count > 0);
  
    // Calculate response rate
    const responded = applications.filter(
      (a) => a.status === 'interview' || a.status === 'offer'
    ).length;
    const responseRate =
      applications.length > 0
        ? Math.round((responded / applications.length) * 100)
        : 0;
  
    // Calculate success rate
    const offers = applications.filter((a) => a.status === 'offer').length;
    const successRate =
      applications.length > 0
        ? Math.round((offers / applications.length) * 100)
        : 0;
  
    if (applications.length === 0) return null;
  
    return (
      <div className="mb-8">
        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Total Applications</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {applications.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Response Rate</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {responseRate}%
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Offer Rate</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {successRate}%
            </p>
          </div>
        </div>
  
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-4">
              Applications by Status
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
  
          {/* Pie Chart */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-4">
              Application Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="count"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend
                  formatter={(value) => (
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatsChart;