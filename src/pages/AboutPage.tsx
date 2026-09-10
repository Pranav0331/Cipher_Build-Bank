import { GitBranch, Network, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 pb-24 pt-36 lg:px-8 lg:pt-44">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#dca86a]">About CIPHER</div>
      <h1 className="display-heading mt-6 text-5xl text-white sm:text-6xl">Graph intelligence for financial crime investigation.</h1>

      {/* What is CIPHER */}
      <section className="mt-16">
        <h2 className="display-heading text-2xl text-white">What is CIPHER?</h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/50">
          CIPHER is a graph-based financial crime investigation system that connects accounts, transactions and time to uncover suspicious financial networks.
        </p>
      </section>

      {/* Core idea */}
      <section className="mt-14 rounded-2xl border border-[#dca86a]/20 bg-[#121817] p-8">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#dca86a]">
          <Sparkles size={13} /> Our core idea
        </div>
        <p className="display-heading mt-5 text-3xl leading-snug text-white">
          Financial crime isn't a transaction. It's a network.
        </p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/45">
          Individual transactions may appear perfectly normal while relationships across accounts and time can reveal suspicious patterns. CIPHER is built to see those relationships — not just the transactions themselves.
        </p>
      </section>

      {/* Current prototype */}
      <section className="mt-14">
        <h2 className="display-heading text-2xl text-white">Current Prototype</h2>
        <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#dca86a]/30 bg-[#dca86a]/[0.06] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[#dca86a]">
          <ShieldCheck size={14} /> Prototype — Synthetic Data Environment
        </div>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/45">
          The current prototype focuses on transaction-to-graph conversion and network visualization. It uses synthetic data only and does not yet perform fraud detection, risk scoring, or automated investigation. These capabilities will arrive in future milestones.
        </p>
      </section>

      {/* Feature cards */}
      <section className="mt-16 grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#101518] p-6">
          <Network className="text-[#dca86a]" size={20} />
          <h3 className="mt-12 text-lg text-white">Network-native</h3>
          <p className="mt-3 text-sm leading-6 text-white/40">Accounts, transactions, amounts, and time become one navigable picture.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#101518] p-6">
          <GitBranch className="text-[#dca86a]" size={20} />
          <h3 className="mt-12 text-lg text-white">Built for what's next</h3>
          <p className="mt-3 text-sm leading-6 text-white/40">Designed as a transparent foundation for future detection, risk scoring, and explainability layers.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 border-t border-white/[0.08] pt-10">
        <Link to="/network" className="inline-flex items-center gap-2 text-sm text-[#dca86a] transition hover:text-white">
          Explore the network <Sparkles size={15} />
        </Link>
      </section>
    </main>
  );
}
