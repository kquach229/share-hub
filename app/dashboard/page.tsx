import JsonEditor from "@/components/JsonEditor";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="my-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        Manage your data and share it with others
      </p>
      <div className="mt-10">
        <JsonEditor />
      </div>
    </div>
  );
};

export default DashboardPage;
