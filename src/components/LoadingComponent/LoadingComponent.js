import React from 'react';

const LoadingComponent = () => {
    return (
        <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center">
            <div className="text-center">
                <div className="mb-4">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
                <h1 className="text-3xl font-bold text-red-600 mb-2">Loading</h1>
                <p className="text-gray-600">
                    Please wait while we prepare your blood donation experience
                </p>
            </div>
            <div className="mt-8 flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce delay-200"></div>
            </div>
        </div>
    );
};

export default LoadingComponent;