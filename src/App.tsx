/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Timer, 
  History, 
  Heart,
  Smartphone,
  Lock,
  PlayCircle,
  Users,
  CreditCard,
  QrCode
} from 'lucide-react';

// --- Types & Constants ---

type Step = 'intro' | 'quiz' | 'analyzing' | 'vsl';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Há quanto tempo vocês terminaram?",
    options: ["Menos de 1 semana", "1 a 4 semanas", "1 a 6 meses", "Mais de 6 meses"]
  },
  {
    id: 2,
    text: "Qual é o nível de contato atual?",
    options: ["Conversamos todos os dias", "Conversamos às vezes", "Ele(a) me bloqueou em tudo", "Não temos nenhum contato"]
  },
  {
    id: 3,
    text: "Existe outra pessoa envolvida?",
    options: ["Sim, ele(a) está namorando", "Ele(a) está ficando com alguém", "Não, está solteiro(a)", "Não tenho certeza"]
  },
  {
    id: 4,
    text: "Quem tomou a iniciativa do término?",
    options: ["Ele(a) terminou comigo", "Eu terminei", "Entramos em um acordo", "Foi uma briga explosiva"]
  },
  {
    id: 5,
    text: "Você estaria disposto(a) a mudar comportamentos se isso garantisse a volta?",
    options: ["Sim, faria qualquer coisa", "Depende da mudança", "Acho que não preciso mudar"]
  }
];

// --- Sub-components ---

