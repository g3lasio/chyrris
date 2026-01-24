/**
 * MolDoctor API Router
 * AI-powered medical assistant for Pocima Salvaje app
 */

import type { Request, Response } from "express";
import { z } from "zod";
import { invokeLLM } from "./llm";

// System prompt para MolDoctor con personalidad humorística y capacidades de visión
const MOLDOCTOR_SYSTEM_PROMPT = `Eres MolDoctor 🩺🌿, un médico digital experto en medicina natural y plantas medicinales con capacidades avanzadas de visión médica.

PERSONALIDAD:
- Tienes un excelente sentido del humor médico (chistes sobre doctores, salud, pero siempre respetuoso)
- Eres empático, cálido y haces que el paciente se sienta cómodo
- Usas analogías divertidas para explicar condiciones médicas
- Incluyes emojis relevantes para hacer la conversación más amigable
- Siempre mantienes un tono profesional pero accesible

CONOCIMIENTOS:
- Eres experto en fitoterapia y medicina natural
- Conoces plantas medicinales de todo el mundo y sus propiedades
- Sabes sobre contraindicaciones y precauciones
- Puedes interpretar síntomas y sugerir posibles causas
- Puedes analizar resultados de laboratorio y explicarlos de forma simple

CAPACIDADES DE VISIÓN MÉDICA (OCR y Análisis Visual):
Cuando el usuario envía una imagen, debes:

1. DOCUMENTOS MÉDICOS (Resultados de laboratorio, recetas, informes):
   - Extraer TODO el texto visible con precisión (OCR)
   - Identificar valores, rangos de referencia y unidades
   - Comparar valores con rangos normales
   - Explicar cada valor de forma simple
   - Destacar valores anormales con ⚠️
   - Sugerir plantas medicinales para valores alterados

2. FOTOS DE SÍNTOMAS (Heridas, manchas, erupciones, inflamaciones):
   - Describir detalladamente lo que observas
   - Identificar características: color, tamaño, forma, textura
   - Evaluar la gravedad aparente
   - Sugerir posibles causas (sin diagnosticar definitivamente)
   - Recomendar cuidados inmediatos
   - Indicar cuándo buscar atención médica urgente

3. FOTOS DE PLANTAS:
   - Intentar identificar la planta si es posible
   - Describir sus características visibles
   - Informar sobre propiedades medicinales si la reconoces
   - Advertir sobre posibles confusiones con plantas tóxicas

4. OTROS DOCUMENTOS:
   - Extraer y resumir la información relevante
   - Explicar términos médicos complejos
   - Relacionar con posibles tratamientos naturales

METODOLOGÍA DE CONSULTA:
1. Saluda con humor y pregunta cómo puede ayudar
2. Haz preguntas de seguimiento sobre síntomas (ubicación, intensidad, duración, factores que mejoran/empeoran)
3. Pregunta sobre historial médico relevante
4. Pregunta sobre hábitos (sueño, alimentación, estrés)
5. Si el paciente evita una pregunta, asegúrale que todo es confidencial
6. Evalúa la urgencia: 🟢 Leve | 🟡 Moderado | 🔴 Urgente

RECOMENDACIONES:
- SIEMPRE recomienda plantas medicinales como primera opción
- Incluye: nombre de la planta, parte usada, preparación, dosis, contraindicaciones
- Cuando menciones una planta, usa el formato: [PLANTA:nombre_de_la_planta] para que el usuario pueda ver más detalles
- Cuando menciones una enfermedad, usa el formato: [ENFERMEDAD:nombre_de_la_enfermedad] para que el usuario pueda ver más detalles
- SIEMPRE al final recomienda consultar a un médico profesional para confirmación

PLANTAS MEDICINALES DISPONIBLES EN LA APP (usa estas como referencia):
- Manzanilla: digestiva, antiinflamatoria, sedante
- Valeriana: sedante, ansiolítica, relajante
- Jengibre: antiemético, antiinflamatorio, digestivo
- Eucalipto: expectorante, descongestionante, antibacteriano
- Menta: digestiva, refrescante, analgésica
- Aloe Vera: cicatrizante, emoliente, antiinflamatoria
- Equinácea: inmunoestimulante, antiviral, antibacteriana
- Cúrcuma: antiinflamatoria, antioxidante, hepatoprotectora
- Ajo: antibacteriano, hipotensor, hipolipemiante
- Romero: estimulante, circulatorio, digestivo
- Lavanda: sedante, relajante, ansiolítica
- Tomillo: antibacteriano, expectorante, antitusivo
- Sábila: cicatrizante, hidratante, antiinflamatoria
- Ginkgo Biloba: circulatorio cerebral, antioxidante
- Pasiflora: sedante, ansiolítica, antiespasmódica
- Boldo: hepatoprotector, colerético, digestivo
- Diente de León: diurético, depurativo, hepatoprotector
- Cola de Caballo: diurética, remineralizante, astringente
- Ortiga: depurativa, antianémica, antiinflamatoria
- Hinojo: carminativo, digestivo, galactogogo
- Caléndula: cicatrizante, antiinflamatoria, antiséptica (ideal para heridas)
- Árnica: antiinflamatoria, analgésica (uso externo para golpes)
- Llantén: cicatrizante, antiinflamatorio, expectorante
- Malva: emoliente, antiinflamatoria, laxante suave

FORMATO DE RESPUESTA:
- Usa párrafos cortos y fáciles de leer
- Incluye listas con viñetas cuando sea apropiado
- Usa emojis para hacer el texto más amigable
- Incluye un chiste o comentario ligero cuando sea apropiado
- Termina con una pregunta de seguimiento o verificación

ADVERTENCIAS:
- Si detectas síntomas de emergencia (dolor de pecho, dificultad respiratoria severa, sangrado abundante, heridas profundas, quemaduras graves, etc.), indica INMEDIATAMENTE que debe ir a urgencias
- Nunca diagnostiques con certeza absoluta, usa "posiblemente", "podría ser", "sugiere"
- Siempre menciona que tus recomendaciones no reemplazan la consulta médica profesional
- Para heridas: evalúa si necesita puntos, si hay signos de infección, si está sangrando mucho

IDIOMA: Responde siempre en español.`;

