import type {
  Transaction,
  GraphData,
  GraphNode,
  GraphEdge,
  AccountStats,
  GraphStats,
} from '@/types';

export function parseTransactions(raw: string): Transaction[] {
  const lines = raw.trim().split('\n').filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const header = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const colMap: Record<string, number> = {};
  header.forEach((h, i) => {
    colMap[h] = i;
  });

  const required = ['transaction_id', 'sender', 'receiver', 'amount', 'timestamp'];
  for (const col of required) {
    if (!(col in colMap)) {
      throw new Error(`Missing required column: ${col}`);
    }
  }

  const transactions: Transaction[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map((c) => c.trim());
    if (cols.length < header.length) {
      throw new Error(`Row ${i + 1} has insufficient columns`);
    }
    const amount = parseFloat(cols[colMap['amount']]);
    if (isNaN(amount)) {
      throw new Error(`Row ${i + 1}: invalid amount "${cols[colMap['amount']]}"`);
    }
    transactions.push({
      id: cols[colMap['transaction_id']],
      sender: cols[colMap['sender']],
      receiver: cols[colMap['receiver']],
      amount,
      timestamp: cols[colMap['timestamp']],
    });
  }

  return transactions;
}

export function buildGraph(transactions: Transaction[]): GraphData {
  const nodeMap = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  for (const tx of transactions) {
    if (!nodeMap.has(tx.sender)) {
      nodeMap.set(tx.sender, { id: tx.sender, type: 'account', label: tx.sender });
    }
    if (!nodeMap.has(tx.receiver)) {
      nodeMap.set(tx.receiver, { id: tx.receiver, type: 'account', label: tx.receiver });
    }
    edges.push({
      id: tx.id,
      source: tx.sender,
      target: tx.receiver,
      amount: tx.amount,
      timestamp: tx.timestamp,
    });
  }

  return {
    nodes: Array.from(nodeMap.values()),
    edges,
  };
}

export function calculateAccountStats(
  accountId: string,
  transactions: Transaction[]
): AccountStats {
  let transactionCount = 0;
  let totalIncoming = 0;
  let totalOutgoing = 0;
  const connected = new Set<string>();

  for (const tx of transactions) {
    if (tx.sender === accountId) {
      totalOutgoing += tx.amount;
      transactionCount++;
      connected.add(tx.receiver);
    }
    if (tx.receiver === accountId) {
      totalIncoming += tx.amount;
      transactionCount++;
      connected.add(tx.sender);
    }
  }

  return {
    accountId,
    transactionCount,
    totalIncoming,
    totalOutgoing,
    connectedAccounts: Array.from(connected).sort(),
  };
}

export function calculateGraphStats(
  transactions: Transaction[],
  graph: GraphData
): GraphStats {
  const timestamps = transactions.map((t) => t.timestamp).sort();
  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);

  return {
    accountCount: graph.nodes.length,
    transactionCount: transactions.length,
    totalVolume,
    timeRange:
      timestamps.length > 0
        ? { start: timestamps[0], end: timestamps[timestamps.length - 1] }
        : null,
    clusterCount: countClusters(graph),
  };
}

// Union-Find based cluster (connected component) counting
export function countClusters(graph: GraphData): number {
  const parent = new Map<string, string>();

  function find(x: string): string {
    if (!parent.has(x)) parent.set(x, x);
    const p = parent.get(x)!;
    if (p !== x) {
      const root = find(p);
      parent.set(x, root);
      return root;
    }
    return x;
  }

  function union(a: string, b: string) {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent.set(ra, rb);
  }

  for (const node of graph.nodes) {
    find(node.id);
  }
  for (const edge of graph.edges) {
    union(edge.source, edge.target);
  }

  const roots = new Set<string>();
  for (const node of graph.nodes) {
    roots.add(find(node.id));
  }

  return roots.size;
}
