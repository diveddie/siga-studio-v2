"use client"

import { useImageStore } from "@/lib/stores/image-store"
import Image from "next/image"
import { useMemo } from "react"

export const MaskDisplay = () => {
  const store = useImageStore()
  
  const mask = useMemo(() => {
    return store.getLatestMask();
  }, [store.images])
  
  if (!mask) return null

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Generated Mask</h3>
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <Image
            src={mask}
            alt="Generated mask"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}
