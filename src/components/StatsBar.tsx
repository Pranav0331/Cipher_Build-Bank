import { Activity, CircleDot, Layers3, WalletCards } from 'lucide-react';
import type { GraphStats } from '@/types';
import { formatIndianCurrency } from '@/utils/format';

interface StatsBarProps { stats: GraphStats; }

export function StatsBar({ stats }: StatsBarProps) {
  const items = [
    { label: 'Accounts', value: stats.accountCount.toString(), icon: CircleDot },
    { label: 'Transactions', value: stats.transactionCount.toString(), icon: Activity },
    { label: 'Transaction volume', value: formatIndianCurrency(stats.totalVolume), icon: WalletCards },
    { label: 'Network clusters', value: stats.clusterCount.toString(), icon: Layers3 },
  ];
  return <div className="grid grid-cols-2 border-y border-white/[0.08] sm:grid-cols-4">
    {items.map(({ label, value, icon: Icon }, index) => <div key={label} className={`flex items-center gap-3 px-4 py-5 sm:px-6 ${index > 0 ? 'border-l border-white/[0.08]' : ''}`}>
      <Icon size={15} strokeWidth={1.5} className="text-[#dca86a]" />
      <div><div className="font-mono text-lg tracking-tight text-white">{value}</div><div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/35">{label}</div></div>
    </div>)}
  </div>;
}
