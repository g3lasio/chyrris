/**
 * Página de Suscripción - Caymus Tank Calculator
 * Propiedad de Chyrris Technologies Inc.
 *
 * Esta página es el destino de redirección desde la app móvil.
 * El usuario gestiona su suscripción aquí via Stripe.
 *
 * URL: https://chyrris.com/caymus-tanks/subscribe
 * Parámetros: ?phone=+1234567890&lang=es
 */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ParticleBackground } from "../components/ParticleBackground";
import { Footer } from "../sections/Footer";

// Pricing: annual is the default plan; monthly remains as an advanced option.
const MONTHLY_PRICE = "$6.99";
const ANNUAL_PRICE = "$75.49";
const ANNUAL_SAVINGS = "10%";

export default function CaymusTanksSubscribe() {
  const [location] = useLocation();
  const [phone, setPhone] = useState<string>("");
  const [lang, setLang] = useState<"es" | "en">("es");
  const [sessionToken, setSessionToken] = useState<string>("");
  const [showMonthlyOption, setShowMonthlyOption] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Leer parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const phoneParam = params.get("phone") || "";
    const langParam = params.get("lang") || "es";
    const tokenParam = params.get("sessionToken") || sessionStorage.getItem("caymusSessionToken") || "";
    if (tokenParam) {
      sessionStorage.setItem("caymusSessionToken", tokenParam);
    }
    setPhone(phoneParam);
    setLang(langParam === "en" ? "en" : "es");
    setSessionToken(tokenParam);

    if (params.has("sessionToken")) {
      params.delete("sessionToken");
      const cleanQuery = params.toString();
      window.history.replaceState(null, "", `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ""}`);
    }
  }, []);

  const t = {
    es: {
      title: "Suscripción Caymus Pro",
      subtitle: "Plan anual recomendado con opción mensual avanzada",
      description:
        "Accede a todas las funciones de la calculadora de tanques de vino con una suscripción anual con descuento.",
      priceLabel: "Plan Anual Recomendado",
      priceNote: `Incluye ${ANNUAL_SAVINGS} de descuento frente al pago mensual. Se renueva automáticamente cada año.`,
      features: [
        "✓ Cálculos ilimitados de tanques",
        "✓ Historial de cálculos guardado",
        "✓ Soporte prioritario",
        "✓ Actualizaciones automáticas",
        "✓ Sin anuncios",
        "✓ Acceso completo a todos los tanques",
      ],
      subscribeButton: "Suscribirse Anualmente",
      monthlyButton: "Prefiero pagar mensual (opción avanzada)",
      monthlySubscribeButton: "Continuar con plan mensual",
      missingSession: "Tu sesión de verificación expiró. Regresa a la app, verifica tu número nuevamente y vuelve a intentarlo.",
      manageButton: "Gestionar Suscripción Existente",
      cancelButton: "Cancelar Suscripción",
      backButton: "← Volver a la App",
      phoneLabel: "Tu número:",
      secureNote: "🔒 Pago seguro procesado por Stripe",
      cancelNote: "Puedes cancelar en cualquier momento desde esta página.",
      termsNote: "Al suscribirte aceptas nuestros Términos de Servicio.",
      successTitle: "¡Suscripción Activada!",
      successMessage:
        "Tu suscripción está activa. Regresa a la app para continuar.",
      returnApp: "Regresar a la App",
    },
    en: {
      title: "Caymus Pro Subscription",
      subtitle: "Recommended annual plan with advanced monthly option",
      description:
        "Access all wine tank calculator features with a discounted annual subscription.",
      priceLabel: "Recommended Annual Plan",
      priceNote: `${ANNUAL_SAVINGS} discount compared with monthly payments. Automatically renews every year.`,
      features: [
        "✓ Unlimited tank calculations",
        "✓ Saved calculation history",
        "✓ Priority support",
        "✓ Automatic updates",
        "✓ No ads",
        "✓ Full access to all tanks",
      ],
      subscribeButton: "Subscribe Annually",
      monthlyButton: "I prefer monthly billing (advanced option)",
      monthlySubscribeButton: "Continue with monthly plan",
      missingSession: "Your verification session expired. Return to the app, verify your number again, and retry.",
      manageButton: "Manage Existing Subscription",
      cancelButton: "Cancel Subscription",
      backButton: "← Back to App",
      phoneLabel: "Your number:",
      secureNote: "🔒 Secure payment processed by Stripe",
      cancelNote: "You can cancel at any time from this page.",
      termsNote: "By subscribing you accept our Terms of Service.",
      successTitle: "Subscription Activated!",
      successMessage: "Your subscription is active. Return to the app to continue.",
      returnApp: "Return to App",
    },
  };

  const content = t[lang];

  // Verificar si venimos de un pago exitoso (Stripe redirige con ?success=true)
  const params = new URLSearchParams(window.location.search);
  const isSuccess = params.get("success") === "true";
  const isCanceled = params.get("canceled") === "true";

  const handleSubscribe = async (planInterval: "year" | "month" = "year") => {
    if (!sessionToken) {
      alert(content.missingSession);
      return;
    }

    setIsLoading(true);
    try {
      // Llamar al backend para crear una Stripe Checkout Session
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-caymus-session-token': sessionToken,
        },
        body: JSON.stringify({ phone, lang, planInterval }),
      });
      const data = await response.json();
      if (!data.success || !data.url) {
        throw new Error(data.message || 'Error al crear la sesión de pago');
      }
      // Redirigir a Stripe Checkout
      window.location.href = data.url;
    } catch (err: any) {
      console.error('Error creating checkout:', err);
      alert(lang === 'es'
        ? `Error: ${err.message || 'No se pudo iniciar el pago. Intenta de nuevo.'}`
        : `Error: ${err.message || 'Could not start payment. Please try again.'}`
      );
      setIsLoading(false);
    }
  };

  const handleReturnToApp = () => {
    // Deep link de vuelta a la app
    window.location.href = `caymus://subscription-success?phone=${encodeURIComponent(phone)}`;
    // Fallback: si el deep link no funciona, mostrar instrucciones
    setTimeout(() => {
      alert(
        lang === "es"
          ? "Regresa a la app Caymus Tanks y tu suscripción se activará automáticamente."
          : "Return to the Caymus Tanks app and your subscription will activate automatically."
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-lg mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="text-6xl mb-4">🍷</div>
          <h1 className="text-3xl font-bold text-[#00d4ff] mb-2">
            {content.title}
          </h1>
          <p className="text-[#8892b0] text-lg">{content.subtitle}</p>
          {phone && (
            <p className="text-[#ccd6f6] mt-2 text-sm">
              {content.phoneLabel} <span className="text-[#00d4ff] font-mono">{phone}</span>
            </p>
          )}
        </motion.div>

        {/* Success State */}
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#112240] border-2 border-[#00d4ff] rounded-2xl p-8 text-center"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-[#00d4ff] mb-3">
              {content.successTitle}
            </h2>
            <p className="text-[#ccd6f6] mb-6">{content.successMessage}</p>
            <button
              onClick={handleReturnToApp}
              className="w-full bg-[#00d4ff] text-[#0a1628] font-bold py-4 rounded-xl text-lg hover:bg-[#00b8d9] transition-colors"
            >
              {content.returnApp}
            </button>
          </motion.div>
        ) : (
          <>
            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[rgba(0,212,255,0.1)] border-2 border-[#00d4ff] rounded-2xl p-8 mb-6 text-center"
            >
              <p className="text-[#8892b0] text-sm uppercase tracking-widest mb-2">
                {content.priceLabel}
              </p>
              <p className="text-6xl font-bold text-[#00d4ff] mb-2">
                {ANNUAL_PRICE}
                <span className="text-2xl text-[#8892b0]">/año</span>
              </p>
              <p className="text-[#ccd6f6] text-sm">{content.priceNote}</p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#112240] border border-[#1e3a5f] rounded-2xl p-6 mb-6"
            >
              {content.features.map((feature, i) => (
                <p key={i} className="text-[#ccd6f6] py-2 border-b border-[#1e3a5f] last:border-0">
                  {feature}
                </p>
              ))}
            </motion.div>

            {/* Subscribe Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isCanceled && (
                <div className="bg-[rgba(255,68,68,0.1)] border border-[#ff4444] rounded-xl p-4 mb-4 text-center">
                  <p className="text-[#ff6b6b] text-sm">
                    {lang === "es"
                      ? "El pago fue cancelado. Puedes intentarlo de nuevo."
                      : "Payment was canceled. You can try again."}
                  </p>
                </div>
              )}

              <button
                onClick={() => handleSubscribe("year")}
                disabled={isLoading}
                className="w-full bg-[#00d4ff] text-[#0a1628] font-bold py-5 rounded-xl text-xl mb-4 hover:bg-[#00b8d9] transition-colors disabled:opacity-60 shadow-lg shadow-[#00d4ff]/30"
              >
                {isLoading
                  ? lang === "es"
                    ? "Redirigiendo..."
                    : "Redirecting..."
                  : content.subscribeButton}
              </button>

              <button
                type="button"
                onClick={() => setShowMonthlyOption((current) => !current)}
                className="w-full border border-[#1e3a5f] text-[#8892b0] font-semibold py-3 rounded-xl text-sm mb-3 hover:border-[#00d4ff] hover:text-[#00d4ff] transition-colors"
              >
                {content.monthlyButton}
              </button>

              {showMonthlyOption && (
                <div className="bg-[#112240] border border-[#1e3a5f] rounded-xl p-4 mb-4 text-center">
                  <p className="text-[#ccd6f6] text-sm mb-3">
                    {MONTHLY_PRICE}<span className="text-[#8892b0]">/mes</span>
                  </p>
                  <button
                    onClick={() => handleSubscribe("month")}
                    disabled={isLoading}
                    className="w-full border border-[#00d4ff] text-[#00d4ff] font-semibold py-3 rounded-xl text-sm hover:bg-[#00d4ff] hover:text-[#0a1628] transition-colors disabled:opacity-60"
                  >
                    {content.monthlySubscribeButton}
                  </button>
                </div>
              )}

              <p className="text-center text-[#8892b0] text-sm mb-2">
                {content.secureNote}
              </p>
              <p className="text-center text-[#8892b0] text-xs mb-6">
                {content.cancelNote}
              </p>

              {/* Back to app link */}
              <div className="text-center">
                <button
                  onClick={() => window.history.back()}
                  className="text-[#00d4ff] text-sm underline"
                >
                  {content.backButton}
                </button>
              </div>

              <p className="text-center text-[#64748b] text-xs mt-6">
                {content.termsNote}
              </p>
            </motion.div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
