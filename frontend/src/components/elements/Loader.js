import react from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="loader">
            <p className="ml-4 text-lg">Authenticating With Google...</p>
          </div>
        </div>
    );
};

export default Loader;