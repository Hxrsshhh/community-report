import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  // Mock authentication state
  const isAuthenticated = false;
  const user = null;

  const handleLogout = () => {
    // Mock logout functionality
    console.log('Logout');
  };

  const stats = [
    { label: 'Reports Submitted', value: '2,847', icon: MapPin },
    { label: 'Issues Resolved', value: '1,923', icon: CheckCircle },
    { label: 'Active Users', value: '15,432', icon: Users },
    { label: 'Response Rate', value: '87%', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Report Issues,
                  <br />
                  <span className="text-blue-200">Build Community</span>
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Help improve your neighborhood by reporting local problems. 
                  From potholes to broken streetlights, your voice matters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/submit"
                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Submit a Report
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/reports"
                    className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    View Reports
                  </Link>
                </div>
              </div>
              <div className="relative">
                <img
                  src=""
                  alt="Community collaboration"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform makes it easy to report community issues and track their resolution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Report an Issue
                </h3>
                <p className="text-gray-600">
                  Describe the problem, add photos, and pinpoint the exact location on our interactive map.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Community Review
                </h3>
                <p className="text-gray-600">
                  Other community members can view, support, and add additional information to your report.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Get Results
                </h3>
                <p className="text-gray-600">
                  Track the progress of your report and receive updates when the issue is resolved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of community members who are actively working to improve their neighborhoods.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;