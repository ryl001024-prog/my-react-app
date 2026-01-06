export const edges: GraphType.GraphEdge[] = [
  // 团队 A 内部连接
  { source: "A1", target: "A2" },
  { source: "A1", target: "A3" },
  { source: "A1", target: "A4" },
  // 团队 B 内部连接
  { source: "B1", target: "B2" },
  { source: "B1", target: "B3" },
  { source: "B1", target: "B4" },
  // 团队 C 内部连接
  { source: "C1", target: "C2" },
  { source: "C1", target: "C3" },
  { source: "C1", target: "C4" },
  // 团队间的少量连接
  { source: "A1", target: "B1" },
  { source: "B1", target: "C1" },
] as GraphType.GraphEdge[];

export const nodes: GraphType.GraphNode[] = [
  // 团队 A
  { id: "A1", team: "A", label: "A1", size: 30 },
  { id: "A2", team: "A", label: "A2", size: 20 },
  { id: "A3", team: "A", label: "A3", size: 20 },
  { id: "A4", team: "A", label: "A4", size: 20 },
  // 团队 B
  { id: "B1", team: "B", label: "B1", size: 30 },
  { id: "B2", team: "B", label: "B2", size: 20 },
  { id: "B3", team: "B", label: "B3", size: 20 },
  { id: "B4", team: "B", label: "B4", size: 20 },
  // 团队 C
  { id: "C1", team: "C", label: "C1", size: 30 },
  { id: "C2", team: "C", label: "C2", size: 20 },
  { id: "C3", team: "C", label: "C3", size: 20 },
  { id: "C4", team: "C", label: "C4", size: 20 },
];
