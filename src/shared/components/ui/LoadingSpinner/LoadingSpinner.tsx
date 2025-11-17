interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`text-center ${className}`}>
      <span className="loading loading-spinner" />
    </div>
  );
}

