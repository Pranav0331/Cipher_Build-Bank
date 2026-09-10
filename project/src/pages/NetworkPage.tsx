import { useMemo, useState } from 'react';
import { ArrowUpRight, CircleAlert, FileUp, Play } from 'lucide-react';
import { GraphView } from '@/components/GraphView';
import { StatsBar } from '@/components/StatsBar';
import { UploadModal } from '@/components/UploadModal';
import { demoTransactions, emphasizedAccounts } from '@/data/demoData';
import { buildGraph, calculateAccountStats, calculateGraphStats, parseTransactions } from '@/graph/buildGraph';
import type { GraphEdge, GraphStats, SimNode, Transaction } from '@/types';
import { formatFullCurrency, formatIndianCurrency, formatTimestamp } from '@/utils/format';

export function NetworkPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(demoTransactions);
  const [stats, setStats] = useState<GraphStats>(() => {
    const g = buildGraph(demoTransactions);
    return calculateGraphStats(demoTransactions, g);
  });
  const [selectedNode, setSelectedNode] = useState<SimNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<GraphEdge | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const graph = useMemo(() => buildGraph(transactions), [transactions]);
  const isDemoData = transactions === demoTransactions;

  const loadTransactions = (next: Transaction[]) => {
    const nextGraph = buildGraph(next);
    setTransactions(next);
    setStats(calculateGraphStats(next, nextGraph));
    setSelectedNode(null);
    setSelectedEdge(null);
    setUploadOpen(false);
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = parseTransactions(String(reader.result));
        if (parsed.length === 0) throw new Error('No transaction rows found');
        loadTransactions(parsed);
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Could not read this CSV file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-36 lg:px-8 lg:pt-44">
      <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#dca86a]">Network explorer</div>
          <h1 className="display-heading text-4xl text-white sm:text-5xl">Follow the money.</h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/45">Explore a synthetic investigation scenario. Click an account or transaction to understand the context around it.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { setUploadError(''); setUploadOpen(true); }} className="flex items-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/65 transition hover:border-[#dca86a]/50 hover:text-white">
            <FileUp size={15} /> Upload CSV
          </button>
          <button onClick={() => loadTransactions(demoTransactions)} className="flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm text-[#0c1012] transition hover:bg-[#e6bc7e]">
            <Play size={14} fill="currentColor" /> Load demo network
          </button>
        </div>
      </div>

      <StatsBar stats={stats} />

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_300px]">
        <GraphView
          graph={graph}
          emphasizedIds={isDemoData ? emphasizedAccounts : []}
          onNodeSelect={setSelectedNode}
          onEdgeSelect={setSelectedEdge}
        />
        <DetailPanel node={selectedNode} edge={selectedEdge} transactions={transactions} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">Synthetic investigation scenario</div>
        <div className="text-xs text-white/35">
          {stats.timeRange ? `${formatTimestamp(stats.timeRange.start)} — ${formatTimestamp(stats.timeRange.end)}` : 'No time data'}
        </div>
      </div>

      {uploadOpen && <UploadModal error={uploadError} onClose={() => setUploadOpen(false)} onFile={handleFile} />}
    </main>
  );
}

function DetailPanel({ node, edge, transactions }: { node: SimNode | null; edge: GraphEdge | null; transactions: Transaction[] }) {
  if (!node && !edge) return (
    <div className="flex min-h-[480px] flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#101518] p-6">
      <div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#dca86a]"><CircleAlert size={17} /></div>
        <h3 className="mt-8 text-lg text-white">Select an element</h3>
        <p className="mt-3 text-sm leading-6 text-white/40">Click any account node or transaction path to inspect its underlying data.</p>
      </div>
      <div className="border-t border-white/[0.08] pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/25">Graph foundation / v0.1</div>
    </div>
  );

  if (edge) return (
    <div className="min-h-[480px] rounded-2xl border border-[#dca86a]/25 bg-[#151816] p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#dca86a]">Transaction</span>
        <span className="font-mono text-[10px] text-white/30">{edge.id}</span>
      </div>
      <div className="mt-10 flex items-center gap-3 font-mono text-sm">
        <span>{edge.source}</span><ArrowUpRight size={14} className="rotate-45 text-[#dca86a]" /><span>{edge.target}</span>
      </div>
      <div className="mt-10 space-y-5">
        <DataRow label="Amount" value={formatFullCurrency(edge.amount)} />
        <DataRow label="Timestamp" value={formatTimestamp(edge.timestamp)} />
        <DataRow label="Record ID" value={edge.id} />
      </div>
    </div>
  );

  const accountStats = calculateAccountStats(node!.id, transactions);
  return (
    <div className="min-h-[480px] rounded-2xl border border-[#dca86a]/25 bg-[#151816] p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#dca86a]">Account profile</span>
        <span className="h-2 w-2 rounded-full bg-[#87a98b]" />
      </div>
      <h3 className="mt-8 font-mono text-2xl text-white">{node!.id}</h3>
      <div className="mt-10 space-y-5">
        <DataRow label="Transactions" value={String(accountStats.transactionCount)} />
        <DataRow label="Incoming" value={formatIndianCurrency(accountStats.totalIncoming)} />
        <DataRow label="Outgoing" value={formatIndianCurrency(accountStats.totalOutgoing)} />
      </div>
      <div className="mt-9 border-t border-white/[0.08] pt-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">Connected accounts</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {accountStats.connectedAccounts.map((id) => (
            <span key={id} className="rounded border border-white/10 px-2 py-1 font-mono text-[10px] text-white/55">{id}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-white/[0.07] pb-3">
      <span className="text-xs text-white/35">{label}</span>
      <span className="text-right font-mono text-xs text-white/75">{value}</span>
    </div>
  );
}
