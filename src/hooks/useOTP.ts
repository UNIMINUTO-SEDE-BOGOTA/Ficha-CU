// src/hooks/useOTP.ts
// Hook de React para el flujo completo de autenticación OTP
// Uso:
//   const { requestOTP, verifyOTP, session, logout, isLoading, error } = useOTP('Ficha CU')

import { useState, useCallback, useEffect } from 'react'

// ── Tipos ──────────────────────────────────────────────────

interface Session {
  email:         string
  app_name:      string
  session_token: string
  expires_at:    string
}

interface OTPState {
  step:      'email' | 'otp' | 'authenticated'
  isLoading: boolean
  error:     string | null
  session:   Session | null
}

const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_URL + '/functions/v1/otp'
const SESSION_KEY        = 'otp_session'

// ── Hook principal ─────────────────────────────────────────



export function useOTP(appName: string) {
  const [state, setState] = useState<OTPState>({
    step:      'email',
    isLoading: false,
    error:     null,
    session:   null,
  })

  // Restaurar sesión desde localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY)
    if (!stored) return

    try {
      const session: Session = JSON.parse(stored)
      if (
        session.app_name === appName &&
        new Date(session.expires_at) > new Date()
      ) {
        // Verificar que la sesión siga válida en el servidor
        verifyStoredSession(session)
      } else {
        localStorage.removeItem(SESSION_KEY)
      }
    } catch {
      localStorage.removeItem(SESSION_KEY)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appName])

  const verifyStoredSession = useCallback(async (session: Session) => {
    try {
      const res = await fetch(`${EDGE_FUNCTION_URL}/session`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          session_token: session.session_token,
          app_name:      appName,
        }),
      })

      if (res.ok) {
        setState(s => ({ ...s, step: 'authenticated', session }))
      } else {
        localStorage.removeItem(SESSION_KEY)
      }
    } catch {
      localStorage.removeItem(SESSION_KEY)
    }
  }, [appName])

  // ── Paso 1: solicitar OTP ────────────────────────────────
  const requestOTP = useCallback(async (email: string): Promise<boolean> => {
    setState(s => ({ ...s, isLoading: true, error: null }))

    try {
      const res  = await fetch(`${EDGE_FUNCTION_URL}/request`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email.toLowerCase().trim(), app_name: appName }),
      })

      const data = await res.json()

      if (!res.ok) {
        setState(s => ({ ...s, isLoading: false, error: data.error ?? 'Error inesperado' }))
        return false
      }

      setState(s => ({ ...s, isLoading: false, step: 'otp', error: null }))
      return true
    } catch {
      setState(s => ({ ...s, isLoading: false, error: 'Error de conexión. Intenta de nuevo.' }))
      return false
    }
  }, [appName])

  // ── Paso 2: verificar OTP ────────────────────────────────
  const verifyOTP = useCallback(async (email: string, otp: string): Promise<boolean> => {
    setState(s => ({ ...s, isLoading: true, error: null }))

    try {
      const res  = await fetch(`${EDGE_FUNCTION_URL}/verify`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          email:    email.toLowerCase().trim(),
          app_name: appName,
          otp,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        const msg = data.attemptsLeft != null
          ? `${data.error} (${data.attemptsLeft} intentos restantes)`
          : (data.error ?? 'Código incorrecto')

        setState(s => ({ ...s, isLoading: false, error: msg }))
        return false
      }

      const session: Session = {
        email:         data.email,
        app_name:      data.app_name,
        session_token: data.session_token,
        expires_at:    data.expires_at,
      }

      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      setState({ step: 'authenticated', isLoading: false, error: null, session })
      return true
    } catch {
      setState(s => ({ ...s, isLoading: false, error: 'Error de conexión. Intenta de nuevo.' }))
      return false
    }
  }, [appName])

  // ── Cerrar sesión ────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setState({ step: 'email', isLoading: false, error: null, session: null })
  }, [])

  const clearError = useCallback(() => {
    setState(s => ({ ...s, error: null }))
  }, [])

  return {
    step:      state.step,
    isLoading: state.isLoading,
    error:     state.error,
    session:   state.session,
    requestOTP,
    verifyOTP,
    logout,
    clearError,
  }
}
