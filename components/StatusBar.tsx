
import React from 'react';

interface StatusBarProps {
  wordCount: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ wordCount }) => {
  return (
    <footer className="word-blue text-white h-7 flex items-center justify-between px-3 text-[11px] shrink-0">
      <div className="flex items-center h-full">
        <div className="hover:bg-white/20 px-3 h-full flex items-center cursor-pointer transition-colors border-r border-white/10">
          Page 1 of 1
        </div>
        <div className="hover:bg-white/20 px-3 h-full flex items-center cursor-pointer transition-colors border-r border-white/10">
          {wordCount} Words
        </div>
        <div className="hover:bg-white/20 px-3 h-full flex items-center gap-1 cursor-pointer transition-colors border-r border-white/10">
          <span className="material-symbols-outlined text-[14px]">spellcheck</span>
          <span>No proofing errors</span>
        </div>
        <div className="hover:bg-white/20 px-3 h-full flex items-center cursor-pointer transition-colors">
          English (United States)
        </div>
      </div>

      <div className="flex items-center h-full gap-4">
        <div className="flex items-center gap-1 hover:bg-white/20 px-2 h-full cursor-pointer">
          <span className="material-symbols-outlined text-[16px]">accessibility_new</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="material-symbols-outlined text-[18px] hover:bg-white/20 cursor-pointer rounded p-0.5">description</span>
           <span className="material-symbols-outlined text-[18px] bg-white/20 cursor-pointer rounded p-0.5">web</span>
           <span className="material-symbols-outlined text-[18px] hover:bg-white/20 cursor-pointer rounded p-0.5">article</span>
        </div>
        <div className="flex items-center gap-2 ml-2 min-w-[150px]">
          <span>100%</span>
          <div className="flex-1 h-0.5 bg-white/30 relative flex items-center cursor-pointer">
            <div className="w-1 h-3 bg-white absolute left-1/2 -translate-x-1/2 hover:scale-125 transition-transform"></div>
            <div className="absolute left-0 w-1/2 h-full bg-white"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;
