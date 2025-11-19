import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

/**
 * A wrapper component that enforces authentication for its children.
 * If the user is not signed in, they are redirected to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  // 1. Show a loading state while Clerk is initializing or checking auth status
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-indigo-600 animate-pulse">
          Authenticating...
        </div>
      </div>
    );
  }

  // 2. If the user is signed in, render the protected component
  if (isSignedIn) {
    return children;
  }

  // 3. If not signed in, redirect to the login page
  // The 'replace' prop ensures the user can't navigate back to the protected page.
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;