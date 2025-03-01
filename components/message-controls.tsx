import Transcriber from "@/components/ui/transcriber";
import { Conversation } from "@/lib/conversations";

export function MessageControls({
  conversation,
}: {
  conversation: Conversation[];
}) {

  if (conversation.length === 0) return null;

  return (
    <div className="flex-1">
      <div className="flex flex-col space-y-2 h-full">
        <Transcriber conversation={conversation} />
      </div>
    </div>
  );
}
