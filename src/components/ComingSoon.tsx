import { Clock, Flame, Package } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  items: string[];
}

export const ComingSoon = ({ title, items }: ComingSoonProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-700/40 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-600/40 to-transparent" />
      </div>

      <div className="relative z-10 py-20 px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-800 border border-neutral-700/60 mb-8 animate-float">
          <Clock className="w-7 h-7 text-neutral-400" />
        </div>

        <p className="text-[11px] font-bold tracking-[0.35em] uppercase text-neutral-500 mb-3">
          Coming Soon
        </p>

        <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h3>

        <p className="text-neutral-500 max-w-md mx-auto mb-10 leading-relaxed">
          Estamos preparando algo especial. Estos productos estarán disponibles muy pronto.
        </p> 

        <div className="flex flex-wrap justify-center gap-3 max-w-sm mx-auto">
          {items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800/80 border border-neutral-700/50 text-sm text-neutral-400"
            >
              {item === 'Mecheros' ? (
                <Package className="w-3.5 h-3.5 text-neutral-500" />
              ) : (
                <Package className="w-3.5 h-3.5 text-neutral-500" />
              )}
              {item}
            </span>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse [animation-delay:0.2s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
};
