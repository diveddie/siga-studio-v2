"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {

  const tools = [
    {
      name: "Generate Image",
      description: "Creates an AI-generated image from your text description",
      example: '"Generate an image of a sunset over mountains"',
    },
    {
      name: "Create Mask",
      description: "Creates a mask for image editing based on your description",
      example: '"Create a mask for the sky"',
    },
    {
      name: "Inpaint Image",
      description: "Modifies the masked area of an image",
      example: '"Change the sky to be stormy"',
    },
    {
      name: "Clear Mask",
      description: "Removes the current mask while keeping the image",
      example: '"Clear the mask"',
    },
    {
      name: "Restart Session",
      description: "Clears all images and masks",
      example: '"Restart the session"',
    },
    {
      name: "Party Mode",
      description: "Triggers a fun confetti animation",
      example: '"Start party mode"',
    },
    {
      name: "Theme Switch",
      description: "Toggles between light and dark theme",
      example: '"Switch the theme"',
    },
    {
      name: "Current Time",
      description: "Shows the current time in your timezone",
      example: '"What time is it?"',
    },
    {
      name: "Open Dialog",
      description: "Displays this help dialog",
      example: '"Show help"',
    },
    {
      name: "Close Dialog",
      description: "Closes this help dialog",
      example: '"Close help"',
    },
    {
      name: "Change Voice",
      description: "Changes the AI assistant's voice",
      example: '"Change voice to ash"',
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Available Commands & Tools</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Command</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.map((tool) => (
                <TableRow key={tool.name}>
                  <TableCell className="font-medium">{tool.name}</TableCell>
                  <TableCell>{tool.description}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {tool.example}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}