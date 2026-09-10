import { ArrowDownRight, FileUp, Network, Shield, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GraphView } from '@/components/GraphView';
import { demoTransactions, emphasizedAccounts } from '@/data/demoData';
import { buildGraph } from '@/graph/buildGraph';

const heroGraph = buildGraph(demoTransactions);

export function OverviewPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-36 lg:px-8 lg:pb-36 lg:pt-48">
        <div className="grid items-center gap-16 lg:grid-cols-[.86fr_1.14fr] lg:gap-10">
          <div className="relative z-10">
            <div className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#dca86a]">
              <span className="h-px w-8 bg-[#dca86a]" /> Financial crime intelligence
            </div>
            <h1 className="display-heading max-w-2xl text-5xl leading-[.97] text-white sm:text-6xl lg:text-[76px]">
              See the crime before the network <span className="text-[#dca86a]">finishes forming.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/52 sm:text-lg">
              CIPHER transforms disconnected financial transactions into an intelligent transaction graph, helping investigators uncover suspicious networks, understand how money moves, and prioritize what deserves attention.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/network" className="group flex items-center gap-3 rounded-md bg-[#dca86a] px-5 py-3 text-sm font-medium text-[#17120c] transition hover:bg-[#efc786]">
                Explore the network <ArrowDownRight size={16} className="transition group-hover:translate-x-1 group-hover:translate-y-1" />
              </Link>
              <Link to="/network" className="flex items-center gap-3 rounded-md border border-white/15 px-5 py-3 text-sm text-white/70 transition hover:border-white/35 hover:text-white">
                <FileUp size={16} /> Upload transactions
              </Link>
            </div>
            <div className="mt-12 flex gap-8 border-t border-white/[0.08] pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
              <span>Graph-native</span><span>Local-first</span><span>Explainable by design</span>
            </div>
          </div>
          <div className="relative lg:-mr-24">
            <div className="absolute -inset-12 rounded-full bg-[#b28650]/[0.05] blur-3xl" />
            <GraphView graph={heroGraph} emphasizedIds={emphasizedAccounts} compact />
            <div className="absolute -bottom-5 left-5 rounded-lg border border-white/[0.1] bg-[#12171a]/90 px-4 py-3 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#dca86a]">
                <Sparkles size={12} /> Pattern emerging
              </div>
              <div className="mt-1 text-xs text-white/50">Relationships reveal the signal.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-y border-white/[0.08] bg-[#0b0f11]">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#dca86a]">01 / The blind spot</div>
            <h2 className="display-heading text-4xl leading-tight text-white sm:text-5xl">
              Financial crime isn't a transaction. <span className="text-white/35">It's a network.</span>
            </h2>
            <p className="mt-6 text-base leading-7 text-white/48">A single transaction can look ordinary. The relationships between dozens of transactions can reveal something very different.</p>
          </div>
          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-white/[0.08] bg-[#101518] p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Traditional monitoring</span>
                <span className="rounded-full border border-white/10 px-2 py-1 font-mono text-[9px] text-white/30">Isolated view</span>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {['Transaction A', 'Transaction B', 'Transaction C', 'Transaction D'].map((x, i) => (
                  <div key={x} className="flex h-24 flex-col justify-between rounded-lg border border-white/10 bg-[#0c1012] p-3">
                    <span className="font-mono text-[10px] text-white/35">0{i + 1}</span>
                    <span className="text-xs text-white/60">{x}</span>
                    <span className="h-px w-8 bg-white/20" />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-white/35">Four events. No context. No relationship.</p>
            </div>
            <div className="rounded-xl border border-[#dca86a]/25 bg-[#121817] p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#dca86a]">CIPHER</span>
                <span className="rounded-full border border-[#dca86a]/25 px-2 py-1 font-mono text-[9px] text-[#dca86a]">Connected view</span>
              </div>
              <div className="relative mt-8 flex h-24 items-center justify-between px-4">
                <div className="absolute left-9 right-9 top-1/2 h-px bg-[#dca86a]/50" />
                {['A', 'B', 'C', 'D'].map((x) => (
                  <div key={x} className="relative flex flex-col items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dca86a]/60 bg-[#1e211c] font-mono text-xs text-[#e6bc7e]">{x}</span>
                    <span className="text-[10px] text-white/40">Account</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-[#dca86a]/65">A → B → C → D → A. Context creates signal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How CIPHER thinks */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#dca86a]">02 / The CIPHER method</div>
            <h2 className="display-heading text-4xl text-white sm:text-5xl">How CIPHER thinks.</h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-white/45">From raw transaction data to a clearer investigative starting point. No black boxes. Just connected context.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { n: '01', icon: Network, title: 'Connect', text: 'Turn transactions into a living financial network.' },
              { n: '02', icon: Zap, title: 'Discover', text: 'Identify relationships and emerging patterns.' },
              { n: '03', icon: Shield, title: 'Prioritize', text: 'Give investigators a clearer starting point.' },
            ].map(({ n, icon: Icon, title, text }) => (
              <div key={n} className="group border-t border-white/15 pt-5 transition hover:border-[#dca86a]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#dca86a]">{n}</span>
                  <Icon size={17} className="text-white/25 transition group-hover:text-[#dca86a]" />
                </div>
                <h3 className="mt-12 text-xl text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/42">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to network */}
      <section className="border-t border-white/[0.08] bg-[#0b0f11]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="display-heading text-3xl text-white sm:text-4xl">Ready to follow the money?</h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-white/45">Explore the interactive transaction network with synthetic data or upload your own CSV.</p>
            </div>
            <Link to="/network" className="group flex shrink-0 items-center gap-3 rounded-md bg-[#dca86a] px-6 py-3.5 text-sm font-medium text-[#17120c] transition hover:bg-[#efc786]">
              Open network explorer <ArrowDownRight size={16} className="transition group-hover:translate-x-1 group-hover:translate-y-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
