import { useLoadingStore } from "@/lib/stores/loading-store";
import ThreeDotsWave from "@/components/ui/three-dots-wave";

export const LoadingOverlay = () => {
  const { isGeneratingImage, isGeneratingMask, isInpainting } =
    useLoadingStore();

  const isLoading = isGeneratingImage || isGeneratingMask || isInpainting;

  if (!isLoading) return null;

  const getMessage = () => {
    if (isGeneratingImage) return "Generating image...";
    if (isGeneratingMask) return "Creating mask...";
    if (isInpainting) return "Inpainting image...";
    return "";
  };

  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center flex-col gap-2 rounded-lg z-10">
      <ThreeDotsWave />
      <p className="text-sm text-muted-foreground">{getMessage()}</p>
    </div>
  );
};