const WhatsAppChat = () => {
  return (
    <div className="max-w-sm mx-auto mb-10 relative group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-transform group-hover:scale-[1.02] duration-500 bg-[#0a0a0a]"
      >
        <img 
          src="https://i.imgur.com/TF6hrbk.png" 
          alt="WhatsApp Chat" 
          className="w-full h-auto object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <div className="absolute -inset-4 bg-emerald-500/5 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

const ProgressBar = ({ current, total }: { current: number, total: number }) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden mb-8 border border-white/5">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
      />
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="inline-flex items-center gap-3 text-rose-500 font-mono font-black text-2xl mb-8 bg-rose-500/10 px-6 py-3 rounded-2xl border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
      <Timer size={24} className="animate-pulse" />
      <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [step, setStep] = useState<Step>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Analysis simulation
  useEffect(() => {
    if (step === 'analyzing') {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('vsl'), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleNextQuestion = () => {
    if ((currentQuestion === 1 || currentQuestion === 3) && !showInterstitial) {
      setShowInterstitial(true);
      return;
    }

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowInterstitial(false);
    } else {
      setStep('analyzing');
    }
  };

  const renderIntro = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto px-4 py-20 text-center"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold mb-8 border border-emerald-500/20 uppercase tracking-widest">
        <AlertCircle size={12} />
        Vagas Gratuitas Limitadas Hoje
      </div>
      
      <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8 tracking-tight">
        Descubra como fazer <span className="text-emerald-400">sua ex</span> sentir <span className="text-white underline decoration-emerald-500/50 decoration-4 underline-offset-8">SAUDADES ABSURDAS</span> em menos de 24 horas.
      </h1>
      
      <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
        O método silencioso que utiliza a <span className="text-white font-semibold">Psicologia de Reversão</span> para reativar o interesse dela sem parecer desesperado.
      </p>

      <WhatsAppChat />

      <button 
        onClick={() => setStep('quiz')}
        className="w-full md:w-auto px-10 py-6 bg-emerald-600 hover:bg-emerald-500 text-black text-xl font-black rounded-2xl shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] transition-all transform hover:scale-105 flex items-center justify-center gap-3 group active:scale-95"
      >
        QUERO COMEÇAR A RECONQUISTA
        <ChevronRight className="group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-10 opacity-40">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-emerald-500" size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">Método Comprovado</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="text-emerald-500" size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">100% Anônimo</span>
        </div>
        <div className="flex items-center gap-2 hidden md:flex">
          <Timer className="text-emerald-500" size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">Resultado Rápido</span>
        </div>
      </div>
    </motion.div>
  );

  const renderQuiz = () => {
    const q = QUESTIONS[currentQuestion];

    if (showInterstitial) {
      const isFirstInterstitial = currentQuestion === 1;
      
      return (
        <motion.div 
          key={`interstitial-${currentQuestion}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="max-w-xl mx-auto px-6 py-12"
        >
          <div className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className={`absolute -top-12 -left-12 w-48 h-48 ${isFirstInterstitial ? 'bg-emerald-500/10' : 'bg-rose-500/10'} blur-[60px] rounded-full`} />
            
            <div className="relative z-10">
              <h3 className={`${isFirstInterstitial ? 'text-emerald-500' : 'text-rose-500'} font-black uppercase tracking-widest text-xs mb-6`}>
                {isFirstInterstitial ? 'Fato Psicológico Importante' : 'Análise Preliminar'}
              </h3>
              
              <p className="text-white text-lg md:text-xl font-bold leading-relaxed mb-8">
                {isFirstInterstitial ? (
                  <>
                    Existe uma coisa que quase ninguém te conta sobre mulheres… 
                    <span className="text-gray-400 font-normal"> O sentimento não acaba do nada. Ele muda de intensidade com base no seu comportamento.</span>
                  </>
                ) : (
                  <>
                    Com base nas suas respostas, a situação é mais delicada do que parece.
                    <span className="text-gray-400 font-normal text-base block mt-2"> Mas ainda dá tempo. O que você precisa entender agora é:</span>
                  </>
                )}
              </p>

              <div className="mb-8 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <img 
                  src={isFirstInterstitial ? "https://i.imgur.com/FyfRLbs.png" : "https://i.imgur.com/AWBQOwz.png"} 
                  alt="Psicologia" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-6 text-gray-400 text-sm leading-relaxed mb-10">
                {isFirstInterstitial ? (
                  <>
                    <p>
                      E dependendo do que você faz depois do término, você pode: <span className="text-emerald-400 font-bold uppercase tracking-tight">reacender o interesse</span> OU apagar de vez qualquer chance.
                    </p>
                    <p className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-xl text-rose-200/70 border-l-4 border-l-rose-500">
                      👉 O problema é que <span className="font-bold underline">93% dos homens</span> fazem exatamente o oposto do que funciona.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="space-y-3">
                      <p className="flex items-start gap-3">
                        <span className="shrink-0 text-emerald-500">👉</span> 
                        <span>não é sobre "mandar mensagem"</span>
                      </p>
                      <p className="flex items-start gap-3">
                        <span className="shrink-0 text-emerald-500">👉</span> 
                        <span>é sobre COMO essa mensagem ativa a mente dela.</span>
                      </p>
                    </div>
                    <p className="border-l-2 border-rose-500/30 pl-4 py-1">
                      Porque existe uma sequência específica de 3 etapas que faz ela: <span className="text-white font-bold">sentir sua falta, questionar a decisão e voltar a pensar em você</span> de forma emocional.
                    </p>
                    <p className="font-black text-white uppercase tracking-widest text-[10px] bg-white/5 py-2 px-4 rounded-full inline-block">
                      E é exatamente isso que você vai ver agora.
                    </p>
                  </>
                )}
              </div>

              <button 
                onClick={handleNextQuestion}
                className={`w-full py-5 ${isFirstInterstitial ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-white hover:bg-gray-200'} text-black font-black text-lg rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group group-active:scale-95`}
              >
                CONTINUAR ANÁLISE
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div 
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-xl mx-auto px-6 py-16"
      >
        <ProgressBar current={currentQuestion + 1} total={QUESTIONS.length} />
        
        <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase rounded-full border border-emerald-500/20 mb-6 tracking-widest">
          Passo {String(currentQuestion + 1).padStart(2, '0')} de {String(QUESTIONS.length).padStart(2, '0')}: Perfil Emocional
        </span>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-tight">
          {q.text}
        </h2>

        <div className="grid gap-4">
          {q.options.map((option, idx) => (
            <button
              key={idx}
              onClick={handleNextQuestion}
              className="group flex items-center justify-between p-6 bg-[#111111] border border-white/10 rounded-2xl hover:border-emerald-500/50 hover:bg-[#161616] transition-all text-left"
            >
              <div className="flex items-center gap-5">
                <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-mono text-xs text-gray-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{option}</span>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-white/10 group-hover:border-emerald-500 group-hover:bg-emerald-500/20 flex items-center justify-center transition-all">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_5px_#10b981]" />
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderAnalyzing = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto px-6 py-32 text-center"
    >
      <div className="relative w-32 h-32 mx-auto mb-12">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={351.8}
            strokeDashoffset={351.8 - (351.8 * analysisProgress) / 100}
            className="text-emerald-500 filter drop-shadow-[0_0_8px_#10b981]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-black text-3xl text-emerald-500">
          {analysisProgress}%
        </div>
      </div>

      <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Processando Perfil...</h3>
      <div className="space-y-3 text-xs uppercase tracking-widest font-bold">
        <p className={analysisProgress > 20 ? "text-emerald-400" : "text-white/20 transition-colors"}>Cruzando dados de término</p>
        <p className={analysisProgress > 50 ? "text-emerald-400" : "text-white/20 transition-colors"}>Avaliando gatilhos de saudades</p>
        <p className={analysisProgress > 80 ? "text-emerald-400" : "text-white/20 transition-colors"}>Desbloqueando plano de reentrada</p>
      </div>
    </motion.div>
  );

  const renderVSL = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#050505] min-h-screen text-[#e0e0e0]"
    >
      <header className="bg-rose-600/10 border-b border-rose-500/20 text-rose-500 text-center py-3 px-4 font-black text-[10px] uppercase tracking-[0.2em]">
         ⚠️ AVISO DE SIGILO: Conteúdo sensível reservado apenas para alunos.
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6 bg-emerald-500/5 px-4 py-2 rounded-full border border-emerald-500/10">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-blink shadow-[0_0_8px_#10b981]" />
             <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Análise Final Concluída</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tighter">Probabilidade de êxito: <span className="text-emerald-500">91.7%</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Siga o <span className="text-white font-bold">Protocolo de Reentrada</span> detalhado no vídeo abaixo antes que ela tome uma decisão permanente.</p>
        </div>

        {/* Video Section */}
        <div className="relative aspect-video bg-[#0a0a0a] rounded-[2.5rem] shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] mb-16 overflow-hidden border border-white/5">
          <video 
            className="w-full h-full object-cover"
            controls
            playsInline
            poster="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=1200"
          >
            <source src="https://i.imgur.com/wzAh14M.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        </div>

        {/* Storytelling & Authority */}
        <section className="grid md:grid-cols-2 gap-10 mb-20">
          <div className="bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <History size={160} />
            </div>
            <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-white uppercase tracking-wider">
              <span className="w-8 h-8 rounded-lg bg-emerald-500 text-black flex items-center justify-center text-xs">M</span> 
              Nossa Missão
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm italic">
              "Virar o jogo da rejeição para atração"
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6 p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 shadow-sm hover:border-emerald-500/30 transition-all group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                <TrendingUp size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1 uppercase text-xs tracking-widest">O Erro do Contato Zero</h4>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">Por que a maioria das pessoas faz o contato zero de forma errada e perde a conexão para sempre.</p>
              </div>
            </div>
            <div className="flex gap-6 p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 shadow-sm hover:border-emerald-500/30 transition-all group">
              <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-rose-500/20 group-hover:bg-rose-500 group-hover:text-black transition-colors">
                <Heart size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1 uppercase text-xs tracking-widest">A Neuro-Obssessão</h4>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">Como injetar gatilhos de dopamina que farão o cérebro dela priorizar você acima de tudo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Text for Social Proof */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 space-y-6 max-w-2xl mx-auto text-left"
        >
          <h3 className="text-2xl font-black text-white leading-tight">E olha… você não está aqui por acaso.</h3>
          <p className="text-gray-400">Você está aqui porque sabe que sua ex não te enxerga mais como antes.</p>
          
          <div className="space-y-4 pt-4">
            <p className="font-bold text-white uppercase tracking-tighter text-sm">E agora você só tem duas opções:</p>
            <div className="bg-rose-500/5 border border-rose-500/10 p-5 rounded-3xl flex gap-4 items-start">
              <span className="shrink-0 text-xl">❌</span>
              <p className="text-rose-200/70 text-sm leading-relaxed">Continuar mandando mensagens aleatórias, vendo ela correr pros braços de outro.</p>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-3xl flex gap-4 items-start">
              <span className="shrink-0 text-xl">✅</span>
              <p className="text-emerald-200/70 text-sm leading-relaxed">Ou aplicar mensagens cirúrgicas do protocolo, que fazem ela querer se comprometer de novo.</p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-white font-bold mb-3">O Código da Reconquista te entrega exatamente:</p>
            <p className="text-emerald-400 font-black flex items-center gap-3 bg-emerald-500/5 py-4 px-6 rounded-2xl border border-emerald-500/10">
              <span className="text-xl">👉</span> O que dizer, quando dizer e como manter a mente dela viciada em você.
            </p>
          </div>
        </motion.div>

        {/* Social Proof */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "https://i.imgur.com/YGDasca.png",
              "https://i.imgur.com/5Wt0Vsv.png",
              "https://i.imgur.com/6dlZ7ej.png"
            ].map((url, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl hover:border-emerald-500/30 transition-all group"
              >
                <img 
                  src={url} 
                  alt={`Social Proof ${i + 1}`} 
                  className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-2xl mx-auto text-left space-y-6"
          >
            <p className="text-emerald-400 font-black uppercase tracking-widest text-sm">E aqui está a melhor parte:</p>
            
            <p className="text-white text-lg font-bold leading-relaxed">
              Esses caras estavam exatamente onde você está agora.
            </p>

            <div className="space-y-3">
              <p className="text-gray-400 flex items-start gap-3">
                <span className="shrink-0 text-emerald-500">➡️</span> 
                <span>Bloqueados no WhatsApp.</span>
              </p>
              <p className="text-gray-400 flex items-start gap-3">
                <span className="shrink-0 text-emerald-500">➡️</span> 
                <span>Ignorados.</span>
              </p>
              <p className="text-gray-400 flex items-start gap-3">
                <span className="shrink-0 text-emerald-500">➡️</span> 
                <span>Cheios de arrependimento, dúvidas e medo de nunca mais ter uma chance.</span>
              </p>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Mas decidiram agir. E quando aplicaram o protocolo, o jogo virou.
            </p>

            <div className="space-y-2 border-l-2 border-emerald-500/30 pl-6 py-2">
              <p className="text-white font-medium italic">"Hoje, são eles que recebem mensagem primeiro."</p>
              <p className="text-white font-medium italic">"São eles que fazem a ex sentir saudade de novo."</p>
              <p className="text-white font-medium italic">"São eles que escolheram se queriam voltar — ou se era tarde demais pra ela."</p>
            </div>

            <p className="text-gray-400 leading-relaxed">
              E tudo começou com uma única decisão: <br />
              <span className="text-white font-black uppercase tracking-tight">Desbloquear o poder de reprogramar o cérebro da ex com o Código da Reconquista.</span>
            </p>

            <p className="text-emerald-400 font-bold bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10 inline-block">
              E você pode tomar essa mesma decisão apertando o botão abaixo:
            </p>
          </motion.div>
        </section>

        {/* Final CTA Card */}
        <div className="bg-emerald-600 p-1 rounded-[3.5rem] shadow-[0_0_100px_-20px_rgba(16,185,129,0.4)] transform hover:scale-[1.01] transition-transform duration-500">
          <div className="bg-[#050505] p-10 md:p-20 rounded-[3.3rem] text-center relative overflow-hidden">
             <div className="absolute -top-12 -right-12 opacity-[0.03] text-emerald-500">
               <Smartphone size={400} />
             </div>
             
             <div className="relative z-10">
               <div className="flex flex-col items-center">
                 <div className="mb-6 px-4 py-1.5 bg-rose-600 text-white text-[10px] font-black uppercase tracking-[0.25em] rounded-full animate-bounce shadow-lg shadow-rose-600/20">
                   Oferta por tempo limitado
                 </div>
                 
                 <CountdownTimer />

                 <h3 className="text-4xl md:text-6xl font-black mb-4 text-white tracking-tighter uppercase leading-none italic">
                   Acesso Vitalício <span className="text-emerald-500">Liberado</span>
                 </h3>
                 
                 <p className="mb-12 text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                   Junte-se a mais de <span className="text-emerald-500 font-black underline decoration-emerald-500/30 underline-offset-4">15.000 homens</span> que recuperaram sua dignidade e seu relacionamento usando este sistema.
                 </p>

                 <div className="mb-12 flex flex-col items-center gap-2">
                   <span className="text-gray-500 line-through text-xl font-bold">R$ 99,99</span>
                   <div className="flex items-baseline gap-2">
                     <span className="text-emerald-500 text-2xl font-black italic">R$</span>
                     <span className="text-7xl md:text-8xl font-black text-white tracking-tighter shadow-sm">29,90</span>
                   </div>
                   <span className="text-emerald-500/60 text-[10px] font-black uppercase tracking-widest mt-2">Pagamento único • Sem mensalidades</span>
                 </div>
                 
                 <button className="w-full max-w-md py-8 bg-emerald-600 hover:bg-emerald-500 text-black text-2xl font-black rounded-[2rem] shadow-[0_20px_50px_rgba(5,150,105,0.3)] hover:shadow-[0_25px_60px_rgba(5,150,105,0.4)] transition-all uppercase tracking-tight flex flex-col items-center justify-center gap-1 group group-active:scale-95">
                    <div className="flex items-center gap-3">
                      DESBLOQUEAR MEU PROTOCOLO AGORA
                      <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                    </div>
                    <span className="text-[10px] opacity-60 font-medium tracking-widest">Acesso imediato via e-mail</span>
                 </button>

                 <div className="mt-8 flex items-center gap-6 opacity-60 animate-pulse">
                   <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase">
                     <CreditCard size={14} className="text-emerald-500" /> Cartão
                   </div>
                   <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase">
                     <QrCode size={14} className="text-emerald-500" /> PIX
                   </div>
                 </div>
                 
                 <div className="mt-12 flex flex-wrap justify-center gap-10 text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
                   <div className="flex items-center gap-2 text-white"><Users size={14} className="text-emerald-500" /> Suporte VIP 24h</div>
                   <div className="flex items-center gap-2 text-white"><CheckCircle2 size={14} className="text-emerald-500" /> Método 100% comprovado</div>
                   <div className="flex items-center gap-2 text-white"><AlertCircle size={14} className="text-emerald-500" /> Garantia 7 Dias</div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        <footer className="mt-24 text-center text-[10px] text-gray-600 pb-20 max-w-lg mx-auto leading-loose italic">
          &copy; 2026 MÉTODO RECONQUISTA PRÓ. DOCUMENTO DE ACESSO RESTRITO. <br />
          ESTE SITE NÃO POSSUI VÍNCULO COM PLATAFORMAS DE REDES SOCIAIS. <br />
          RESULTADOS PODEM VARIAR DE ACORDO COM A APLICAÇÃO DO ALUNO.
        </footer>
      </main>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      <AnimatePresence mode="wait">
        {step === 'intro' && renderIntro()}
        {step === 'quiz' && renderQuiz()}
        {step === 'analyzing' && renderAnalyzing()}
        {step === 'vsl' && renderVSL()}
      </AnimatePresence>
    </div>
  );
}
