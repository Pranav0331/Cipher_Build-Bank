import type { GraphData, SimulationGraph, SimNode, SimEdge } from '@/types';

export function createSimulation(graph: GraphData, width: number, height: number): SimulationGraph {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.32;

  const nodes: SimNode[] = graph.nodes.map((n, i) => {
    const angle = (i / graph.nodes.length) * Math.PI * 2;
    return {
      id: n.id,
      label: n.label,
      x: cx + Math.cos(angle) * radius + (Math.random() - 0.5) * 20,
      y: cy + Math.sin(angle) * radius + (Math.random() - 0.5) * 20,
      vx: 0,
      vy: 0,
      fx: null,
      fy: null,
    };
  });

  const edges: SimEdge[] = graph.edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    amount: e.amount,
    timestamp: e.timestamp,
  }));

  return { nodes, edges };
}

export function stepSimulation(
  sim: SimulationGraph,
  width: number,
  height: number,
  opts?: { linkStrength?: number; chargeStrength?: number; centerStrength?: number }
): void {
  const linkStrength = opts?.linkStrength ?? 0.05;
  const chargeStrength = opts?.chargeStrength ?? 800;
  const centerStrength = opts?.centerStrength ?? 0.02;

  const nodeMap = new Map(sim.nodes.map((n) => [n.id, n]));
  const cx = width / 2;
  const cy = height / 2;

  // Link forces (spring toward ideal length)
  for (const edge of sim.edges) {
    const s = nodeMap.get(edge.source);
    const t = nodeMap.get(edge.target);
    if (!s || !t) continue;
    const dx = t.x - s.x;
    const dy = t.y - s.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const idealDist = 120;
    const force = (dist - idealDist) * linkStrength;
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;
    s.vx += fx;
    s.vy += fy;
    t.vx -= fx;
    t.vy -= fy;
  }

  // Repulsion between all nodes
  for (let i = 0; i < sim.nodes.length; i++) {
    for (let j = i + 1; j < sim.nodes.length; j++) {
      const a = sim.nodes[i];
      const b = sim.nodes[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist2 = dx * dx + dy * dy || 1;
      const dist = Math.sqrt(dist2);
      const force = chargeStrength / dist2;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      a.vx -= fx;
      a.vy -= fy;
      b.vx += fx;
      b.vy += fy;
    }
  }

  // Centering force
  for (const node of sim.nodes) {
    node.vx += (cx - node.x) * centerStrength;
    node.vy += (cy - node.y) * centerStrength;
  }

  // Apply velocity with damping
  const damping = 0.82;
  for (const node of sim.nodes) {
    if (node.fx != null) {
      node.x = node.fx;
      node.vx = 0;
    } else {
      node.x += node.vx * damping;
    }
    if (node.fy != null) {
      node.y = node.fy;
      node.vy = 0;
    } else {
      node.y += node.vy * damping;
    }
    // Keep within bounds
    const pad = 40;
    node.x = Math.max(pad, Math.min(width - pad, node.x));
    node.y = Math.max(pad, Math.min(height - pad, node.y));
  }
}
