export const TRANSLATIONS = {
  "en-US": {
    "emailWritingAssistant": "Email Writing Assistant",
    "transformThoughtsDescription": "Transform your thoughts into polished, professional emails with AI assistance",
    "yourThoughts": "Your Thoughts",
    "thoughtsPlaceholder": "Write what you want to communicate... Don't worry about grammar or structure - just get your ideas down.",
    "tipKeyboardShortcut": "💡 Tip: Press Cmd/Ctrl + Enter to generate your email",
    "emailTone": "Email Tone",
    "professionalTone": "Professional",
    "professionalDescription": "Clear and business-appropriate",
    "warmTone": "Warm",
    "warmDescription": "Friendly and approachable",
    "conciseTone": "Concise",
    "conciseDescription": "Brief and to the point",
    "formalTone": "Formal",
    "formalDescription": "Traditional and respectful",
    "casualTone": "Casual",
    "casualDescription": "Relaxed and conversational",
    "persuasiveTone": "Persuasive",
    "persuasiveDescription": "Compelling and convincing",
    "contextOptional": "Context (Optional)",
    "hide": "Hide",
    "show": "Show",
    "contextDescription": "Paste the email you're responding to for better context",
    "contextPlaceholder": "Paste the original email here...",
    "craftingEmail": "Crafting your email...",
    "generateEmail": "Generate Email",
    "generatedEmail": "Generated Email",
    "copied": "Copied!",
    "copy": "Copy",
    "emailWillAppearHere": "Your polished email will appear here",
    "getStartedPrompt": "Enter your thoughts and select a tone to get started",
    "proTips": "✨ Pro Tips",
    "tipBeSpecific": "• Be specific about what you want to achieve",
    "tipIncludeDetails": "• Include key details even if roughly written",
    "tipTryTones": "• Try different tones to see what works best",
    "tipAddContext": "• Add context for more personalized responses",
    "refine": "Refine",
    "makeLonger": "Make Longer",
    "makeShorter": "Make Shorter",
    "tryAgain": "Try Again"
  },
  "es-ES": {
    "emailWritingAssistant": "Asistente de Redacción de Correos",
    "transformThoughtsDescription": "Transforma tus ideas en correos electrónicos pulidos y profesionales con asistencia de IA",
    "yourThoughts": "Tus Ideas",
    "thoughtsPlaceholder": "Escribe lo que quieres comunicar... No te preocupes por la gramática o estructura - solo plasma tus ideas.",
    "tipKeyboardShortcut": "💡 Consejo: Presiona Cmd/Ctrl + Enter para generar tu correo",
    "emailTone": "Tono del Correo",
    "professionalTone": "Profesional",
    "professionalDescription": "Claro y apropiado para negocios",
    "warmTone": "Cálido",
    "warmDescription": "Amigable y accesible",
    "conciseTone": "Conciso",
    "conciseDescription": "Breve y directo",
    "formalTone": "Formal",
    "formalDescription": "Tradicional y respetuoso",
    "casualTone": "Casual",
    "casualDescription": "Relajado y conversacional",
    "persuasiveTone": "Persuasivo",
    "persuasiveDescription": "Convincente y persuasivo",
    "contextOptional": "Contexto (Opcional)",
    "hide": "Ocultar",
    "show": "Mostrar",
    "contextDescription": "Pega el correo al que estás respondiendo para mejor contexto",
    "contextPlaceholder": "Pega el correo original aquí...",
    "craftingEmail": "Creando tu correo...",
    "generateEmail": "Generar Correo",
    "generatedEmail": "Correo Generado",
    "copied": "¡Copiado!",
    "copy": "Copiar",
    "emailWillAppearHere": "Tu correo pulido aparecerá aquí",
    "getStartedPrompt": "Ingresa tus ideas y selecciona un tono para comenzar",
    "proTips": "✨ Consejos Pro",
    "tipBeSpecific": "• Sé específico sobre lo que quieres lograr",
    "tipIncludeDetails": "• Incluye detalles clave aunque estén escritos de forma básica",
    "tipTryTones": "• Prueba diferentes tonos para ver cuál funciona mejor",
    "tipAddContext": "• Agrega contexto para respuestas más personalizadas",
    "refine": "Refinar",
    "makeLonger": "Hacer más largo",
    "makeShorter": "Hacer más corto",
    "tryAgain": "Intentar de nuevo"
  }
};

export const appLocale = 'en-US'; // Default, can be dynamic
export const browserLocale = navigator.languages?.[0] || navigator.language || 'en-US';

export const findMatchingLocale = (locale: string) => {
  if ((TRANSLATIONS as any)[locale]) return locale;
  const lang = locale.split('-')[0];
  const match = Object.keys(TRANSLATIONS).find(key => key.startsWith(lang + '-'));
  return match || 'en-US';
};

export const currentLocale = findMatchingLocale(browserLocale);

export const t = (key: string): string => {
  const dict = (TRANSLATIONS as any)[currentLocale] || TRANSLATIONS['en-US'];
  return dict[key] || TRANSLATIONS['en-US'][key as keyof typeof TRANSLATIONS['en-US']] || key;
};
