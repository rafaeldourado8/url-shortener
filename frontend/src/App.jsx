import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Sparkles, Loader2, AlertCircle, BarChart3, Globe2, Zap } from 'lucide-react';
import BackgroundGradient from './components/BackgroundGradient';
import ResultCard from './components/ResultCard';

const App = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Pega a URL da API do arquivo .env ou usa vazio (para proxy relativo)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const validateUrl = (input) => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    
    if (!validateUrl(url)) {
      setError('Por favor, insira uma URL válida (incluindo http:// ou https://)');
      return;
    }

    setLoading(true);
    
    try {
      // Chamada real ao Backend FastAPI
      const response = await axios.post(`${API_URL}/shorten`, {
        url: url
      });
      
      setResult(response.data);
      setUrl('');
    } catch (err) {
      console.error(err);
      // Tenta pegar a mensagem de erro específica do Backend (FastAPI/Pydantic)
      const msg = err.response?.data?.detail || 'Erro ao conectar com o servidor.';
      // Se a mensagem for um array (erros de validação do Pydantic), formata
      const displayMsg = Array.isArray(msg) ? msg[0].msg : msg;
      setError(displayMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.short_url) {
      navigator.clipboard.writeText(result.short_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans overflow-x-hidden selection:bg-gradient-1 selection:text-white">
      <BackgroundGradient />
      
      {/* Header Minimalista */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 py-6 px-8 backdrop-blur-sm border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-gradient-1/20 to-gradient-2/20 rounded-xl border border-white/10">
              <Link className="w-6 h-6 text-gradient-1" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Short<span className="text-gradient-1">SaaS</span>
            </span>
          </div>
          
          <a href="https://github.com/seu-repo" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">
            GitHub v1.0
          </a>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-40 pb-20 px-4 min-h-screen flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto w-full"
        >
          {/* Hero Text */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Sistema Operacional 100% Online
            </div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            >
              URLs longas são <br />
              <span className="bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                coisa do passado.
              </span>
            </motion.h1>
            
            <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
              Infraestrutura escalável capaz de processar bilhões de requisições. 
              Encurte seus links com a tecnologia mais moderna do mercado.
            </p>
          </motion.div>

          {/* Input Section */}
          <motion.div variants={itemVariants} className="mb-12 relative z-10">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              
              <div className="relative flex flex-col md:flex-row gap-2 p-2 bg-[#0A0A0A]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Cole sua URL longa aqui..."
                  className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg font-medium"
                  disabled={loading}
                />
                
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="px-8 py-4 bg-gradient-to-r from-gradient-1 to-gradient-2 hover:opacity-90 text-white font-semibold rounded-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg shadow-gradient-1/20"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Encurtar <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 backdrop-blur-sm rounded-lg p-3 border border-red-400/20 text-sm justify-center">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Result Section */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="mb-16"
              >
                <ResultCard result={result} onCopy={handleCopy} copied={copied} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features Grid (Estático para performance visual) */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <FeatureItem 
              icon={<Zap className="w-5 h-5 text-gradient-3" />}
              title="Baixa Latência"
              desc="Redis Caching para redirecionamento em milissegundos."
            />
            <FeatureItem 
              icon={<BarChart3 className="w-5 h-5 text-gradient-1" />}
              title="Escalável"
              desc="Arquitetura pronta para milhões de acessos diários."
            />
            <FeatureItem 
              icon={<Globe2 className="w-5 h-5 text-gradient-2" />}
              title="Global"
              desc="Acessível de qualquer lugar do mundo instantaneamente."
            />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }) => (
  <div className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
    <div className="mb-3 p-2 bg-white/5 rounded-lg w-fit">{icon}</div>
    <h3 className="text-white font-medium mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);

export default App;