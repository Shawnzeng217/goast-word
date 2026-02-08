
import React from 'react';
import { RibbonTab } from '../types';

interface RibbonProps {
  activeTab: RibbonTab;
  setActiveTab: (tab: RibbonTab) => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Ribbon: React.FC<RibbonProps> = ({ activeTab, setActiveTab, onUpload }) => {
  const tabs = Object.values(RibbonTab);

  return (
    <nav className="word-ribbon-bg border-b word-border shrink-0 select-none">
      {/* Tab Selectors */}
      <div className="flex items-center px-1 text-[13px] h-9">
        <div className="px-4 py-2 hover:bg-[#1a3a6b] cursor-pointer font-semibold uppercase bg-[#2b579a] text-white mr-1 transition-colors h-full flex items-center">File</div>
        {tabs.map(tab => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 h-full flex items-center cursor-pointer transition-all border-b-2 ${
              activeTab === tab 
                ? 'border-[#2b579a] text-[#2b579a] font-semibold bg-white' 
                : 'border-transparent hover:bg-gray-200 text-gray-700'
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Toolbar Area */}
      <div className="h-24 bg-white border-b border-gray-200 flex items-center px-4 gap-6 overflow-hidden">
        {/* Clipboard Group */}
        <div className="flex flex-col items-center border-r border-gray-100 pr-4 h-full pt-1">
          <div className="flex gap-2 mb-auto">
            <div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 p-1 rounded">
              <span className="material-symbols-outlined text-[28px]">content_paste</span>
              <span className="text-[10px]">Paste</span>
            </div>
            <div className="flex flex-col justify-center gap-1">
              <div className="flex items-center gap-1 hover:bg-gray-100 px-1 rounded cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">content_cut</span>
                <span className="text-[11px]">Cut</span>
              </div>
              <div className="flex items-center gap-1 hover:bg-gray-100 px-1 rounded cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                <span className="text-[11px]">Copy</span>
              </div>
            </div>
          </div>
          <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Clipboard</span>
        </div>

        {/* Ghost Writing Config Group (File Upload) */}
        <div className="flex flex-col items-center border-r border-gray-100 pr-4 h-full pt-1">
          <div className="flex flex-col items-center justify-center flex-1">
            <label className="flex flex-col items-center cursor-pointer group hover:bg-gray-50 p-2 rounded transition-colors">
              <span className="material-symbols-outlined text-[32px] text-blue-600">upload_file</span>
              <span className="text-[11px] font-medium mt-1">Load Script</span>
              <input 
                type="file" 
                className="hidden" 
                accept=".txt" 
                onChange={onUpload}
              />
            </label>
          </div>
          <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Ghost Writing</span>
        </div>

        {/* Font Group */}
        <div className="flex flex-col items-center border-r border-gray-100 pr-4 h-full pt-1">
          <div className="flex flex-col gap-1 mb-auto">
            <div className="flex gap-1">
              <div className="flex items-center gap-1 border border-gray-200 rounded px-1.5 py-0.5 bg-gray-50 text-[11px] w-[110px] justify-between cursor-default">
                <span>Calibri (Body)</span>
                <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
              </div>
              <div className="flex items-center gap-1 border border-gray-200 rounded px-1.5 py-0.5 bg-gray-50 text-[11px] w-[45px] justify-between cursor-default">
                <span>11</span>
                <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
              </div>
            </div>
            <div className="flex gap-1">
               <span className="material-symbols-outlined text-[18px] p-0.5 hover:bg-gray-100 cursor-pointer rounded">format_bold</span>
               <span className="material-symbols-outlined text-[18px] p-0.5 hover:bg-gray-100 cursor-pointer rounded">format_italic</span>
               <span className="material-symbols-outlined text-[18px] p-0.5 hover:bg-gray-100 cursor-pointer rounded">format_underlined</span>
               <div className="w-px h-4 bg-gray-200 mx-1"></div>
               <span className="material-symbols-outlined text-[18px] p-0.5 hover:bg-gray-100 cursor-pointer rounded">format_color_text</span>
            </div>
          </div>
          <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Font</span>
        </div>
      </div>
    </nav>
  );
};

// Fix: Add default export to resolve "Module has no default export" error in App.tsx
export default Ribbon;
