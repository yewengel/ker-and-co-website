import React from 'react'
import { redirect } from 'next/navigation'

export const dynamicParams = false

export function generateStaticParams() {
  return ['1', '2', '3', '4', '5', '6', '7', '8'].map((id) => ({ id }))
}

export default function ArticleRedirectPage({ params }: { params: { id: string } }) {
  redirect(`/articles/view/?id=${encodeURIComponent(params.id)}`)
}
