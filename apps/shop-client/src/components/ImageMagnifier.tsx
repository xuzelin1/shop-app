'use client'

import { useState, useRef, MouseEvent } from 'react'
import Image from 'next/image'

interface ImageMagnifierProps {
  src: string
  alt: string
  zoomLevel?: number
  magnifierSize?: number
}

export default function ImageMagnifier({
  src,
  alt,
  zoomLevel = 2.5,
  magnifierSize = 200,
}: ImageMagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 })
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setShowMagnifier(true)
  }

  const handleMouseLeave = () => {
    setShowMagnifier(false)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // 计算指示器尺寸
    const indicatorSize = magnifierSize / zoomLevel
    const halfIndicator = indicatorSize / 2

    // 允许指示器贴边，但不超出边界
    const magnifierX = Math.max(
      0,
      Math.min(x - halfIndicator, rect.width - indicatorSize)
    )
    const magnifierY = Math.max(
      0,
      Math.min(y - halfIndicator, rect.height - indicatorSize)
    )

    // 保存指示器左上角的位置（用于渲染）
    setMagnifierPosition({ x: magnifierX, y: magnifierY })

    // 计算原图在放大区域中的位置（使用原始鼠标位置，不受限制）
    const imgX = Math.max(0, Math.min((x / rect.width) * 100, 100))
    const imgY = Math.max(0, Math.min((y / rect.height) * 100, 100))

    setImagePosition({ x: imgX, y: imgY })
  }

  return (
    <>
      {/* 主图片容器 */}
      <div
        ref={imageRef}
        className="absolute inset-0 cursor-crosshair"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
        />

        {/* 蒙层指示器 - 显示当前放大的区域 */}
        {showMagnifier && (
          <div
            className="absolute pointer-events-none border-2 border-white shadow-lg bg-white/20 z-10"
            style={{
              width: `${magnifierSize / zoomLevel}px`,
              height: `${magnifierSize / zoomLevel}px`,
              left: `${magnifierPosition.x}px`,
              top: `${magnifierPosition.y}px`,
            }}
          />
        )}
      </div>

      {/* 悬停提示 - 独立的绝对定位层 */}
      <div 
        className="absolute inset-x-0 bottom-0 pointer-events-none z-20 transition-opacity duration-300"
        style={{ opacity: showMagnifier ? 1 : 0 }}
      >
        <div className="bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-12 pb-4">
          <p className="text-white text-xs text-center font-medium px-4">
            移动鼠标查看细节
          </p>
        </div>
      </div>
      {/* 放大镜区域 - 固定在右侧 */}
      {showMagnifier && (
        <div
          className="fixed pointer-events-none z-50 border-4 border-gray-300 bg-white shadow-2xl rounded-lg overflow-hidden"
          style={{
            width: `${magnifierSize * 2}px`,
            height: `${magnifierSize * 2}px`,
            left: imageRef.current
              ? `${imageRef.current.getBoundingClientRect().right + 20}px`
              : '0',
            top: imageRef.current
              ? `${imageRef.current.getBoundingClientRect().top}px`
              : '0',
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              width: `${magnifierSize * 2}px`,
              height: `${magnifierSize * 2}px`,
            }}
          >
            <Image
              src={src}
              alt={`${alt} - 放大`}
              fill
              className="object-cover"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: `${imagePosition.x}% ${imagePosition.y}%`,
              }}
            />
          </div>

          {/* 放大提示 */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded pointer-events-none">
            {zoomLevel}x
          </div>
        </div>
      )}
    </>
  )
}

