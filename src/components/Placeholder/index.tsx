const Placeholder: React.FC = () => {
  return (
    <div className="border border-gray-200 shadow p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded" />
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-300 rounded w-1/4" />
          <div className="h-6 bg-gray-300 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
