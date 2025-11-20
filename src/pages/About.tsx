import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
  // Mock authentication state
  const isAuthenticated = false;
  const user = null;

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About CommunityReport</h1>
          <p className="text-xl text-gray-600">
            Ask Meku to generate content for this page.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 text-center">
            Coming soon...
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;