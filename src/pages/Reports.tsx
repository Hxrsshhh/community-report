import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportCard from '../components/ReportCard';

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  location: {
    address: string;
    coordinates: [number, number];
  };
  images: string[];
  createdAt: string;
  author: {
    name: string;
  };
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication state
  const isAuthenticated = false;
  const user = null;

  const handleLogout = () => {
    console.log('Logout');
  };

  // Mock data
  const mockReports: Report[] = [
    {
      id: '1',
      title: 'Large pothole on Main Street',
      description: 'There is a significant pothole near the intersection of Main Street and Oak Avenue that poses a danger to vehicles and cyclists.',
      category: 'Road Maintenance',
      status: 'pending',
      location: {
        address: '123 Main Street, Downtown',
        coordinates: [40.7128, -74.0060]
      },
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
      createdAt: '2025-01-15T10:30:00Z',
      author: { name: 'John Smith' }
    },
    {
      id: '2',
      title: 'Broken streetlight in park',
      description: 'The streetlight near the playground in Central Park has been out for several days, making the area unsafe at night.',
      category: 'Lighting',
      status: 'in-progress',
      location: {
        address: 'Central Park, Near Playground',
        coordinates: [40.7589, -73.9851]
      },
      images: ['https://placehold.co/400x300'],
      createdAt: '2025-01-14T15:45:00Z',
      author: { name: 'Sarah Johnson' }
    },
    {
      id: '3',
      title: 'Graffiti on community center wall',
      description: 'Vandalism on the east wall of the community center needs to be cleaned up.',
      category: 'Vandalism',
      status: 'resolved',
      location: {
        address: '456 Community Drive',
        coordinates: [40.7505, -73.9934]
      },
      images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop'],
      createdAt: '2025-01-13T09:15:00Z',
      author: { name: 'Mike Davis' }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReports(mockReports);
      setFilteredReports(mockReports);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = reports;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(report => report.category === categoryFilter);
    }

    setFilteredReports(filtered);
  }, [reports, searchQuery, statusFilter, categoryFilter]);

  const categories = ['Road Maintenance', 'Lighting', 'Vandalism', 'Waste Management', 'Public Safety'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Reports</h1>
          <p className="text-gray-600">
            Browse and track community issues reported by your neighbors.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredReports.length} of {reports.length} reports
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map(report => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={() => console.log('View report:', report.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Reports;