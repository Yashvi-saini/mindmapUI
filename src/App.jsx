import React, { useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

import initialData from './data.json';
import { useMindmap } from './hooks/useMindmap';
import { RootNode, MindMapNode } from './components/Nodes';
import Sidebar from './components/Sidebar';
import MindMapControls from './components/MindMapControls';
import './index.css';
import './App.css';

const nodeTypes = {
  root: RootNode,
  mindmap: MindMapNode,
};

function MindMapFlow() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onNodeClick,
    onPaneClick,
    selectedNode,
    expandAll,
    collapseAll,
    updateNodeData,
    addNode,
    deleteNode
  } = useMindmap(initialData);

  return (
    <div className="mindmap-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={4}
        defaultEdgeOptions={{ type: 'smoothstep', animated: true, style: { strokeWidth: 2, stroke: '#64748b' } }}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} size={1} color="#334155" />

        {/* We use our custom top controls inside the ReactFlow wrapper */}
        <MindMapControls onExpandAll={expandAll} onCollapseAll={collapseAll} />

        {/* Default Zoom */}
        <Controls showInteractive={false} className="!bg-slate-800 !border-slate-700 !fill-white" />
      </ReactFlow>

      <Sidebar node={selectedNode} onClose={onPaneClick} onEdit={updateNodeData} onAdd={addNode} onDelete={deleteNode} />
    </div>
  );
}

export default function App() {
  return (
    <div className="app-container">
      <ReactFlowProvider>
        <MindMapFlow />
      </ReactFlowProvider>
    </div>
  );
}
