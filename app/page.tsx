"use client";

import React, { useEffect, useState } from "react";
import useWebRTCAudioSession from "@/hooks/use-webrtc";
import { tools } from "@/lib/tools";
import { Welcome } from "@/components/welcome";
import { VoiceSelector } from "@/components/voice-select";
import { BroadcastButton } from "@/components/broadcast-button";
import { StatusDisplay } from "@/components/status";
import { TokenUsageDisplay } from "@/components/token-usage";
import { MessageControls } from "@/components/message-controls";
import { ToolsEducation } from "@/components/tools-education";
import { TextInput } from "@/components/text-input";
import { motion } from "framer-motion";
import { useToolsFunctions } from "@/hooks/use-tools";
import { MaskDisplay } from "@/components/mask-display";

const App: React.FC = () => {
  // State for voice selection
  const [voice, setVoice] = useState("ash");

  // WebRTC Audio Session Hook
  const {
    status,
    isSessionActive,
    registerFunction,
    handleStartStopClick,
    msgs,
    conversation,
    sendTextMessage,
  } = useWebRTCAudioSession(voice, tools);

  // Get all tools functions
  const toolsFunctions = useToolsFunctions();

  useEffect(() => {
    // Register all functions by iterating over the object
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
    <main className="h-full">
      <motion.div
        className="container flex flex-col items-center justify-center mx-auto max-w-3xl my-20 p-12 border rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Welcome />

        <MaskDisplay />

        <motion.div
          className="w-full max-w-md bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <VoiceSelector value={voice} onValueChange={setVoice} />

          <div className="flex flex-col items-center gap-4">
            <BroadcastButton
              isSessionActive={isSessionActive}
              onClick={handleStartStopClick}
            />
          </div>
          {msgs.length > 4 && <TokenUsageDisplay messages={msgs} />}
          {status && (
            <motion.div
              className="w-full flex flex-col gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageControls conversation={conversation} msgs={msgs} />
              <TextInput
                onSubmit={sendTextMessage}
                disabled={!isSessionActive}
              />
            </motion.div>
          )}
        </motion.div>

        {status && <StatusDisplay status={status} />}
        <div className="w-full flex flex-col items-center gap-4">
          <ToolsEducation />
        </div>
      </motion.div>
    </main>
  );
};

export default App;
