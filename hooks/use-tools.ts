"use client";

import { toast } from "sonner";
import confetti from "canvas-confetti";
import { animate as framerAnimate } from "framer-motion";
import { useTranslations } from "@/components/translations-context";
import FirecrawlApp, { ScrapeResponse } from "@mendable/firecrawl-js";
import { useImageStore } from "@/lib/stores/image-store";

export const useToolsFunctions = () => {
  const { t } = useTranslations();

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
    }
  };

  const createImageMask = async ({ prompt }: { prompt: string }) => {
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
    }
  };

  const inpaintImage = async ({ prompt }: { prompt: string }) => {
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
    }
  };

  return {
    timeFunction,
    backgroundFunction,
    partyFunction,
    launchWebsite,
    copyToClipboard,
    scrapeWebsite,
    generateImage,
    createImageMask,
    inpaintImage,
  };
};
