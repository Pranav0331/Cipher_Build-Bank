import { useState } from 'react';
import { FileUp, X } from 'lucide-react';

interface UploadModalProps {
  error: string;
  onClose: () => void;
  onFile: (file: File) => void;
}

export function UploadModal({ error, onClose, onFile }: UploadModalProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputId = 'csv-file-input';

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#111618] p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#dca86a]">Local data import</div>
            <h2 className="display-heading mt-3 text-3xl text-white">Upload transactions.</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white" aria-label="Close upload dialog"><X size={20} /></button>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/45">Bring a CSV file into the graph. Your data stays in this browser and is not sent anywhere.</p>
        <label
          htmlFor={fileInputId}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`mt-8 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-5 py-12 text-center transition ${dragOver ? 'border-[#dca86a] bg-[#dca86a]/[0.12]' : 'border-[#dca86a]/45 bg-[#dca86a]/[0.04] hover:bg-[#dca86a]/[0.09]'}`}
        >
          <FileUp size={25} className="text-[#dca86a]" />
          <span className="mt-4 text-sm text-white/75">Choose a CSV file or drag it here</span>
          <span className="mt-2 font-mono text-[10px] text-white/30">transaction_id, sender, receiver, amount, timestamp</span>
        </label>
        <input id={fileInputId} type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) onFile(file); }} />
        {error && <div className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-xs text-red-200">{error}</div>}
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-5">
          <span className="text-xs text-white/30">CSV only · local processing</span>
          <button onClick={onClose} className="text-xs text-white/45 hover:text-white">Cancel</button>
        </div>
      </div>
    </div>
  );
}