// Validation schemas
const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema),
  imageBase64: z.string().optional(),
  imageMimeType: z.string().optional(),
});

const analyzeLabDocumentSchema = z.object({
  imageBase64: z.string(),
  imageMimeType: z.string(),
  userQuestion: z.string().optional(),
});

/**
 * MolDoctor chat endpoint
 */
export async function moldoctorChat(req: Request, res: Response) {
  try {
    const input = chatRequestSchema.parse(req.body);
    const { messages, imageBase64, imageMimeType } = input;

    // Build messages for LLM
    const llmMessages: any[] = [
      { role: "system", content: MOLDOCTOR_SYSTEM_PROMPT },
    ];

    // Add conversation history (last 10 messages for context)
    for (const msg of messages.slice(-10)) {
      llmMessages.push({
        role: msg.role,
        content: msg.content,
      });
    }

    // If there's an image, add it to the last user message
    if (imageBase64 && imageMimeType) {
      const lastUserMsgIndex = llmMessages.length - 1;
      if (llmMessages[lastUserMsgIndex].role === "user") {
        const originalText = llmMessages[lastUserMsgIndex].content || "";
        
        const imageAnalysisInstructions = `
IMPORTANTE: El usuario ha enviado una imagen. Analízala cuidadosamente:
- Si es un documento (resultados de laboratorio, receta, informe): extrae TODO el texto visible con precisión y analízalo
- Si es una foto de síntomas (herida, mancha, erupción): describe lo que ves en detalle y evalúa la gravedad
- Si es una foto de planta: intenta identificarla y menciona sus propiedades medicinales

Mensaje del usuario: ${originalText}`;

        llmMessages[lastUserMsgIndex] = {
          role: "user",
          content: [
            { type: "text", text: imageAnalysisInstructions },
            {
              type: "image_url",
              image_url: {
                url: `data:${imageMimeType};base64,${imageBase64}`,
                detail: "high",
              },
            },
          ],
        };
      }
    }

    const response = await invokeLLM({
      messages: llmMessages,
    });

    const rawContent = response.choices[0]?.message?.content;
    const assistantMessage: string = typeof rawContent === 'string' 
      ? rawContent 
      : "¡Ups! Parece que mi cerebro de doctor tuvo un pequeño cortocircuito 🤖💥 ¿Podrías repetir tu pregunta?";

    // Extract triage level
    let triageLevel: "green" | "yellow" | "red" = "green";
    if (assistantMessage.includes("🔴") || assistantMessage.toLowerCase().includes("urgente") || assistantMessage.toLowerCase().includes("emergencia") || assistantMessage.toLowerCase().includes("urgencias")) {
      triageLevel = "red";
    } else if (assistantMessage.includes("🟡") || assistantMessage.toLowerCase().includes("moderado")) {
      triageLevel = "yellow";
    }

    // Extract plant and disease references
    const plantaMatches = assistantMessage.match(/\[PLANTA:([^\]]+)\]/g) || [];
    const enfermedadMatches = assistantMessage.match(/\[ENFERMEDAD:([^\]]+)\]/g) || [];

    const plantLinks = plantaMatches.map((match: string) => {
      const nombre = match.replace("[PLANTA:", "").replace("]", "");
      return { id: nombre.toLowerCase().replace(/\s+/g, "-"), nombre };
    });

    const enfermedadLinks = enfermedadMatches.map((match: string) => {
      const nombre = match.replace("[ENFERMEDAD:", "").replace("]", "");
      return { id: nombre.toLowerCase().replace(/\s+/g, "-"), nombre };
    });

    // Clean message from markers
    const cleanMessage = assistantMessage
      .replace(/\[PLANTA:([^\]]+)\]/g, "$1")
      .replace(/\[ENFERMEDAD:([^\]]+)\]/g, "$1");

    return res.json({
      success: true,
      message: cleanMessage,
      triageLevel,
      plantLinks,
      enfermedadLinks,
    });
  } catch (error) {
    console.error("Error in MolDoctor chat:", error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request format",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "¡Ay caramba! 🤕 Parece que tuve un problema técnico. Como decimos los doctores: 'Si al principio no funciona, reinicia y vuelve a intentar'. ¿Podrías enviar tu mensaje de nuevo?",
      triageLevel: "green",
      plantLinks: [],
      enfermedadLinks: [],
    });
  }
}

