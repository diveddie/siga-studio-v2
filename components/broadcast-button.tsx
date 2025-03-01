import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/components/translations-context";

interface BroadcastButtonProps {
  isSessionActive: boolean
  onClick: () => void
}

export function BroadcastButton({ isSessionActive, onClick }: BroadcastButtonProps) {
  const { t } = useTranslations();
  return (
    <Button
      variant={isSessionActive ? "destructive" : "default"}
      className="w-full py-6 text-lg font-medium flex items-center justify-center gap-2"
      onClick={onClick}
    >
      {isSessionActive && (
        <Badge variant="secondary" className="animate-pulse bg-red-100 text-red-700">
          {t('broadcast.live')}
        </Badge>
      )}
      {isSessionActive ? (
        <>
          {t('broadcast.end')}
          <kbd className="ml-2 inline-flex items-center gap-1 rounded border px-2 font-mono text-xs">
            <span className="text-xs">⌘</span>B
          </kbd>
        </>
      ) : (
        <>
          {t('broadcast.start')}
          <kbd className="ml-2 inline-flex items-center gap-1 rounded border px-2 font-mono text-xs">
            <span className="text-xs">⌘</span>B
          </kbd>
        </>
      )}
    </Button>
  )
} 
