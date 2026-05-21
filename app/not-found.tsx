export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-950 mb-4 font-outfit">404</h1>
        <p className="text-slate-600 mb-8">This flavor hasn't been discovered yet.</p>
        <a href="/" className="bg-curio-terracotta text-white px-8 py-3 rounded-curio font-bold hover:bg-curio-terracotta/90 transition-all">
          Back to Home
        </a>
      </div>
    </div>
  );
}