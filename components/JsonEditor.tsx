import React from "react";
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Save JSON Data</CardTitle>
        <CardDescription>View and share your saved JSON Data</CardDescription>
      </CardHeader>
      <CardContent>
        <JsonDataTable />
      </CardContent>
      <CardFooter>
        <AddJsonDialog />
      </CardFooter>
    </Card>
  );
};

export default JsonEditor;
