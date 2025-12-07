import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink, BarChart } from 'lucide-react';

const ResultCard = ({ result, onCopy, copied }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 25 }}
      className="max-w-3xl mx-auto"
    >
      <div className="relative group">
        {/* Efeito de gradiente ao redor */}
        <div className="absolute -inset-1 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
        
        <div className="relative p-8 bg-glass backdrop-blur-lg rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-1/10 rounded-lg">
                <BarChart className="w-5 h-5 text-gradient-1" />
              </div>
              <h3 className="text-xl font-semibold">URL Encurtada com Sucesso!</h3>
            </div>
            
            <div className="px-3 py-1 bg-gradient-1/10 rounded-full">
              <span className="text-sm font-medium text-gradient-1">Ao Vivo</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* URL Original */}
            <div>
              <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                <span>URL Original</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
              </p>
              <div className="p-4 bg-black/30 rounded-xl border border-glass-border">
                <p className="text-gray-300 break-all">{result.original_url}</p>
              </div>
            </div>
            
            {/* URL Encurtada */}
            <div>
              <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                <span>URL Encurtada</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 p-4 bg-gradient-to-r from-gradient-1/5 to-gradient-2/5 rounded-xl border border-glass-border">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-gradient-1/20 rounded-md">
                      <ExternalLink className="w-4 h-4 text-gradient-1" />
                    </div>
                    <a
                      href={result.short_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-gradient-1 hover:text-gradient-2 transition-colors break-all"
                    >
                      {result.short_url}
                    </a>
                  </div>
                </div>
                
                <motion.button
                  onClick={onCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 bg-gradient-to-r from-gradient-1 to-gradient-2 text-white font-semibold rounded-xl flex items-center justify-center gap-3 min-w-[140px]"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copiar URL
                    </>
                  )}
                </motion.button>
              </div>
            </div>
            
            {/* Analytics Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-glass-border">
              <div className="text-center p-4 bg-black/20 rounded-xl">
                <div className="text-2xl font-bold text-gradient-1">0</div>
                <div className="text-sm text-gray-400">Cliques</div>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-xl">
                <div className="text-2xl font-bold text-gradient-2">100%</div>
                <div className="text-sm text-gray-400">Taxa de Sucesso</div>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-xl">
                <div className="text-2xl font-bold text-gradient-3">0</div>
                <div className="text-sm text-gray-400">Países</div>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-xl">
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-sm text-gray-400">Expiração</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-glass-border">
            <p className="text-sm text-gray-400 text-center">
              Esta URL está pronta para ser compartilhada. Monitoramento ativado.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;