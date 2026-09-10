export interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  timestamp: string;
}

export interface GraphNode {
  id: string;
  type: 'account';
  label: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  amount: number;
  timestamp: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface AccountStats {
  accountId: string;
  transactionCount: number;
  totalIncoming: number;
  totalOutgoing: number;
  connectedAccounts: string[];
}

export interface GraphStats {
  accountCount: number;
  transactionCount: number;
  totalVolume: number;
  timeRange: { start: string; end: string } | null;
  clusterCount: number;
}

export interface SimNode {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number | null;
  fy?: number | null;
}

export interface SimEdge {
  id: string;
  source: string;
  target: string;
  amount: number;
  timestamp: string;
}

export interface SimulationGraph {
  nodes: SimNode[];
  edges: SimEdge[];
}
