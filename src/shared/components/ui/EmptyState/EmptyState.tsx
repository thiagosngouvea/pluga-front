interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="bg-base-200 rounded-full p-6 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16 text-base-content/50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-base-content">
        Nenhum resultado encontrado
      </h3>
      <p className="text-base-content/60 text-center max-w-md">
        {message}
      </p>
      <p className="text-sm text-base-content/50 mt-4">
        Tente usar termos diferentes ou mais gerais
      </p>
    </div>
  );
}

