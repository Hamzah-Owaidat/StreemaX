import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function Actions({ onEdit, onDelete }: ActionsProps) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {/* Edit button */}
      <Button
        size="icon"
        variant="ghost"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md w-8 h-8"
        onClick={onEdit}
      >
        <Pencil className="w-4 h-4" />
      </Button>

      {/* Delete button */}
      <Button
        size="icon"
        variant="ghost"
        className="bg-red-500 hover:bg-red-600 text-white rounded-md w-8 h-8"
        onClick={onDelete}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
}
