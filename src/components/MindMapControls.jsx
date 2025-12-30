import React from 'react';
import { Maximize, Minimize, Expand, Shrink, ZoomIn, Info } from 'lucide-react';
import { useReactFlow } from 'reactflow';

import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';

const MindMapControls = ({ onExpandAll, onCollapseAll }) => {
    const { fitView, zoomIn, zoomOut } = useReactFlow();

    const handleDownload = () => {
        const node = document.querySelector('.react-flow__viewport');
        if (node) {
            toPng(node, {
                backgroundColor: '#0f172a',
                style: {
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1)',
                },
            })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'mindmap.png';
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.error('Failed to download image', err);
                });
        }
    };

    const btnClass = "bg-slate-700 text-white px-4 py-2 rounded-md text-sm cursor-pointer transition-colors hover:bg-slate-600 flex items-center gap-2 border border-slate-600 shadow-sm";
    const primaryBtnClass = "bg-blue-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer transition-colors hover:bg-blue-700 flex items-center gap-2 border border-blue-500 shadow-sm";

    return (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-slate-800/80 p-2 rounded-xl border border-slate-700 backdrop-blur-md shadow-xl">
            <button className={primaryBtnClass} onClick={onExpandAll}>
                <Expand size={16} /> Expand All
            </button>
            <button className={btnClass} onClick={onCollapseAll}>
                <Shrink size={16} /> Collapse All
            </button>
            <div className="w-[1px] h-9 bg-slate-600 mx-1"></div>
            <button className={btnClass} onClick={() => fitView({ padding: 0.2, duration: 800 })}>
                <Maximize size={16} /> Fit View
            </button>
            <button className={btnClass} onClick={() => zoomIn()}>
                <ZoomIn size={16} />
            </button>
            <div className="w-[1px] h-9 bg-slate-600 mx-1"></div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer transition-colors hover:bg-emerald-700 flex items-center gap-2 border border-emerald-500 shadow-sm" onClick={handleDownload}>
                <Download size={16} /> Download
            </button>
        </div>
    );
};

export default MindMapControls;
