import { Spinner } from '@nextui-org/spinner';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="relative">
          <Spinner size="lg" color="primary" className="w-12 h-12" />
          <div className="absolute inset-0 animate-ping">
            <Spinner
              size="lg"
              color="primary"
              className="w-12 h-12 opacity-75"
            />
          </div>
        </div>
        <p className="text-xl font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
