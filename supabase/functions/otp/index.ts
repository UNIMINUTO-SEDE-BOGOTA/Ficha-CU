import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const url   = new URL(req.url)
  const route = url.pathname.split('/').pop()
  const body  = await req.json()

  // ── /otp/request ──────────────────────────────────────────
  if (route === 'request') {
    const { email, app_name } = body

    // 1. Verificar acceso
    const { data: user, error } = await supabase
      .from('user_access')
      .select('email')
      .eq('email', email)
      .eq('acceso', app_name)
      .eq('activo', true)
      .single()

    if (error || !user) {
      return json({ error: 'Email no autorizado para esta aplicación' }, 403)
    }

    // 2. Generar OTP
    const otp        = Math.floor(100000 + Math.random() * 900000).toString()
    const expires_at = new Date(Date.now() + 5 * 60 * 1000).toISOString()

    // 3. Guardar en tabla
    await supabase.from('otp_codes').upsert(
      { email, app_name, otp, expires_at, used: false },
      { onConflict: 'email,app_name' }
    )

    // 4. Enviar con Resend
    const resendRes = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'onboarding@resend.dev',
        to:      email,
        subject: 'Tu código de acceso',
        html:    `
          <div style="font-family:sans-serif;max-width:400px;margin:auto">
            <h2>Código de acceso</h2>
            <p>Tu código para ingresar a <strong>${app_name}</strong> es:</p>
            <div style="font-size:36px;font-weight:bold;letter-spacing:8px;margin:24px 0">${otp}</div>
            <p style="color:#888">Expira en 5 minutos. No lo compartas con nadie.</p>
          </div>
        `,
      }),
    })

    const resendData = await resendRes.json()
    console.log('Resend result:', resendData)

    if (!resendRes.ok) {
      return json({ error: 'Error enviando el correo', detail: resendData }, 500)
    }

    return json({ message: 'Código enviado' }, 200)
  }

  // ── /otp/verify ───────────────────────────────────────────
  if (route === 'verify') {
    const { email, otp, app_name } = body

    const { data, error } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('email', email)
      .eq('otp', otp)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error || !data) {
      return json({ error: 'Código incorrecto o expirado' }, 401)
    }

    // Marcar como usado
    await supabase.from('otp_codes').update({ used: true }).eq('id', data.id)

    const session_token = crypto.randomUUID()
    const expires_at    = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()

    await supabase.from('otp_sessions').insert({
      email, app_name, session_token, expires_at,
    })

    return json({ email, app_name, session_token, expires_at }, 200)
  }

  // ── /otp/session ──────────────────────────────────────────
  if (route === 'session') {
    const { session_token, app_name } = body

    const { data, error } = await supabase
      .from('otp_sessions')
      .select('*')
      .eq('session_token', session_token)
      .eq('app_name', app_name)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error || !data) {
      return json({ error: 'Sesión inválida o expirada' }, 401)
    }

    return json({ valid: true }, 200)
  }

  return json({ error: 'Ruta no encontrada' }, 404)
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}