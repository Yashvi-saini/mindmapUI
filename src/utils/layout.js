import dagre from 'dagre';
import { Position } from 'reactflow';

const nodeWidth = 180;
const nodeHeight = 60;

export const getLayoutedElements = (nodes, edges, options = {}) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = options.direction === 'LR';
  
  dagreGraph.setGraph({ 
    rankdir: 'LR', 
    ranker: 'network-simplex',
    marginx: 50, 
    marginy: 50 
  });

  nodes.forEach((node) => {
  
    const width = node.type === 'root' ? 200 : nodeWidth;
    const height = node.type === 'root' ? 80 : nodeHeight;
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    node.position = {
      x: nodeWithPosition.x - (node.type === 'root' ? 100 : nodeWidth / 2),
      y: nodeWithPosition.y - (node.type === 'root' ? 40 : nodeHeight / 2),
    };

    return node;
  });

  return { nodes: layoutedNodes, edges };
};

export const flattenTree = (data, hiddenNodes = new Set()) => {
  const nodes = [];
  const edges = [];

  const traverse = (node, parentId = null) => {
    // Add Node
    nodes.push({
      id: node.id,
      type: parentId ? 'mindmap' : 'root', 
      data: { ...node.data, childrenCount: node.children?.length || 0, isCollapsed: hiddenNodes.has(node.id) },
      position: { x: 0, y: 0 }, // Initiall layouted
    });

    if (parentId) {
      edges.push({
        id: `e${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
        type: 'smoothstep', //curved edges
        animated: true,
      });
    }

    if (node.children && !hiddenNodes.has(node.id)) {
      node.children.forEach(child => traverse(child, node.id));
    }
  };

  traverse(data);
  return { nodes, edges };
};
