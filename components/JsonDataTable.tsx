import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QuoteData } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { DeleteIcon, ShareIcon, EditIcon } from "lucide-react";
import EditQuoteModal from "./EditQuoteModal"; // Import the EditQuoteModal

const JsonDataTable = () => {
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingQuote, setEditingQuote] = useState<QuoteData | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/quote");
      const data = await response.json();
      setQuotes(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/quote/${id}`, { method: "DELETE" });
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting quote: ", error);
    }
  };

  const handleEdit = (quote: QuoteData) => {
    setEditingQuote(quote); // Open modal with selected quote
  };

  if (isLoading) {
    return "Loading...";
  }

  if (!quotes.length) {
    return (
      <div className="text-center text-gray">
        No data available, please add a new entry!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption className="text-sm text-gray-600">
          Your list of worthy items.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2 text-left">Name</TableHead>
            <TableHead className="w-1/4 text-left">Created At</TableHead>
            <TableHead className="w-1/4 text-right">
              <span className="sr-only">Share</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((quote) => (
            <TableRow key={quote.id} className="hover:bg-gray-50">
              <TableCell>{quote.name}</TableCell>
              <TableCell>
                {format(new Date(quote.createdAt), "MMMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/${quote.id}`}>
                  <ShareIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <EditIcon
                  onClick={() => handleEdit(quote)}
                  className="w-5 h-5 text-blue-500 hover:text-green-700 cursor-pointer"
                />
              </TableCell>
              <TableCell className="text-right">
                <DeleteIcon
                  onClick={() => handleDelete(quote.id)}
                  className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer ml-3"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* EditQuoteModal */}
      {editingQuote && (
        <EditQuoteModal
          quote={editingQuote}
          onClose={() => setEditingQuote(null)}
          onSave={() => fetchData()} // Refresh after save
        />
      )}
    </div>
  );
};

export default JsonDataTable;
