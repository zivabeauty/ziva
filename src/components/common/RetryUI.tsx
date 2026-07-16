import { RefreshCw } from "lucide-react";

interface RetryUIProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function RetryUI({
  title = "Unable to load",
  message = "Please check your connection and try again.",
  onRetry,
  className = "",
}: RetryUIProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-16 text-center ${className}`}
    >
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <p className="max-w-sm text-xs font-medium leading-relaxed text-stone-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 border border-ink px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try Again
        </button>
      )}
    </div>
  );
}
