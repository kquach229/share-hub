"use client";

import { QuoteData } from "@prisma/client";
import React, { use, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SharedQuoteProps {
  params: Promise<{ id: string }>;
}

const SharedQuote = ({ params }: SharedQuoteProps) => {
  const [quoteData, setQuoteData] = useState<QuoteData>();
  const [isLoading, setIsLoading] = useState(true);
  const [copyFeedback, setCopyFeedback] = useState(false); // State for feedback
  const resolvedParams = use(params);

  const fetchQuote = async () => {
    try {
      const response = await fetch(`/api/quote/${resolvedParams.id}`);
      const data = await response.json();
      setQuoteData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching quote: ", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${quoteData?.content} - ${quoteData?.name}` || ""
    );
    setCopyFeedback(true); // Show feedback
    setTimeout(() => setCopyFeedback(false), 2000); // Hide feedback after 2 seconds
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (isLoading)
    return <div className="mt-5 text-gray-500 text-center">Loading...</div>;

  return (
    <div className="p-4 mt-[300px] max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 mt-2">
            {quoteData?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="text-lg text-gray-700 border-l-4 pl-4 italic">
            "{quoteData?.content}"
          </blockquote>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-400">
              Shared on:{" "}
              {new Date(quoteData?.createdAt ?? "").toLocaleDateString()}
            </p>
            <div className="flex items-center gap-2">
              <Button className="text-sm" onClick={handleCopy}>
                {copyFeedback ? "Copied!" : "Copy Quote"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SharedQuote;
