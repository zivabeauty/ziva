import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-16 text-center ${className}`}
    >
      {icon && <div className="text-stone-300">{icon}</div>}
      <h3 className="text-base font-bold text-ink">{title}</h3>
      {description && (
        <p className="max-w-sm text-xs font-medium leading-relaxed text-stone-500">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