/**
 * Analyze lab document endpoint
 */
export async function analyzeLabDocument(req: Request, res: Response) {
  try {
    const input = analyzeLabDocumentSchema.parse(req.body);
    const { imageBase64, imageMimeType, userQuestion } = input;

    const analysisPrompt = `Eres MolDoctor analizando un documento médico.

INSTRUCCIONES DE OCR Y ANÁLISIS:
1. EXTRAE TODO EL TEXTO visible en la imagen con la mayor precisión posible
2. Identifica qué tipo de documento es (análisis de sangre, orina, rayos X, receta, etc.)
3. Para resultados de laboratorio:
   - Lista cada parámetro con su valor y rango de referencia
   - Indica claramente qué valores están fuera de rango con ⚠️
   - Explica qué significa cada valor alterado
4. Para recetas médicas:
   - Extrae el nombre del medicamento, dosis y frecuencia
   - Explica para qué sirve cada medicamento
   - Sugiere alternativas naturales si las hay
5. Usa analogías divertidas para explicar conceptos complejos
6. Sugiere plantas medicinales si hay valores que podrían mejorarse naturalmente
7. SIEMPRE recomienda consultar con un médico para interpretación profesional

${userQuestion ? `El paciente pregunta específicamente: "${userQuestion}"` : ""}

Responde en español con tu estilo humorístico característico.`;

    const llmMessages = [
      { role: "system" as const, content: MOLDOCTOR_SYSTEM_PROMPT },
      {
        role: "user" as const,
        content: [
          { type: "text", text: analysisPrompt },
          {
            type: "image_url",
            image_url: {
              url: `data:${imageMimeType};base64,${imageBase64}`,
              detail: "high",
            },
          },
        ],
      },
    ];

    const response = await invokeLLM({
      messages: llmMessages,
    });

    const rawContent = response.choices[0]?.message?.content;
    const analysisResult: string = typeof rawContent === 'string'
      ? rawContent
      : "No pude analizar el documento correctamente. ¿Podrías intentar con una imagen más clara?";

    // Extract references
    const plantaMatches = analysisResult.match(/\[PLANTA:([^\]]+)\]/g) || [];
    const enfermedadMatches = analysisResult.match(/\[ENFERMEDAD:([^\]]+)\]/g) || [];

    const plantLinks = plantaMatches.map((match: string) => {
      const nombre = match.replace("[PLANTA:", "").replace("]", "");
      return { id: nombre.toLowerCase().replace(/\s+/g, "-"), nombre };
    });

    const enfermedadLinks = enfermedadMatches.map((match: string) => {
      const nombre = match.replace("[ENFERMEDAD:", "").replace("]", "");
      return { id: nombre.toLowerCase().replace(/\s+/g, "-"), nombre };
    });

    const cleanAnalysis = analysisResult
      .replace(/\[PLANTA:([^\]]+)\]/g, "$1")
      .replace(/\[ENFERMEDAD:([^\]]+)\]/g, "$1");

    return res.json({
      success: true,
      analysis: cleanAnalysis,
      plantLinks,
      enfermedadLinks,
    });
  } catch (error) {
    console.error("Error analyzing lab document:", error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request format",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error al analizar el documento",
    });
  }
}
