/**
 * Suscripción de Caymus Tank Calculator.
 * Chyrris Technologies LLC.
 *
 * Destino de redirección desde la app móvil:
 *   https://chyrris.com/caymus-tanks/subscribe?phone=+1234567890&lang=es
 *
 * ⚠️  HAY SUSCRIPCIONES ACTIVAS DE PAGO DETRÁS DE ESTA PANTALLA.
 *
 * El flujo de pago se conserva sin un solo cambio de contrato: mismo endpoint
 * (/api/stripe/create-checkout), misma cabecera de sesión
 * (x-caymus-session-token), mismo cuerpo ({ phone, lang, planInterval }), mismos
 * parámetros de retorno (?success=true / ?canceled=true) y el mismo deep link
 * caymus:// de vuelta a la app. Lo único que cambió es la presentación, más dos
 * arreglos que faltaban:
 *
 *   1. La página prometía "puedes cancelar desde esta página" y no tenía ningún
 *      control de cancelación. Ahora enlaza al portal de cliente de Stripe,
 *      usando el endpoint que ya existía (/api/stripe/customer-portal) y que
 *      acepta el token por query.
 *   2. "Al suscribirte aceptas nuestros Términos de Servicio" no enlazaba a
 *      ninguna parte porque no había página de términos. Ahora enlaza a /terms.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";

// Pricing: annual is the default plan; monthly remains as an advanced option.
const MONTHLY_PRICE = "$6.99";
const ANNUAL_PRICE = "$75.49";
const ANNUAL_SAVINGS = "10%";

export default function CaymusTanksSubscribe() {
  const [phone, setPhone] = useState<string>("");
  const [lang, setLang] = useState<"es" | "en">("es");
  const [sessionToken, setSessionToken] = useState<string>("");
  const [showMonthlyOption, setShowMonthlyOption] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // El estado de retorno de Stripe se lee en un efecto, no durante el render:
  // tocar window.location al renderizar rompía el HTML servido desde el origen.
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    // Leer parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const phoneParam = params.get("phone") || "";
    const langParam = params.get("lang") || "es";
    const tokenParam =
      params.get("sessionToken") || sessionStorage.getItem("caymusSessionToken") || "";
    if (tokenParam) {
      sessionStorage.setItem("caymusSessionToken", tokenParam);
    }
    setPhone(phoneParam);
    setLang(langParam === "en" ? "en" : "es");
    setSessionToken(tokenParam);
    setIsSuccess(params.get("success") === "true");
    setIsCanceled(params.get("canceled") === "true");

    if (params.has("sessionToken")) {
      params.delete("sessionToken");
      const cleanQuery = params.toString();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ""}`,
      );
    }
  }, []);

  // Tras un pago exitoso, regresar a la app automáticamente via deep link
  // (Stripe solo acepta success_url http/https, así que el salto a caymus://
  // se hace aquí). El botón "Regresar a la App" queda como respaldo.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") !== "true") return;
    const phoneParam = params.get("phone") || "";
    const timer = setTimeout(() => {
      window.location.href = `caymus://subscription-success?phone=${encodeURIComponent(phoneParam)}`;
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const t = {
    es: {
      title: "Suscripción Caymus Pro",
      subtitle: "Plan anual recomendado con opción mensual avanzada",
      priceLabel: "Plan anual recomendado",
      priceNote: `Incluye ${ANNUAL_SAVINGS} de descuento frente al pago mensual. Se renueva automáticamente cada año.`,
      perYear: "/año",
      perMonth: "/mes",
      features: [
        "Cálculos ilimitados de tanques",
        "Historial de cálculos guardado",
        "Soporte prioritario",
        "Actualizaciones automáticas",
        "Sin anuncios",
        "Acceso completo a todos los tanques",
      ],
      subscribeButton: "Suscribirse anualmente",
      monthlyButton: "Prefiero pagar mensual (opción avanzada)",
      monthlySubscribeButton: "Continuar con plan mensual",
      missingSession:
        "Tu sesión de verificación expiró. Regresa a la app, verifica tu número nuevamente y vuelve a intentarlo.",
      manageButton: "Gestionar o cancelar mi suscripción",
      manageNote:
        "Se abre el portal de Stripe, donde puedes cambiar el método de pago o cancelar la renovación.",
      backButton: "← Volver a la app",
      phoneLabel: "Tu número:",
      secureNote: "Pago seguro procesado por Stripe.",
      redirecting: "Redirigiendo…",
      canceledNote: "El pago fue cancelado. Puedes intentarlo de nuevo.",
      termsPrefix: "Al suscribirte aceptas nuestros",
      termsLink: "Términos de Servicio",
      successTitle: "Suscripción activada",
      successMessage: "Tu suscripción está activa. Regresa a la app para continuar.",
      returnApp: "Regresar a la app",
      portalError: "No se pudo abrir el portal de suscripción. Intenta de nuevo.",
    },
    en: {
      title: "Caymus Pro Subscription",
      subtitle: "Recommended annual plan with advanced monthly option",
      priceLabel: "Recommended annual plan",
      priceNote: `${ANNUAL_SAVINGS} discount compared with monthly payments. Automatically renews every year.`,
      perYear: "/year",
      perMonth: "/month",
      features: [
        "Unlimited tank calculations",
        "Saved calculation history",
        "Priority support",
        "Automatic updates",
        "No ads",
        "Full access to all tanks",
      ],
      subscribeButton: "Subscribe annually",
      monthlyButton: "I prefer monthly billing (advanced option)",
      monthlySubscribeButton: "Continue with monthly plan",
      missingSession:
        "Your verification session expired. Return to the app, verify your number again, and retry.",
      manageButton: "Manage or cancel my subscription",
      manageNote:
        "Opens the Stripe portal, where you can change the payment method or cancel the renewal.",
      backButton: "← Back to app",
      phoneLabel: "Your number:",
      secureNote: "Secure payment processed by Stripe.",
      redirecting: "Redirecting…",
      canceledNote: "Payment was canceled. You can try again.",
      termsPrefix: "By subscribing you accept our",
      termsLink: "Terms of Service",
      successTitle: "Subscription activated",
      successMessage: "Your subscription is active. Return to the app to continue.",
      returnApp: "Return to app",
      portalError: "The subscription portal could not be opened. Please try again.",
    },
  };

  const content = t[lang];

  const handleSubscribe = async (planInterval: "year" | "month" = "year") => {
    if (!sessionToken) {
      alert(content.missingSession);
      return;
    }

    setIsLoading(true);
    try {
      // Llamar al backend para crear una Stripe Checkout Session
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-caymus-session-token": sessionToken,
        },
        body: JSON.stringify({ phone, lang, planInterval }),
      });
      const data = await response.json();
      if (!data.success || !data.url) {
        throw new Error(data.message || "Error al crear la sesión de pago");
      }
      // Redirigir a Stripe Checkout
      window.location.href = data.url;
    } catch (err: any) {
      console.error("Error creating checkout:", err);
      alert(
        lang === "es"
          ? `Error: ${err.message || "No se pudo iniciar el pago. Intenta de nuevo."}`
          : `Error: ${err.message || "Could not start payment. Please try again."}`,
      );
      setIsLoading(false);
    }
  };

  // Portal de cliente de Stripe: el control de cancelación que la página
  // prometía y nunca mostró. El endpoint ya aceptaba el token por query.
  const handleManageSubscription = () => {
    if (!sessionToken) {
      alert(content.missingSession);
      return;
    }
    const query = new URLSearchParams({ phone, sessionToken });
    window.location.href = `/api/stripe/customer-portal?${query.toString()}`;
  };

  const handleReturnToApp = () => {
    // Deep link de vuelta a la app
    window.location.href = `caymus://subscription-success?phone=${encodeURIComponent(phone)}`;
    // Fallback: si el deep link no funciona, mostrar instrucciones
    setTimeout(() => {
      alert(
        lang === "es"
          ? "Regresa a la app Caymus Tanks y tu suscripción se activará automáticamente."
          : "Return to the Caymus Tanks app and your subscription will activate automatically.",
      );
    }, 2000);
  };

  return (
    <Layout path="/caymus-tanks/subscribe">
      <div className="container-site py-14 md:py-20">
        <div className="mx-auto max-w-lg">
          <header className="text-center">
            <p className="eyebrow">Caymus Tank Calculator</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text">
              {content.title}
            </h1>
            <p className="mt-2 text-text-muted">{content.subtitle}</p>
            {phone && (
              <p className="mt-3 text-sm text-text-faint">
                {content.phoneLabel} <span className="font-mono text-text">{phone}</span>
              </p>
            )}
          </header>

          {isSuccess ? (
            <div className="card mt-10 p-8 text-center" data-testid="caymus-success">
              <h2 className="text-xl font-semibold text-text">{content.successTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {content.successMessage}
              </p>
              <button
                onClick={handleReturnToApp}
                className="mt-6 w-full rounded bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                {content.returnApp}
              </button>
            </div>
          ) : (
            <>
              <div className="card mt-10 p-8 text-center">
                <p className="text-xs uppercase tracking-[0.14em] text-text-faint">
                  {content.priceLabel}
                </p>
                <p className="mt-3 text-5xl font-semibold text-text">
                  {ANNUAL_PRICE}
                  <span className="text-xl font-normal text-text-faint">{content.perYear}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{content.priceNote}</p>
              </div>

              <ul className="card mt-5 p-6 text-sm">
                {content.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 border-b border-line py-2.5 text-text-muted first:pt-0 last:border-0 last:pb-0"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-0.5 shrink-0 text-accent"
                      aria-hidden="true"
                    >
                      <path d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {isCanceled && (
                <p
                  className="mt-5 rounded border border-red-500/40 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300"
                  data-testid="caymus-canceled"
                >
                  {content.canceledNote}
                </p>
              )}

              <button
                onClick={() => handleSubscribe("year")}
                disabled={isLoading}
                className="mt-6 w-full rounded bg-accent px-5 py-3.5 text-base font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                data-testid="caymus-subscribe-year"
              >
                {isLoading ? content.redirecting : content.subscribeButton}
              </button>

              <button
                type="button"
                onClick={() => setShowMonthlyOption((current) => !current)}
                aria-expanded={showMonthlyOption}
                className="mt-3 w-full rounded border border-line-strong px-5 py-2.5 text-sm text-text-muted transition-colors hover:border-accent hover:text-text"
              >
                {content.monthlyButton}
              </button>

              {showMonthlyOption && (
                <div className="card mt-3 p-5 text-center">
                  <p className="text-lg font-semibold text-text">
                    {MONTHLY_PRICE}
                    <span className="text-sm font-normal text-text-faint">{content.perMonth}</span>
                  </p>
                  <button
                    onClick={() => handleSubscribe("month")}
                    disabled={isLoading}
                    className="mt-3 w-full rounded border border-accent px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white disabled:opacity-60"
                    data-testid="caymus-subscribe-month"
                  >
                    {content.monthlySubscribeButton}
                  </button>
                </div>
              )}

              {/* Control de cancelación real. */}
              <div className="mt-8 border-t border-line pt-6">
                <button
                  type="button"
                  onClick={handleManageSubscription}
                  className="w-full rounded border border-line-strong px-5 py-2.5 text-sm text-text-muted transition-colors hover:border-accent hover:text-text"
                  data-testid="caymus-manage-subscription"
                >
                  {content.manageButton}
                </button>
                <p className="mt-2 text-center text-xs leading-relaxed text-text-faint">
                  {content.manageNote}
                </p>
              </div>

              <p className="mt-6 text-center text-xs text-text-faint">{content.secureNote}</p>
              <p className="mt-2 text-center text-xs text-text-faint">
                {content.termsPrefix}{" "}
                <Link href="/terms" className="link-underline" data-testid="caymus-terms-link">
                  {content.termsLink}
                </Link>
                .
              </p>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="text-sm text-accent underline underline-offset-4"
                >
                  {content.backButton}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
