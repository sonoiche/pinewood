import { useState } from "react";
import Sidebar from "../Core/Sidebar";

const AuthenticatedLayout = ({title, children}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default AuthenticatedLayout;