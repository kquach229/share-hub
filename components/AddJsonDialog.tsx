"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";

interface AddJsonDialogProps {
  onSave: (name: string, value: string) => Promise<void>;
}

const AddJsonDialog = ({ onSave }: AddJsonDialogProps) => {
  const [quoteName, setQuoteName] = useState("");
  const [quote, setQuote] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSave = async () => {
    await onSave(quoteName, quote);
    setQuote("");
    setQuoteName("");
    setOpenModal(false);
  };

  return (
    <Dialog onOpenChange={setOpenModal} open={openModal}>
      <DialogTrigger>
        <Button className="w-full sm:w-auto">Add Worthy Quotes</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Quote Editor</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Edit and save your quote
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-sm sm:text-base">Worthy Quote Author</Label>
            <Input
              value={quoteName}
              onChange={(e) => setQuoteName(e.target.value)}
              className="rounded-sm"
              placeholder="Enter Author"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-sm sm:text-base">Worthy Quote</Label>

            <Textarea
              placeholder="Enter Quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full sm:w-auto">
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleSave}
            disabled={!quoteName || !quote}
            className="w-full sm:w-auto"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddJsonDialog;
