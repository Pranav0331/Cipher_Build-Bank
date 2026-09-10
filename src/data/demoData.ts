import type { Transaction } from '@/types';

export const demoTransactions: Transaction[] = [
  // Circular flow: A-102 → B-204 → C-317 → D-421 → E-509 → A-102
  { id: 'TX001', sender: 'A-102', receiver: 'B-204', amount: 500000, timestamp: '2026-09-09T10:01:00' },
  { id: 'TX002', sender: 'B-204', receiver: 'C-317', amount: 480000, timestamp: '2026-09-09T10:07:00' },
  { id: 'TX003', sender: 'C-317', receiver: 'D-421', amount: 460000, timestamp: '2026-09-09T10:14:00' },
  { id: 'TX004', sender: 'D-421', receiver: 'E-509', amount: 450000, timestamp: '2026-09-09T10:22:00' },
  { id: 'TX005', sender: 'E-509', receiver: 'A-102', amount: 440000, timestamp: '2026-09-09T10:31:00' },

  // Multi-hop flow: F-612 → G-703 → H-814 → I-925 → J-036
  { id: 'TX010', sender: 'F-612', receiver: 'G-703', amount: 1200000, timestamp: '2026-09-09T08:15:00' },
  { id: 'TX011', sender: 'G-703', receiver: 'H-814', amount: 1150000, timestamp: '2026-09-09T08:45:00' },
  { id: 'TX012', sender: 'H-814', receiver: 'I-925', amount: 1100000, timestamp: '2026-09-09T09:20:00' },
  { id: 'TX013', sender: 'I-925', receiver: 'J-036', amount: 1080000, timestamp: '2026-09-09T09:55:00' },

  // Second circular flow (smaller): K-147 → L-258 → M-369 → K-147
  { id: 'TX020', sender: 'K-147', receiver: 'L-258', amount: 320000, timestamp: '2026-09-09T11:05:00' },
  { id: 'TX021', sender: 'L-258', receiver: 'M-369', amount: 305000, timestamp: '2026-09-09T11:18:00' },
  { id: 'TX022', sender: 'M-369', receiver: 'K-147', amount: 290000, timestamp: '2026-09-09T11:30:00' },

  // Normal transactions across unrelated accounts
  { id: 'TX030', sender: 'N-410', receiver: 'O-521', amount: 75000, timestamp: '2026-09-09T09:00:00' },
  { id: 'TX031', sender: 'O-521', receiver: 'P-632', amount: 60000, timestamp: '2026-09-09T09:30:00' },
  { id: 'TX032', sender: 'Q-743', receiver: 'R-854', amount: 150000, timestamp: '2026-09-09T10:10:00' },
  { id: 'TX033', sender: 'R-854', receiver: 'S-965', amount: 140000, timestamp: '2026-09-09T10:40:00' },
  { id: 'TX034', sender: 'S-965', receiver: 'T-076', amount: 130000, timestamp: '2026-09-09T11:00:00' },

  // Cross connections between clusters
  { id: 'TX040', sender: 'B-204', receiver: 'F-612', amount: 200000, timestamp: '2026-09-09T10:50:00' },
  { id: 'TX041', sender: 'H-814', receiver: 'K-147', amount: 180000, timestamp: '2026-09-09T11:45:00' },
  { id: 'TX042', sender: 'E-509', receiver: 'N-410', amount: 95000, timestamp: '2026-09-09T12:00:00' },

  // More normal transactions
  { id: 'TX050', sender: 'U-187', receiver: 'V-298', amount: 45000, timestamp: '2026-09-09T08:30:00' },
  { id: 'TX051', sender: 'V-298', receiver: 'W-309', amount: 42000, timestamp: '2026-09-09T09:10:00' },
  { id: 'TX052', sender: 'X-410', receiver: 'Y-521', amount: 88000, timestamp: '2026-09-09T10:25:00' },
  { id: 'TX053', sender: 'Y-521', receiver: 'Z-632', amount: 85000, timestamp: '2026-09-09T10:55:00' },

  // Additional transactions to fill out the network
  { id: 'TX060', sender: 'A-102', receiver: 'C-317', amount: 100000, timestamp: '2026-09-09T11:10:00' },
  { id: 'TX061', sender: 'F-612', receiver: 'I-925', amount: 50000, timestamp: '2026-09-09T12:15:00' },
  { id: 'TX062', sender: 'G-703', receiver: 'D-421', amount: 75000, timestamp: '2026-09-09T11:50:00' },
  { id: 'TX063', sender: 'L-258', receiver: 'O-521', amount: 30000, timestamp: '2026-09-09T12:30:00' },
  { id: 'TX064', sender: 'P-632', receiver: 'Q-743', amount: 25000, timestamp: '2026-09-09T12:45:00' },
  { id: 'TX065', sender: 'T-076', receiver: 'U-187', amount: 65000, timestamp: '2026-09-09T13:00:00' },
  { id: 'TX066', sender: 'W-309', receiver: 'X-410', amount: 35000, timestamp: '2026-09-09T13:15:00' },
  { id: 'TX067', sender: 'Z-632', receiver: 'A-102', amount: 20000, timestamp: '2026-09-09T13:30:00' },
  { id: 'TX068', sender: 'J-036', receiver: 'M-369', amount: 40000, timestamp: '2026-09-09T13:45:00' },
];

// Accounts that are part of suspicious-looking patterns (for visual emphasis only — not labeled as fraud)
export const emphasizedAccounts = ['A-102', 'B-204', 'C-317', 'D-421', 'E-509'];
