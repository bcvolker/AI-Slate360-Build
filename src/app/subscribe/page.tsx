export default function Subscribe() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-primary border-b border-muted/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-primary-foreground">Slate360</a>
          <div className="flex items-center gap-4">
            <a href="/" className="text-muted-foreground hover:text-primary-foreground">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Subscribe to Slate360</h1>
        <p className="text-lg text-slate-600 mb-8">Choose your plan and get started.</p>
        {/* Add subscription options here */}
      </div>
    </div>
  );
}