import { Activity, ChevronRight, Gauge, Lightbulb, ListChecks, Network, Shield, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const placeholders = [
  { icon: Gauge, title: 'Risk Score', description: 'A per-network risk score will be computed from structural and behavioral signals.' },
  { icon: Network, title: 'Suspicious Networks', description: 'Detected subgraphs that exhibit suspicious flow patterns will be listed here.' },
  { icon: Lightbulb, title: 'Why Flagged', description: 'Explainability traces will show the structural reasons behind each flag.' },
  { icon: Target, title: 'Investigation Priority', description: 'Networks will be ranked by priority so investigators know where to start.' },
  { icon: ListChecks, title: 'Recommended Action', description: 'Suggested next steps will guide the investigator through the workflow.' },
];

export function InvestigationPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-36 lg:px-8 lg:pt-44">
      <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#dca86a]">Investigation Center</div>
      <h1 className="display-heading text-4xl text-white sm:text-5xl">Investigation Center</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-white/45">
        CIPHER's detection engine will live here. The next milestone will add suspicious-network detection, risk scoring, and explainability — turning the transaction graph into actionable investigation leads.
      </p>

      {/* Empty state */}
      <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.12] bg-[#0b0f11] px-6 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#dca86a]/30 text-[#dca86a]">
          <Shield size={26} />
        </div>
        <h2 className="display-heading mt-8 text-3xl text-white">Detection engine coming in the next milestone.</h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-white/40">
          For now, CIPHER provides the network foundation. Suspicious pattern detection, risk scoring, and the investigator workflow will be built on top of the graph you can explore today.
        </p>
        <Link to="/network" className="mt-8 inline-flex items-center gap-2 text-sm text-[#dca86a] transition hover:text-white">
          Explore the network <ChevronRight size={15} />
        </Link>
      </div>

      {/* Placeholder cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholders.map(({ icon: Icon, title, description }) => (
          <div key={title} className="group rounded-xl border border-white/[0.08] bg-[#101518] p-6 transition hover:border-white/15">
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/30 transition group-hover:text-[#dca86a]/70">
                <Icon size={17} />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/20">Coming soon</span>
            </div>
            <h3 className="mt-12 text-lg text-white/80">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/35">{description}</p>
          </div>
        ))}
      </div>

      {/* Pipeline preview */}
      <div className="mt-10 rounded-xl border border-white/[0.08] bg-[#0b0f11] p-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
          <Activity size={13} className="text-[#dca86a]" /> Future pipeline
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/40">
          {['Graph Construction', 'Pattern Detection', 'Anomaly Detection', 'Risk Scoring', 'Explainability', 'Investigator Dashboard'].map((step, i, arr) => (
            <span key={step} className="flex items-center gap-3">
              <span className="rounded border border-white/10 px-2.5 py-1 font-mono text-[10px] text-white/50">{step}</span>
              {i < arr.length - 1 && <ChevronRight size={13} className="text-white/20" />}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
