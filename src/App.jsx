import React, { useMemo } from 'react';
import ReactFlow, {
  Background,
  ReactFlowProvider,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

import initialData from './data.json';
import { useMindmap } from './hooks/useMindmap';
import { RootNode, MindMapNode } from './components/Nodes';
import Sidebar from './components/Sidebar';
import MindMapControls from './components/MindMapControls'; // Custom controls
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

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="mindmap-wrapper bg-rose-100 dark:bg-slate-900 transition-colors duration-300">
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
        defaultEdgeOptions={{ type: 'smoothstep', animated: true, style: { strokeWidth: 2, stroke: theme === 'dark' ? '#64748b' : '#94a3b8' } }}
        style={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#efeceafa' }}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} size={1} color={theme === 'dark' ? '#334455' : '#fecdd3'} />
        <MindMapControls onExpandAll={expandAll} onCollapseAll={collapseAll} />

        {/* Theme Toggle*/}
        <Panel position="top-left" className="m-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-md hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </Panel>
       
      </ReactFlow>

      <Sidebar node={selectedNode} onClose={onPaneClick} onEdit={updateNodeData} onAdd={addNode} onDelete={deleteNode} theme={theme} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <ReactFlowProvider>
          <MindMapFlow />
        </ReactFlowProvider>
      </div>
    </ThemeProvider>
  );
}
