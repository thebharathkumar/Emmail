import { useState, useEffect } from 'react';
import { Send, Copy, Check, Mail, Sparkles, MessageSquare, User, RefreshCw, Wand2, ArrowRight, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { t, currentLocale } from '../translations';
import { generateEmail } from '../services/ai';
import { cn } from '../lib/utils';

export default function EmailWriter() {
  const [rawThoughts, setRawThoughts] = useState('');
  const [tone, setTone] = useState('professional');
  const [contextEmail, setContextEmail] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showContext, setShowContext] = useState(false);

  // Auto-resize textarea
  const thoughtsRef = (node: HTMLTextAreaElement | null) => {
    if (node) {
      node.style.height = 'auto';
      node.style.height = node.scrollHeight + 'px';
    }
  };

  const tones = [
    { value: 'professional', label: t('professionalTone'), description: t('professionalDescription'), color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { value: 'warm', label: t('warmTone'), description: t('warmDescription'), color: 'bg-orange-50 border-orange-200 text-orange-700' },
    { value: 'concise', label: t('conciseTone'), description: t('conciseDescription'), color: 'bg-slate-50 border-slate-200 text-slate-700' },
    { value: 'formal', label: t('formalTone'), description: t('formalDescription'), color: 'bg-purple-50 border-purple-200 text-purple-700' },
    { value: 'casual', label: t('casualTone'), description: t('casualDescription'), color: 'bg-green-50 border-green-200 text-green-700' },
    { value: 'persuasive', label: t('persuasiveTone'), description: t('persuasiveDescription'), color: 'bg-red-50 border-red-200 text-red-700' }
  ];

  const handleGenerate = async () => {
    if (!rawThoughts.trim()) return;

    setIsLoading(true);
    setGeneratedEmail(''); // Clear previous result to show loading state better
    
    try {
      const contextPart = contextEmail.trim() 
        ? `\n\nContext - I am responding to this email:\n"${contextEmail}"\n\n`
        : '';

      const prompt = `You are an expert email writer. Transform the following raw thoughts into a well-crafted email with a ${tone} tone.

Raw thoughts: "${rawThoughts}"${contextPart}

Instructions:
- Write a complete, professional email body
- Use a ${tone} tone throughout
- Make it clear, engaging, and well-structured
- Ensure proper email etiquette
- Do not include a subject line unless specifically asked

Please respond in ${currentLocale} language.

Respond with ONLY the email body content.`;

      const response = await generateEmail(prompt);
      setGeneratedEmail(response.trim());
    } catch (error) {
      console.error('Error generating email:', error);
      // setGeneratedEmail('Sorry, there was an error generating your email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-12 gap-8 h-full">
        
        {/* LEFT COLUMN: Input */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Thoughts Input */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-100/50 rounded-xl text-blue-600">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">{t('yourThoughts')}</h2>
            </div>
            
            <textarea
              value={rawThoughts}
              onChange={(e) => setRawThoughts(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t('thoughtsPlaceholder')}
              className="w-full min-h-[160px] max-h-[400px] p-4 bg-slate-50/50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-y text-slate-700 placeholder:text-slate-400 leading-relaxed text-lg"
            />
            
            <div className="mt-4 flex items-center justifyContent-between text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                <span className="text-base">⌘</span> + <span className="text-base">↵</span> {t('generateEmail')}
              </span>
            </div>
          </motion.div>

          {/* Context Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 overflow-hidden"
          >
             <button
                onClick={() => setShowContext(!showContext)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-100/50 rounded-xl text-slate-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">{t('contextOptional')}</h2>
                    <p className="text-sm text-slate-500">{t('contextDescription')}</p>
                  </div>
                </div>
                {showContext ? <Minimize2 className="w-5 h-5 text-slate-400" /> : <Maximize2 className="w-5 h-5 text-slate-400" />}
              </button>
              
              <AnimatePresence>
                {showContext && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0">
                      <textarea
                        value={contextEmail}
                        onChange={(e) => setContextEmail(e.target.value)}
                        placeholder={t('contextPlaceholder')}
                        className="w-full h-32 p-4 bg-slate-50/50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all resize-none text-slate-700 text-sm"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
          </motion.div>

          {/* Tone Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50"
          >
             <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-indigo-100/50 rounded-xl text-indigo-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">{t('emailTone')}</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {tones.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={cn(
                    "p-3 rounded-xl border-2 text-left transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 ring-blue-500/30",
                    tone === t.value 
                      ? "border-blue-500 bg-blue-50 ring-0 shadow-sm scale-[1.02]" 
                      : "border-transparent bg-slate-50 hover:bg-slate-100 hover:border-slate-200 text-slate-600"
                  )}
                >
                  <div className={cn("font-bold text-sm", tone === t.value ? "text-blue-700" : "text-slate-700")}>
                    {t.label}
                  </div>
                  <div className="text-xs opacity-70 mt-0.5 line-clamp-1">{t.description}</div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Generate Action - Mobile/Tablet only usually, but here main CTA */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
          >
            <button
              onClick={handleGenerate}
              disabled={isLoading || !rawThoughts.trim()}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white p-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              
              {isLoading ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span>{t('craftingEmail')}</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span>{t('generateEmail')}</span>
                </>
              )}
            </button>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Output */}
        <div className="lg:col-span-7 h-full">
           <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full flex flex-col bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 relative overflow-hidden min-h-[600px]"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-green-100/50 rounded-xl text-green-600">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">{t('generatedEmail')}</h2>
              </div>
              
               <div className="flex gap-2">
                 {generatedEmail && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-all font-medium text-sm shadow-lg hover:shadow-xl active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        {t('copied')}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        {t('copy')}
                      </>
                    )}
                  </button>
                )}
               </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-y-auto relative bg-slate-50/30">
              {generatedEmail ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-slate max-w-none"
                >
                  <div className="whitespace-pre-wrap font-sans text-slate-700 text-lg leading-relaxed selection:bg-blue-100 selection:text-blue-900">
                    {generatedEmail}
                  </div>
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 animate-blob">
                    <Sparkles className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">{t('emailWillAppearHere')}</h3>
                  <p className="max-w-xs mx-auto text-slate-400">{t('getStartedPrompt')}</p>
                </div>
              )}
            </div>
            
            {/* Footer / Smart Actions (Placeholder for future) */}
            {generatedEmail && (
               <div className="p-4 border-t border-slate-100 bg-white/50 flex gap-3 overflow-x-auto">
                 {/* Can add refinement buttons here later: "Make shorter", "More formal", etc. */}
               </div>
            )}
           </motion.div>
        </div>

      </div>
    </div>
  );
}
