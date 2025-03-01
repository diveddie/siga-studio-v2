"use client";

import React, { useEffect, useState } from "react";
import useWebRTCAudioSession from "@/hooks/use-webrtc";
import { tools } from "@/lib/tools";
import { VoiceSelector } from "@/components/voice-select";
import { BroadcastButton } from "@/components/broadcast-button";
import { StatusDisplay } from "@/components/status";
import { MessageControls } from "@/components/message-controls";
import { TextInput } from "@/components/text-input";
import { motion } from "framer-motion";
import { useToolsFunctions } from "@/hooks/use-tools";
import { MaskDisplay } from "@/components/mask-display";
import { ImageDisplay } from "@/components/image-display";
import { Header } from "@/components/header";
import { useImageStore } from "@/lib/stores/image-store";
import { LoadingOverlay } from "@/components/loading-overlay";
import { HelpDialog } from "@/components/help-dialog";
import { AnimatedLogo } from "@/components/ui/animated-logo";

const App: React.FC = () => {
  const [voice, setVoice] = useState("ash");
  const [showInitialLoad, setShowInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialLoad(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const {
    status,
    isSessionActive,
    isMicMuted,
    registerFunction,
    handleStartStopClick,
    toggleMic,
    conversation,
    sendTextMessage,
  } = useWebRTCAudioSession(voice, tools);

  const { showHelpDialog, setShowHelpDialog, ...toolsFunctions } = useToolsFunctions(setVoice);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Broadcast shortcut (Cmd/Ctrl + B)
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        handleStartStopClick();
      }

      // Mic toggle shortcut (Cmd/Ctrl + M)
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "m") {
        event.preventDefault();
        if (isSessionActive) {
          toggleMic();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleStartStopClick, isSessionActive, toggleMic]);

  useEffect(() => {
    Object.entries(toolsFunctions).forEach(([name, func]) => {
      const functionNames: Record<string, string> = {
        timeFunction: "getCurrentTime",
        backgroundFunction: "changeBackgroundColor",
        partyFunction: "partyMode",
        launchWebsite: "launchWebsite",
        copyToClipboard: "copyToClipboard",
        scrapeWebsite: "scrapeWebsite",
        generateImage: "generateImage",
        createImageMask: "createImageMask",
        inpaintImage: "inpaintImage",
        changeVoice: "changeVoice",
        restartSession: "restartSession",
        clearMask: "clearMask",
        showHelp: "showHelp",
        closeHelp: "closeHelp",
      };

      registerFunction(functionNames[name], func);
    });
  }, [registerFunction, toolsFunctions]);

  

  if (showInitialLoad) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-2xl font-bold text-center">
          <AnimatedLogo className="h-24 w-auto" />
        </div>
      </div>
    );
  }

  return (
    <main className="h-[calc(100vh)] bg-red-200 w-full flex flex-col">
      <HelpDialog open={showHelpDialog} onOpenChange={setShowHelpDialog} />
      <div className="flex flex-1 overflow-hidden bg-blue-200">
        {/* Main Canvas Area */}
        <div className="flex-1 flex">
          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-auto bg-background">
            <div className="w-full h-full rounded-lg border-2 border-dashed border-border flex items-center justify-center relative">
              <div className="relative aspect-square w-full max-w-2xl mx-auto rounded-md">
                {/* Image Display Area */}
                <div className="relative aspect-square w-full bg-muted rounded-lg">
                  <LoadingOverlay />
                  <ImageDisplay className="rounded-lg" />
                  {/* Mask Overlay */}
                  <div className="absolute inset-0">
                    <MaskDisplay className="opacity-50 rounded-lg" />
                  </div>
                  {/* Empty State Message */}
                  {!useImageStore.getState().getLatestImage() && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-muted-foreground p-4">
                        <p className="text-lg font-medium mb-2">
                          No image generated yet
                        </p>
                        <p className="text-sm">
                          Try saying &quot;Generate an image of [your
                          description]&quot;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-1/3 border-l border-border bg-card flex flex-col">
            <Header />
            <div className="p-4 space-y-4">
              <VoiceSelector value={voice} onValueChange={setVoice} />
              <div className="flex flex-col gap-2">
                <BroadcastButton
                  isSessionActive={isSessionActive}
                  onClick={handleStartStopClick}
                />
                {isSessionActive && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <span>Mic: {isMicMuted ? "Muted" : "Active"}</span>
                    <kbd className="inline-flex items-center gap-1 rounded border bg-muted px-2 font-mono text-xs">
                      <span className="text-xs">⌘</span>M
                    </kbd>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-1 p-4 justify-between">
              {status && (
                <motion.div
                  className="flex flex-col flex-1 justify-between mb-2 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageControls conversation={conversation} />
                  {isSessionActive && (
                    <TextInput
                      onSubmit={sendTextMessage}
                      disabled={!isSessionActive}
                    />
                  )}
                </motion.div>
              )}
            </div>

            {status && <StatusDisplay status={status} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
