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

const AddJsonDialog = () => {
  const [quoteName, setQuoteName] = useState("");
  const [quote, setQuote] = useState("");

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add JSON Data</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>JSON Editor</DialogTitle>
          <DialogDescription>Edit and save your JSON data</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>JSON Name</Label>
            <Input
              value={quoteName}
              onChange={(e) => setQuoteName(e.target.value)}
              className="rounded-sm"
              placeholder="Enter Quote Name"
            />
          </div>
          <div className="grid gap-2">
            <Label>JSON Data</Label>
            <Input
              placeholder="Enter Quote"
              type="text"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button>Close</Button>
          </DialogClose>
          <Button disabled={!quoteName || !quote}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddJsonDialog;
