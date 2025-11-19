interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 ${className}`}>
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="mt-4 text-base-content/60 font-medium">Carregando ferramentas...</p>
    </div>
  );
}

