import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 bg-curio-terracotta rounded-full mb-4"></div>
        <div className="h-4 w-24 bg-slate-100 rounded"></div>
      </div>
    </div>
  );
}