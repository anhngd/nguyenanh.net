'use client'

import React, { useEffect, useState } from 'react'
import { ReactNode } from 'react'
import { useWindowSize } from '../hooks/useWindowSize'

interface Props {
  children: ReactNode
}

function getMaxWidthClass(width: number) {
  return 'max-w-[1200px]'; // Fixed width of 1200px for all screen sizes
}

export default function SectionContainer({ children }: Props) {
  const { width } = useWindowSize()
  const maxWidthClass = getMaxWidthClass(width)

  return (
    <section className={`mx-auto px-4 sm:px-6 md:px-8 ${maxWidthClass}`}>
      {children}
    </section>
  )
}
