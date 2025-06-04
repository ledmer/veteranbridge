import React from "react";

const SidebarSkeleton = () => (
  <aside className="w-64 bg-gray-100 border-r h-full p-4 animate-pulse">
    <div className="h-6 w-32 bg-gray-300 rounded mb-6" />
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-5 w-full bg-gray-200 rounded" />
      ))}
    </div>
  </aside>
);

export default SidebarSkeleton;
