"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import JsonDataTable from "./JsonDataTable";
import AddJsonDialog from "./AddJsonDialog";

const JsonEditor = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = async (quoteName: string, quote: string) => {
    const response = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: quoteName,
        content: quote,
      }),
    });

    if (response.ok) {
      setRefreshKey((previousValue) => previousValue + 1);
    } else {
      console.error("Something went wrong");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-lg sm:text-2xl">
            Save Worthy Data
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            View and share your saved Worthy Data
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {/* Ensure the table scrolls horizontally on smaller screens */}
          <JsonDataTable key={refreshKey} />
        </CardContent>
        <CardFooter className="flex justify-center sm:justify-end">
          <AddJsonDialog onSave={handleSave} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default JsonEditor;
