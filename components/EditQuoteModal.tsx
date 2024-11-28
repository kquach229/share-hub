import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { QuoteData } from "@prisma/client";

interface EditQuoteModalProps {
  quote: QuoteData;
  onClose: () => void;
  onSave: () => void;
}

const EditQuoteModal = ({ quote, onClose, onSave }: EditQuoteModalProps) => {
  const [name, setName] = useState(quote.name);
  const [content, setContent] = useState(quote.content);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/quote/${quote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
      });

      if (response.ok) {
        onSave(); // Refresh the data after successful update
        onClose();
      } else {
        console.error("Failed to update the quote.");
      }
    } catch (error) {
      console.error("Error updating quote:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Quote</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Quote Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter quote name"
            />
          </div>
          <div>
            <Label htmlFor="content">Quote Content</Label>
            <Input
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter quote content"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!name || !content}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuoteModal;
