import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useMemberStorage<T>(key: string, defaultValue: T) {
  const { user } = useAuth()

  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw !== null) return JSON.parse(raw) as T
    } catch {}
    return defaultValue
  })

  // Quando autenticado, carrega do Supabase e sobrescreve o localStorage
  useEffect(() => {
    if (!user) return
    supabase
      .from('member_data')
      .select('valor')
      .eq('member_id', user.id)
      .eq('chave', key)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.valor != null) {
          setValue(data.valor as T)
          try { localStorage.setItem(key, JSON.stringify(data.valor)) } catch {}
        }
      })
  }, [user?.id, key])

  const set = useCallback((newVal: T | ((prev: T) => T)) => {
    setValue(prev => {
      const next = typeof newVal === 'function' ? (newVal as (p: T) => T)(prev) : newVal
      try { localStorage.setItem(key, JSON.stringify(next)) } catch {}
      if (user) {
        supabase
          .from('member_data')
          .upsert(
            { member_id: user.id, chave: key, valor: next },
            { onConflict: 'member_id,chave' }
          )
          .then()
      }
      return next
    })
  }, [user?.id, key])

  return [value, set] as const
}
