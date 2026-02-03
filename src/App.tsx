import EmailWriter from './components/EmailWriter';
import { Mail } from 'lucide-react';
import { t } from './translations';

function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-x-hidden selection:bg-blue-200 font-sans">
      {/* Background blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300/20 rounded-full blur-[128px] mix-blend-multiply filter animate-blob" />
         <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-300/20 rounded-full blur-[128px] mix-blend-multiply filter animate-blob animation-delay-2000" />
         <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-purple-300/20 rounded-full blur-[128px] mix-blend-multiply filter animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <div className="relative pt-16 pb-6 text-center px-4">
        <div className="inline-flex items-center justify-center p-2 pr-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-blue-500/5 mb-8 ring-1 ring-white/50">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Mail className="w-5 h-5" />
          </div>
          <span className="ml-3 text-lg font-bold text-slate-700">
            Emelyn
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          {t('emailWritingAssistant')}
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {t('transformThoughtsDescription')}
        </p>
      </div>

      <EmailWriter />
      
      {/* Footer */}
      <footer className="text-center py-12 text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Emelyn Mail Assistant</p>
      </footer>
    </div>
  );
}

export default App;
