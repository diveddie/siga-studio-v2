"use client"

import { useImageStore } from "@/lib/stores/image-store"
import Image from "next/image"
import { useMemo } from "react"

interface MaskDisplayProps {
  className?: string
}

export const MaskDisplay = ({ className }: MaskDisplayProps) => {
  const store = useImageStore()
  
  const mask = useMemo(() => {
    return store.getLatestMask();
  }, [store.images])
  
  if (!mask) return null

  return (
    <Image
      src={mask}
      alt="Generated mask"
      fill
      className={`object-contain ${className || ''}`}
    />
  )
}
