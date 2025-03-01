"use client"

import { useImageStore } from "@/lib/stores/image-store"
import Image from "next/image"
import { useMemo } from "react"

interface ImageDisplayProps {
  className?: string
}

export const ImageDisplay = ({ className }: ImageDisplayProps) => {
  const store = useImageStore()
  
  const image = useMemo(() => {
    return store.getLatestImage();
  }, [store.images])
  
  if (!image) return null

  return (
    <Image
      src={image}
      alt="Generated image"
      fill
      className={`object-contain ${className || ''}`}
    />
  )
}