// src/app/components/OTPLogin.tsx
import { useState, useRef, useEffect } from 'react'
import { useOTP } from '../../hooks/useOTP'

// ── Tipos ──────────────────────────────────────────────────
interface OTPLoginProps {
  appName: string
  otpHook?: ReturnType<typeof useOTP>
  onAuthenticated?: (session: { email: string; app_name: string }) => void
}

// ── Subcomponentes ─────────────────────────────────────────

function ProgressDots({ step }: { step: 'email' | 'otp' | 'authenticated' }) {
  const active = step === 'email' ? 1 : step === 'otp' ? 2 : 3
  return (
    <div className="flex gap-1.5 mb-6">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{ background: i <= active ? '#fff' : 'rgba(255,255,255,0.18)' }}
        />
      ))}
    </div>
  )
}

function ErrorBanner({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div
      className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 mb-4 text-sm"
      style={{
        background: 'rgba(212,24,61,0.15)',
        border: '0.5px solid rgba(212,24,61,0.35)',
        color: '#f09595',
      }}
    >
      <span>{msg}</span>
      <button onClick={onClose} className="shrink-0 opacity-70 hover:opacity-100 transition-opacity text-base leading-none">✕</button>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="block text-xs font-medium uppercase mb-2"
      style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em' }}
    >
      {children}
    </label>
  )
}

function OTPBoxes({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (i: number, char: string) => {
    const digit = char.replace(/\D/g, '').slice(-1)
    const arr = value.padEnd(6, ' ').split('')
    arr[i] = digit || ' '
    const next = arr.join('').trimEnd()
    onChange(next)
    if (digit && i < 5) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      refs.current[i - 1]?.focus()
      const arr = value.padEnd(6, ' ').split('')
      arr[i - 1] = ' '
      onChange(arr.join('').trimEnd())
    }
  }

  return (
    <div className="flex gap-2 mb-5">
      {[0,1,2,3,4,5].map(i => (
        <input
          key={i}
          ref={el => { refs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] && value[i] !== ' ' ? value[i] : ''}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          className="flex-1 rounded-xl py-3.5 text-xl font-medium text-white text-center outline-none transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '0.5px solid rgba(255,255,255,0.15)',
            minWidth: 0,
          }}
          onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.5)')}
          onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
        />
      ))}
    </div>
  )
}

function LoginWrap({ step, children }: { step: 'email' | 'otp' | 'authenticated'; children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #012657 0%, #001a3d 100%)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl px-8 py-10"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '0.5px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 text-xl"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          🔐
        </div>
        <ProgressDots step={step} />
        {children}
      </div>
    </div>
  )
}

// ── Componente principal ───────────────────────────────────

export function OTPLogin({ appName, otpHook, onAuthenticated }: OTPLoginProps) {
  const [email, setEmail] = useState('')
  const [otp,   setOtp]   = useState('')

  const internalHook = useOTP(appName)
  const { step, isLoading, error, session, requestOTP, verifyOTP, logout, clearError } =
    otpHook ?? internalHook

  useEffect(() => {
    if (step === 'authenticated' && session) {
      onAuthenticated?.({ email: session.email, app_name: session.app_name })
    }
  }, [step, session])

  const titleStyle    = { fontFamily: 'Georgia, serif' }
  const subtitleColor = { color: 'rgba(255,255,255,0.45)' }
  const inputStyle    = {
    background: 'rgba(255,255,255,0.06)',
    border: '0.5px solid rgba(255,255,255,0.15)',
    fontFamily: 'inherit',
  }

  // ── Paso 1: email ────────────────────────────────────────
  if (step === 'email') {
    return (
      <LoginWrap step={step}>
        <h2 className="text-white text-2xl font-light mb-1" style={titleStyle}>
          Acceso a {appName}
        </h2>
        <p className="text-sm mb-8" style={subtitleColor}>
          Ingresa tu correo para recibir un código de acceso.
        </p>

        {error && <ErrorBanner msg={error} onClose={clearError} />}

        <Label>Correo electrónico</Label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          disabled={isLoading}
          autoComplete="email"
          className="w-full rounded-xl px-3.5 py-3 text-sm text-white outline-none transition-all duration-200 mb-4"
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.4)')}
          onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
        />

        <button
          disabled={isLoading || !email}
          onClick={() => requestOTP(email)}
          className="w-full rounded-xl py-3 text-sm font-semibold transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed mt-1"
          style={{ background: '#fff', color: '#012657' }}
        >
          {isLoading ? 'Enviando…' : 'Enviar código'}
        </button>
      </LoginWrap>
    )
  }

  // ── Paso 2: OTP ──────────────────────────────────────────
  if (step === 'otp') {
    return (
      <LoginWrap step={step}>
        <h2 className="text-white text-2xl font-light mb-1" style={titleStyle}>
          Revisa tu correo
        </h2>
        <p className="text-sm mb-8" style={subtitleColor}>
          Enviamos un código a <span className="text-white">{email}</span>. Expira en 5 min.
        </p>

        {error && <ErrorBanner msg={error} onClose={clearError} />}

        <Label>Código de acceso</Label>
        <OTPBoxes value={otp} onChange={setOtp} />

        <button
          disabled={isLoading || otp.replace(/\s/g, '').length !== 6}
          onClick={() => verifyOTP(email, otp.replace(/\s/g, ''))}
          className="w-full rounded-xl py-3 text-sm font-semibold transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed mt-1"
          style={{ background: '#fff', color: '#012657' }}
        >
          {isLoading ? 'Verificando…' : 'Ingresar'}
        </button>

        <div className="flex gap-4 justify-center mt-4">
          <button
            disabled={isLoading}
            onClick={async () => { setOtp(''); clearError(); await requestOTP(email) }}
            className="text-xs underline underline-offset-2 disabled:opacity-30"
            style={{ color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none' }}
          >
            Reenviar código
          </button>
          <button
            disabled={isLoading}
            onClick={() => { setOtp(''); setEmail(''); clearError() }}
            className="text-xs underline underline-offset-2 disabled:opacity-30"
            style={{ color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none' }}
          >
            Cambiar correo
          </button>
        </div>
      </LoginWrap>
    )
  }

  // ── Autenticado ──────────────────────────────────────────
  return (
    <LoginWrap step={step}>
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-5"
        style={{ background: 'rgba(29,158,117,0.2)', color: '#5DCAA5' }}
      >
        ✓
      </div>
      <h2 className="text-white text-2xl font-light mb-1" style={titleStyle}>
        Bienvenido
      </h2>
      <p className="text-sm mb-1" style={subtitleColor}>{session?.email}</p>
      <p className="text-sm mb-8" style={subtitleColor}>
        Sesión activa en <span className="text-white">{appName}</span> hasta{' '}
        {session && new Date(session.expires_at).toLocaleTimeString()}
      </p>
      <button
        onClick={logout}
        className="w-full rounded-xl py-3 text-sm transition-all duration-150 active:scale-[0.98]"
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '0.5px solid rgba(255,255,255,0.18)',
          color: '#fff',
        }}
      >
        Cerrar sesión
      </button>
    </LoginWrap>
  )
}

// ── HOC ───────────────────────────────────────────────────

export function WithOTPAuth({ appName, children }: { appName: string; children: React.ReactNode }) {
  const otp = useOTP(appName)

  if (otp.step !== 'authenticated' || !otp.session) {
    return <OTPLogin appName={appName} otpHook={otp} />
  }

  return <>{children}</>
}