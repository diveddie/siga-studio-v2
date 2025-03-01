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

const App: React.FC = () => {
  const [voice, setVoice] = useState("ash");

  const {
    status,
    isSessionActive,
    registerFunction,
    handleStartStopClick,
    conversation,
    sendTextMessage,
  } = useWebRTCAudioSession(voice, tools);

  const toolsFunctions = useToolsFunctions();

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
      };

      registerFunction(functionNames[name], func);
    });
  }, [registerFunction, toolsFunctions]);

  return (
    <main className="h-[calc(100vh-49px)] bg-red-200 w-full flex flex-col">
      <div className="flex flex-1 overflow-hidden bg-blue-200">
        {/* Main Canvas Area */}
        <div className="flex-1 flex">
          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-auto bg-background">
            <div className="w-full h-full rounded-lg border-2 border-dashed border-border flex items-center justify-center relative">
              <div className="relative aspect-square w-full max-w-2xl mx-auto rounded-md">
                {/* Latest Image */}
                <ImageDisplay className="rounded-lg" />
                {/* Mask Overlay */}
                <div className="absolute inset-0">
                  <MaskDisplay className="opacity-50 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-1/3 border-l border-border bg-card flex flex-col">
            <div className="p-4 space-y-4">
              <VoiceSelector value={voice} onValueChange={setVoice} />
              <div className="flex justify-center">
                <BroadcastButton
                  isSessionActive={isSessionActive}
                  onClick={handleStartStopClick}
                />
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
                  <TextInput
                    onSubmit={sendTextMessage}
                    disabled={!isSessionActive}
                  />
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
