import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Maximize2, Minus, Plus, RotateCcw } from 'lucide-react';
import type { GraphData, GraphEdge, SimNode, SimulationGraph } from '@/types';
import { createSimulation, stepSimulation } from '@/graph/forceSimulation';
import { formatIndianCurrency } from '@/utils/format';

interface GraphViewProps {
  graph: GraphData;
  emphasizedIds?: string[];
  compact?: boolean;
  onNodeSelect?: (node: SimNode) => void;
  onEdgeSelect?: (edge: GraphEdge) => void;
}

const WIDTH = 760;
const HEIGHT = 480;

export function GraphView({
  graph,
  emphasizedIds = [],
  compact = false,
  onNodeSelect,
  onEdgeSelect,
}: GraphViewProps) {
  const [sim, setSim] = useState<SimulationGraph>(() => createSimulation(graph, WIDTH, HEIGHT));
  const [, setTick] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setSim(createSimulation(graph, WIDTH, HEIGHT));
    setTick((value) => value + 1);
  }, [graph]);

  useEffect(() => {
    let frame = 0;
    let iteration = 0;
    const animate = () => {
      if (iteration < 180) {
        stepSimulation(sim, WIDTH, HEIGHT);
        setTick((value) => value + 1);
        iteration++;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [sim]);

  const nodeMap = useMemo(() => new Map(sim.nodes.map((node) => [node.id, node])), [sim]);

  const handlePointerMove = useCallback((event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * WIDTH;
    const y = ((event.clientY - rect.top) / rect.height) * HEIGHT;
    const node = nodeMap.get(dragging);
    if (node) {
      node.fx = Math.max(30, Math.min(WIDTH - 30, x + dragOffset.current.x));
      node.fy = Math.max(30, Math.min(HEIGHT - 30, y + dragOffset.current.y));
      node.x = node.fx;
      node.y = node.fy;
      setTick((value) => value + 1);
    }
  }, [dragging, nodeMap]);

  const handlePointerUp = () => {
    if (dragging) {
      const node = nodeMap.get(dragging);
      if (node) {
        node.fx = null;
        node.fy = null;
      }
    }
    setDragging(null);
  };

  const restart = () => {
    setSim(createSimulation(graph, WIDTH, HEIGHT));
    setZoom(1);
  };

  const radius = compact ? 4 : 7;
  const viewHeight = compact ? 330 : HEIGHT;

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1115] ${compact ? 'h-[330px]' : 'h-[480px]'}`}>
      <svg
        viewBox={`0 0 ${WIDTH} ${viewHeight}`}
        className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <defs>
          <pattern id="network-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#ffffff" strokeOpacity="0.035" strokeWidth="1" />
          </pattern>
          <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#74818a" opacity="0.72" />
          </marker>
        </defs>
        <rect width={WIDTH} height={viewHeight} fill="url(#network-grid)" />
        <g transform={`translate(${WIDTH / 2 * (1 - zoom)}, ${viewHeight / 2 * (1 - zoom)}) scale(${zoom})`}>
          {sim.edges.map((edge) => {
            const source = nodeMap.get(edge.source);
            const target = nodeMap.get(edge.target);
            if (!source || !target) return null;
            const highlighted = emphasizedIds.includes(edge.source) && emphasizedIds.includes(edge.target);
            return (
              <g key={edge.id} onClick={() => onEdgeSelect?.(edge)} className="cursor-pointer">
                <line
                  x1={source.x} y1={source.y} x2={target.x} y2={target.y}
                  stroke={highlighted ? '#dca86a' : '#58656d'}
                  strokeWidth={highlighted ? 1.7 : 1}
                  strokeOpacity={highlighted ? 0.7 : 0.45}
                  strokeDasharray={highlighted ? '5 5' : undefined}
                  markerEnd="url(#arrow)"
                >
                  {highlighted && <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.4s" repeatCount="indefinite" />}
                </line>
              </g>
            );
          })}
          {sim.nodes.map((node) => {
            const emphasized = emphasizedIds.includes(node.id);
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onClick={() => onNodeSelect?.(node)}
                onPointerDown={(event) => {
                  event.stopPropagation();
                  const rect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  if (rect) {
                    const x = ((event.clientX - rect.left) / rect.width) * WIDTH;
                    const y = ((event.clientY - rect.top) / rect.height) * HEIGHT;
                    dragOffset.current = { x: node.x - x, y: node.y - y };
                  }
                  setDragging(node.id);
                }}
              >
                {emphasized && <circle r={radius * 2.4} fill="#dca86a" opacity="0.12" filter="url(#node-glow)" />}
                <circle r={radius * 1.7} fill={emphasized ? '#dca86a' : '#8e9ba0'} opacity="0.12" />
                <circle r={radius} fill={emphasized ? '#dca86a' : '#b9c4c5'} stroke={emphasized ? '#f3c982' : '#d8e0df'} strokeWidth="1" />
                {!compact && <text y={radius + 17} textAnchor="middle" fill={emphasized ? '#eed19e' : '#97a4a8'} fontSize="10" fontFamily="monospace">{node.label}</text>}
              </g>
            );
          })}
        </g>
      </svg>
      <div className="absolute right-4 top-4 flex gap-1 rounded-lg border border-white/10 bg-[#141a1e]/80 p-1 backdrop-blur-sm">
        <button onClick={() => setZoom((value) => Math.min(1.6, value + 0.15))} className="rounded-md p-1.5 text-white/55 transition hover:bg-white/10 hover:text-white" aria-label="Zoom in"><Plus size={14} /></button>
        <button onClick={() => setZoom((value) => Math.max(0.7, value - 0.15))} className="rounded-md p-1.5 text-white/55 transition hover:bg-white/10 hover:text-white" aria-label="Zoom out"><Minus size={14} /></button>
        <button onClick={restart} className="rounded-md p-1.5 text-white/55 transition hover:bg-white/10 hover:text-white" aria-label="Reset network"><RotateCcw size={14} /></button>
        <button onClick={() => setZoom(1.35)} className="rounded-md p-1.5 text-white/55 transition hover:bg-white/10 hover:text-white" aria-label="Focus network"><Maximize2 size={14} /></button>
      </div>
      {!compact && <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/30"><span className="h-1.5 w-1.5 rounded-full bg-[#dca86a]" /> Synthetic transaction network <span className="text-white/15">/</span> drag to explore</div>}
      {compact && <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.18em] text-white/30">Live network formation</div>}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,#0d1115_100%)] opacity-35" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,rgba(220,168,106,0.08),transparent_32%),radial-gradient(circle_at_80%_75%,rgba(112,140,146,0.08),transparent_30%)]" />
    </div>
  );
}

export function GraphLegend() {
  return (
    <div className="flex flex-wrap items-center gap-5 text-xs text-white/45">
      <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-[#dca86a]" /> Connected flow</span>
      <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-[#b9c4c5]" /> Account</span>
      <span className="flex items-center gap-2"><i className="h-px w-5 bg-white/35" /> Transaction path</span>
      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">{formatIndianCurrency(4270000)} observed value</span>
    </div>
  );
}
