import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';
import { flattenTree, getLayoutedElements } from '../utils/layout';

export const useMindmap = (initialData) => {

    const [treeData, setTreeData] = useState(initialData);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [collapsedIds, setCollapsedIds] = useState(new Set());
    const [selectedNode, setSelectedNode] = useState(null);

    const toggleNode = useCallback((id) => {
        setCollapsedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, []);

    const updateNodeData = useCallback((id, newData) => {
        setTreeData((prevData) => {
            const cloned = JSON.parse(JSON.stringify(prevData));

            const findAndUpdate = (node) => {
                if (node.id === id) {
                    node.data = { ...node.data, ...newData };
                    return true;
                }
                if (node.children) {
                    for (const child of node.children) {
                        if (findAndUpdate(child)) return true;
                    }
                }
                return false;
            };

            findAndUpdate(cloned);
            return cloned;
        });

        setSelectedNode((prev) => prev && prev.id === id ? { ...prev, data: { ...prev.data, ...newData } } : prev);
    }, []);

    // Add a new child node
    const addNode = useCallback((parentId) => {
        setTreeData((prevData) => {
            const cloned = JSON.parse(JSON.stringify(prevData));

            const findAndAdd = (node) => {
                if (node.id === parentId) {
                    if (!node.children) node.children = [];
                    const newId = `${node.id}-${node.children.length + 1}`;
                    node.children.push({
                        id: newId,
                        data: { label: 'New Node', summary: 'New node summary' },
                        children: []
                    });
                    return true;
                }
                if (node.children) {
                    for (const child of node.children) {
                        if (findAndAdd(child)) return true;
                    }
                }
                return false;
            };

            findAndAdd(cloned);
            return cloned;
        });
        setCollapsedIds((prev) => {
            const next = new Set(prev);
            next.delete(parentId);
            return next;
        });
    }, []);

    // Delete a node
    const deleteNode = useCallback((id) => {
        setTreeData((prevData) => {
            if (prevData.id === id) {
                alert("Cannot delete root node.");
                return prevData;
            }

            const cloned = JSON.parse(JSON.stringify(prevData));

            const findAndDelete = (node) => {
                if (node.children) {
                    const index = node.children.findIndex(child => child.id === id);
                    if (index !== -1) {
                        node.children.splice(index, 1);
                        return true;
                    }
                    for (const child of node.children) {
                        if (findAndDelete(child)) return true;
                    }
                }
                return false;
            };

            findAndDelete(cloned);
            return cloned;
        });
        setSelectedNode(null);
    }, []);

    useEffect(() => {
        // tree visibility
        const { nodes: flatNodes, edges: flatEdges } = flattenTree(treeData, collapsedIds);
        const nodesWithData = flatNodes.map(node => ({
            ...node,
            data: {
                ...node.data,
                onToggle: toggleNode,
                isCollapsed: collapsedIds.has(node.id),
            }
        }));

        const layouted = getLayoutedElements(nodesWithData, flatEdges, { direction: 'LR' });

        setNodes(layouted.nodes);
        setEdges(layouted.edges);
    }, [treeData, collapsedIds, toggleNode, setNodes, setEdges]);


    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
    }, []);

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, []);

    const expandAll = useCallback(() => {
        setCollapsedIds(new Set());
    }, []);

    const collapseAll = useCallback(() => {
        const getAllParents = (node, acc = new Set()) => {
            if (node.children && node.children.length > 0) {
                acc.add(node.id);
                node.children.forEach(child => getAllParents(child, acc));
            }
            return acc;
        };
        const allParents = getAllParents(initialData);
        if (initialData.id) allParents.delete(initialData.id);

        setCollapsedIds(allParents);
    }, [initialData]);

    return {
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
    };
};

