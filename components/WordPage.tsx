
import React from 'react';

interface WordPageProps {
  text: string;
  cursorRef?: React.RefObject<HTMLSpanElement | null>;
}

const WordPage: React.FC<WordPageProps> = ({ text, cursorRef }) => {
  return (
    <div 
      className="bg-white a4-shadow mx-auto min-h-[1123px] w-[794px] p-[96px] relative mb-20 text-[#333]"
      style={{ 
        // 模拟 Word 字体栈：优先 Calibri/Aptos，然后是 Segoe UI
        fontFamily: "'Aptos', 'Calibri', 'Segoe UI', 'Inter', 'Helvetica', 'Arial', sans-serif",
        fontSize: '11pt',
        lineHeight: '1.15',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        wordBreak: 'break-word',
        letterSpacing: '-0.01em', // 略微收紧字间距使显示更扎实
        fontVariantLigatures: 'common-ligatures',
        fontKerning: 'normal'
      }}
    >
      {/* Content Rendering */}
      <div className="whitespace-pre-wrap outline-none relative min-h-full font-normal">
        {text}
        {/* The cursor matches Word's text color and vertical alignment */}
        <span 
          ref={cursorRef}
          className="inline-block w-[1px] h-[1.2em] bg-[#2b579a] ml-[1px] animate-[pulse_1.2s_infinite] align-middle -translate-y-[0.1em]"
        ></span>
      </div>

      {/* Placeholder hint when no text has been typed */}
      {text.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-20 text-center select-none">
          <div className="opacity-[0.03] scale-150 mb-8">
            <span className="material-symbols-outlined text-[200px]">edit_note</span>
          </div>
          <p className="text-gray-400 text-lg font-light tracking-wide italic">
            文档已准备就绪
            <br/> 
            <span className="text-sm mt-2 block not-italic opacity-70">点击键盘任意键开始输入文件内容...</span>
          </p>
        </div>
      )}
      
      {/* Bottom Page Number simulation */}
      <div className="absolute bottom-8 left-0 w-full text-center text-xs text-gray-300 pointer-events-none select-none">
        第 1 页
      </div>
    </div>
  );
};

export default WordPage;
