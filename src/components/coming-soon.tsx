const ComingSoon = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <h1 className="font-title mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
        🧪 Under Development
      </h1>
      <p className="mb-8 max-w-md text-center text-lg text-gray-400 sm:text-xl">
        Researchers are engineering the most dangerously effective memory
        training system ever built
      </p>

      <div className="relative h-6 w-64 overflow-hidden rounded-full bg-gray-700">
        <div className="absolute inset-0 w-1/2 animate-pulse rounded-full bg-gradient-to-r from-green-400 to-green-600" />
      </div>

      <p className="mt-4 text-sm text-gray-500 italic">
        Hang tight! Memory upgrades arriving soon...
      </p>

      <footer className="mt-12 text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Memio Labs
      </footer>
    </div>
  );
};

export default ComingSoon;
