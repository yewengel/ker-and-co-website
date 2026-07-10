'use client'

import React, { useEffect } from 'react'

export default function ProjectesRedirectPage() {
  useEffect(() => {
    window.location.replace('/projects/')
  }, [])

  return null
}
