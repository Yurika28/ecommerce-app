'use client'

import { useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'

type UseClerkMetaSyncOptions<TMeta> = {
  key: string
  onHydrate: (raw: TMeta | null) => Promise<void>
  serialize: () => TMeta
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  syncDeps: any[]
  onClear: () => void
}

export function useClerkMetaSync<TMeta>({
  key,
  onHydrate,
  serialize,
  syncDeps,
  onClear,
}: UseClerkMetaSyncOptions<TMeta>) {
  const { user, isLoaded } = useUser()
  const isHydrated = useRef(false)
  const onClearRef = useRef(onClear)
  onClearRef.current = onClear

  // Hydrate from Clerk metadata when user signs in
  useEffect(() => {
    if (!isLoaded || !user || isHydrated.current) return
    const saved = (user.unsafeMetadata?.[key] as TMeta | undefined) ?? null
    onHydrate(saved).finally(() => {
      isHydrated.current = true
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user?.id])

  // Clear when user signs out
  useEffect(() => {
    if (isLoaded && !user) {
      onClearRef.current()
      isHydrated.current = false
    }
  }, [isLoaded, user])

  // Sync to Clerk on state changes
  useEffect(() => {
    if (!user || !isHydrated.current) return
    user
      .update({ unsafeMetadata: { ...user.unsafeMetadata, [key]: serialize() } })
      .catch(err => console.error(`Failed to sync ${key}:`, err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, syncDeps)
}