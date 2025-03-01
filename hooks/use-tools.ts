"use client";

import { toast } from "sonner";
import confetti from "canvas-confetti";
import { animate as framerAnimate } from "framer-motion";
import { useTranslations } from "@/components/translations-context";
import FirecrawlApp, { ScrapeResponse } from "@mendable/firecrawl-js";
import { useImageStore } from "@/lib/stores/image-store";
import { useLoadingStore } from '@/lib/stores/loading-store';
import { useState } from 'react';

export const useToolsFunctions = (setVoice: (voice: string) => void) => {
  const { t } = useTranslations();
  const { setGeneratingImage, setGeneratingMask, setInpainting } = useLoadingStore();

  const [showHelpDialog, setShowHelpDialog] = useState(false);

  const timeFunction = () => {
    const now = new Date();
    return {
      success: true,
      time: now.toLocaleTimeString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      message:
        t("tools.time") +
        now.toLocaleTimeString() +
        " in " +
        Intl.DateTimeFormat().resolvedOptions().timeZone +
        " timezone.",
    };
  };

  const backgroundFunction = () => {
    try {
      const html = document.documentElement;
      const currentTheme = html.classList.contains("dark") ? "dark" : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      html.classList.remove(currentTheme);
      html.classList.add(newTheme);

      toast(`Switched to ${newTheme} mode! 🌓`, {
        description: t("tools.switchTheme") + newTheme + ".",
      });

      return {
        success: true,
        theme: newTheme,
        message: t("tools.switchTheme") + newTheme + ".",
      };
    } catch (error) {
      return {
        success: false,
        message: t("tools.themeFailed") + ": " + error,
      };
    }
  };

  const partyFunction = () => {
    try {
      const duration = 5 * 1000;
      const colors = [
        "#a786ff",
        "#fd8bbc",
        "#eca184",
        "#f8deb1",
        "#3b82f6",
        "#14b8a6",
        "#f97316",
        "#10b981",
        "#facc15",
      ];

      const confettiConfig = {
        particleCount: 30,
        spread: 100,
        startVelocity: 90,
        colors,
        gravity: 0.5,
      };

      const shootConfetti = (
        angle: number,
        origin: { x: number; y: number }
      ) => {
        confetti({
          ...confettiConfig,
          angle,
          origin,
        });
      };

      const animate = () => {
        const now = Date.now();
        const end = now + duration;

        const elements = document.querySelectorAll(
          "div, p, button, h1, h2, h3"
        );
        elements.forEach((element) => {
          framerAnimate(
            element,
            {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            },
            {
              duration: 0.5,
              repeat: 10,
              ease: "easeInOut",
            }
          );
        });

        const frame = () => {
          if (Date.now() > end) return;
          shootConfetti(60, { x: 0, y: 0.5 });
          shootConfetti(120, { x: 1, y: 0.5 });
          requestAnimationFrame(frame);
        };

        const mainElement = document.querySelector("main");
        if (mainElement) {
          mainElement.classList.remove(
            "bg-gradient-to-b",
            "from-gray-50",
            "to-white"
          );
          const originalBg = mainElement.style.backgroundColor;

          const changeColor = () => {
            const now = Date.now();
            const end = now + duration;

            const colorCycle = () => {
              if (Date.now() > end) {
                framerAnimate(
                  mainElement,
                  { backgroundColor: originalBg },
                  { duration: 0.5 }
                );
                return;
              }
              const newColor =
                colors[Math.floor(Math.random() * colors.length)];
              framerAnimate(
                mainElement,
                { backgroundColor: newColor },
                { duration: 0.2 }
              );
              setTimeout(colorCycle, 200);
            };

            colorCycle();
          };

          changeColor();
        }

        frame();
      };

      animate();
      toast.success(t("tools.partyMode.toast") + " 🎉", {
        description: t("tools.partyMode.description"),
      });
      return { success: true, message: t("tools.partyMode.success") + " ��" };
    } catch (error) {
      return {
        success: false,
        message: t("tools.partyMode.failed") + ": " + error,
      };
    }
  };

  const sparkleFunction = () => {
    try {
      const mainElement = document.querySelector("main");
      if (!mainElement) {
        return {
          success: false,
          message: "Could not find main element to add sparkles to",
        };
      }

      const createSparkle = () => {
        const sparkle = document.createElement("div");
        sparkle.style.position = "absolute";
        sparkle.style.pointerEvents = "none";
        sparkle.style.width = "10px";
        sparkle.style.height = "10px";
        sparkle.style.backgroundColor = "white";
        sparkle.style.borderRadius = "50%";

        // Random position within main element
        const rect = mainElement.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        mainElement.appendChild(sparkle);

        // Animate sparkle
        framerAnimate(
          sparkle,
          {
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: y - 100,
          },
          {
            duration: 1,
            ease: "easeOut",
          }
        ).then(() => sparkle.remove());
      };

      // Create multiple sparkles
      const sparkleCount = 50;
      let sparklesCreated = 0;

      const createSparkles = () => {
        if (sparklesCreated >= sparkleCount) return;
        createSparkle();
        sparklesCreated++;
        setTimeout(createSparkles, 50);
      };

      createSparkles();

      toast.success(t("tools.sparkleMode.toast") + " ✨", {
        description: t("tools.sparkleMode.description"),
      });

      return {
        success: true,
        message: t("tools.sparkleMode.success") + " ✨",
      };
    } catch (error) {
      return {
        success: false,
        message: t("tools.sparkleMode.failed") + ": " + error,
      };
    }
  };

  const launchWebsite = ({ url }: { url: string }) => {
    window.open(url, "_blank");
    toast(t("tools.launchWebsite") + " 🌐", {
      description:
        t("tools.launchWebsiteSuccess") +
        url +
        ", tell the user it's been launched.",
    });
    return {
      success: true,
      message: `Launched the site${url}, tell the user it's been launched.`,
    };
  };

  const copyToClipboard = ({ text }: { text: string }) => {
    navigator.clipboard.writeText(text);
    toast(t("tools.clipboard.toast") + " 📋", {
      description: t("tools.clipboard.description"),
    });
    return {
      success: true,
      text,
      message: t("tools.clipboard.success"),
    };
  };

  const scrapeWebsite = async ({ url }: { url: string }) => {
    const apiKey = process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY;
    try {
      const app = new FirecrawlApp({ apiKey: apiKey });
      const scrapeResult = (await app.scrapeUrl(url, {
        formats: ["markdown", "html"],
      })) as ScrapeResponse;

      if (!scrapeResult.success) {
        console.log(scrapeResult.error);
        return {
          success: false,
          message: `Failed to scrape: ${scrapeResult.error}`,
        };
      }

      toast.success(t("tools.scrapeWebsite.toast") + " 📋", {
        description: t("tools.scrapeWebsite.success"),
      });

      return {
        success: true,
        message:
          "Here is the scraped website content: " +
          JSON.stringify(scrapeResult.markdown) +
          "Summarize and explain it to the user now in a response.",
      };
    } catch (error) {
      return {
        success: false,
        message: `Error scraping website: ${error}`,
      };
    }
  };

  const generateImage = async ({
    prompt,
    guidance = 3.5,
  }: {
    prompt: string;
    guidance?: number;
  }) => {
    setGeneratingImage(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, guidance }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        toast.error(t("tools.generateImage.error"));
        return {
          success: false,
          message: `Failed to generate image: ${data.error || "Unknown error"}`,
        };
      }

      // Store the image URL in our Zustand store
      useImageStore.getState().addImage(Date.now().toString(), data[0].url);

      return {
        success: true,
        imageUrl: data[0].url,
        message:
          "I've generated an image based on your prompt. You can see it displayed to the left",
      };
    } catch (error) {
      return {
        success: false,
        message: `Error generating image: ${error}`,
      };
    } finally {
      setGeneratingImage(false);
    }
  };

  const createImageMask = async ({ prompt }: { prompt: string }) => {
    setGeneratingMask(true);
    try {
      // Get the latest image from Zustand store
      const imageUrl = useImageStore.getState().getLatestImage();

      if (!imageUrl) {
        return {
          success: false,
          message:
            "No image found to generate mask from. Please generate an image first.",
        };
      }

      const response = await fetch("/api/generate-mask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: imageUrl,
          prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        toast.error("Failed to generate mask");
        return {
          success: false,
          message: `Failed to generate mask: ${data.error || "Unknown error"}`,
        };
      }

      // Store the mask in Zustand
      const timestamp = Date.now();
      useImageStore.getState().addImage(`mask-${timestamp}`, data.url);

      return {
        success: true,
        maskUrl: data.url,
        message:
          "I've generated a mask for the specified objects in the image. You can see it displayed to the left.",
      };
    } catch (error) {
      return {
        success: false,
        message: `Error generating mask: ${error}`,
      };
    } finally {
      setGeneratingMask(false);
    }
  };

  const inpaintImage = async ({ prompt }: { prompt: string }) => {
    setInpainting(true);
    try {
      const imageUrl = useImageStore.getState().getLatestImage();
      const maskUrl = useImageStore.getState().getLatestMask();

      const response = await fetch("/api/inpaint-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          maskUrl,
          prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        toast.error("Failed to inpaint image");
        return {
          success: false,
          message: `Failed to inpaint image: ${data.error || "Unknown error"}`,
        };
      }

      // Clear existing images and masks by creating a new empty state
      useImageStore.setState({ images: {} });

      // Add only the new inpainted image
      useImageStore.getState().addImage(Date.now().toString(), data.url);

      return {
        success: true,
        imageUrl: data.url,
        message:
          "I've inpainted the image based on your prompt. You can see it displayed to the left.",
      };
    } catch (error) {
      return {
        success: false,
        message: `Error inpainting image: ${error}`,
      };
    } finally {
      setInpainting(false);
    }
  };

  const restartSession = () => {
    try {
      // Clear all images and masks by resetting the store to empty state
      useImageStore.setState({ images: {} });

      toast.success(t("tools.restartSession.toast") || "Session restarted!", {
        description: t("tools.restartSession.description") || "All images and masks have been cleared.",
      });

      return {
        success: true,
        message: "Session has been restarted. All previous images and masks have been cleared.",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to restart session: ${error}`,
      };
    }
  };

  const clearMask = () => {
    try {
      useImageStore.getState().clearMasks();

      toast.success(t("tools.clearMask.toast") || "Mask cleared!", {
        description: t("tools.clearMask.description") || "The mask has been removed while keeping the original image.",
      });

      return {
        success: true,
        message: "The mask has been cleared. The original image remains unchanged.",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to clear mask: ${error}`,
      };
    }
  };

  const showHelp = () => {
    try {
      setShowHelpDialog(true);

      return {
        success: true,
        message: "I've opened the help dialog that shows all available commands and tools.",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to show help: ${error}`,
      };
    }
  };

  const closeHelp = () => {
    try {
      setShowHelpDialog(false);

      return {
        success: true,
        message: "I've closed the help dialog.",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to close help dialog: ${error}`,
      };
    }
  };

  const changeVoice = ({ voice }: { voice: string }) => {
    try {
      if (!['ash', 'ballad', 'coral', 'sage', 'verse'].includes(voice)) {
        return {
          success: false,
          message: `Invalid voice selection. Available voices are: ash, ballad, coral, sage, verse.`
        };
      }

      setVoice(voice);

      return {
        success: true,
        message: `Voice changed to ${voice}.`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to change voice: ${error}`,
      };
    }
  };

  const explainSiga = () => {
    return {
      success: true,
      message: `Here's how to use Siga Studio for image generation and editing:

1. Generate an Image:
   - Start by saying "Generate an image of..." followed by your description
   - For example: "Generate an image of a cozy cabin in the woods at sunset"
   - The AI will create your image based on the description

2. Create a Mask:
   - Once you have an image, say "Create a mask for..." followed by what you want to change
   - For example: "Create a mask for the cabin" or "Create a mask for the trees"
   - This will highlight the area you want to modify

3. Inpaint the Image:
   - Finally, say "Inpaint the image to..." followed by your desired changes
   - For example: "Inpaint the image to make the cabin modern and metallic"
   - The AI will modify only the masked area while keeping the rest of the image intact

Tips:
- Be specific in your descriptions for better results
- You can create multiple masks and inpaint multiple times
- Use "Clear mask" to remove the current mask
- Use "Restart session" to start over with a fresh canvas

Would you like me to help you create something specific?`
    };
  };

  return {
    timeFunction,
    backgroundFunction,
    partyFunction,
    sparkleFunction,
    launchWebsite,
    copyToClipboard,
    scrapeWebsite,
    generateImage,
    createImageMask,
    inpaintImage,
    restartSession,
    clearMask,
    showHelp,
    closeHelp,
    showHelpDialog,
    setShowHelpDialog,
    changeVoice,
    explainSiga,
  };
};
