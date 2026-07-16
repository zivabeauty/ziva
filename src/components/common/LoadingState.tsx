interface LoadingStateProps {
  label?: string;
  className?: string;
}

export function LoadingState({ label = "Loading…", className = "" }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-16 ${className}`}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-200 border-t-gold" />
      <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400">
        {label}
      </p>
    </div>
  );
}
