import { App } from '../../types/app.types';

interface AppCardProps {
  app: App;
  onClick: () => void;
}

export function AppCard({ app, onClick }: AppCardProps) {
  return (
    <div
      onClick={onClick}
      className="card group bg-base-100 cursor-pointer transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-2 border border-base-300 overflow-hidden"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <figure
        style={{ backgroundColor: app.color }}
        className="p-8 transition-all duration-300 group-hover:p-10"
      >
        <img
          src={app.icon}
          alt={app.name}
          width="80"
          height="80"
          className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 drop-shadow-lg"
        />
      </figure>
      <div className="card-body py-4 px-4 text-center justify-center bg-gradient-to-b from-transparent to-base-200/30">
        <h4 className="font-semibold text-base group-hover:text-primary transition-colors">
          {app.name}
        </h4>
      </div>
    </div>
  );
}

