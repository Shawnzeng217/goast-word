
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WordState, RibbonTab } from './types';
import Ribbon from './components/Ribbon';
import WordPage from './components/WordPage';
import StatusBar from './components/StatusBar';

const App: React.FC = () => {
  const [state, setState] = useState<WordState>({
    originalText: "上传文本文件开始您的仿打字体验。您按下的每一个键都会逐渐揭示文档中的文字。这是一个专为演示或沉浸式写作设计的 Microsoft Word 模拟环境。",
    displayedText: "",
    currentIndex: 0,
    wordCount: 0,
    fileName: "Document1"
  });

  // Track how many physical keystrokes have been made since the last character reveal
  const [keystrokeBuffer, setKeystrokeBuffer] = useState(0);
  // The current randomized target (3-5) for the next character reveal
  const [targetThreshold, setTargetThreshold] = useState(() => Math.floor(Math.random() * 3) + 3);

  const [activeTab, setActiveTab] = useState<RibbonTab>(RibbonTab.Home);
  const hiddenInputRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "text/plain" || file.name.endsWith('.txt'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setState({
          originalText: content,
          displayedText: "",
          currentIndex: 0,
          wordCount: 0,
          fileName: file.name.replace(/\.[^/.]+$/, "")
        });
        setKeystrokeBuffer(0);
        setTargetThreshold(Math.floor(Math.random() * 3) + 3);
      };
      reader.readAsText(file);
    } else if (file) {
      alert("请上传标准的文本 (.txt) 文件。");
    }
  };

  const processKeystroke = useCallback(() => {
    setKeystrokeBuffer(prevBuffer => {
      const newBuffer = prevBuffer + 1;
      
      if (newBuffer >= targetThreshold) {
        // Reveal one character
        setState(prevState => {
          if (prevState.currentIndex >= prevState.originalText.length) return prevState;
          
          const nextChar = prevState.originalText[prevState.currentIndex];
          const newDisplayedText = prevState.displayedText + nextChar;
          const words = newDisplayedText.trim().split(/\s+/).filter(w => w.length > 0).length;
          
          return {
            ...prevState,
            displayedText: newDisplayedText,
            currentIndex: prevState.currentIndex + 1,
            wordCount: words
          };
        });
        
        // Reset buffer and pick a new random target (3-5) for next time
        setTargetThreshold(Math.floor(Math.random() * 3) + 3);
        return 0;
      }
      
      return newBuffer;
    });
  }, [targetThreshold]);

  const revertKeystroke = useCallback(() => {
    setState(prev => {
      if (prev.currentIndex <= 0) return prev;
      
      const newDisplayedText = prev.displayedText.slice(0, -1);
      const words = newDisplayedText.trim().split(/\s+/).filter(w => w.length > 0).length;
      
      return {
        ...prev,
        displayedText: newDisplayedText,
        currentIndex: prev.currentIndex - 1,
        wordCount: words
      };
    });
    // When deleting a character, we also reset the keystroke buffer
    setKeystrokeBuffer(0);
    setTargetThreshold(Math.floor(Math.random() * 3) + 3);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent | KeyboardEvent) => {
    const modifiers = ["Control", "Alt", "Meta", "Shift", "CapsLock", "Escape", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
    if (modifiers.includes(e.key)) return;

    if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        
        if (e.key === "Backspace") {
            revertKeystroke();
        } else {
            processKeystroke();
        }
    }
  };

  const focusInput = useCallback(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    focusInput();

    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('input[type="file"], label, button')) return;
      focusInput();
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (document.activeElement !== hiddenInputRef.current) {
            handleKeyDown(e);
        }
    };

    window.addEventListener('mousedown', handleClick);
    window.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [focusInput]);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [state.displayedText]);

  return (
    <div className="flex flex-col h-screen select-none font-sans bg-[#f3f2f1] overflow-hidden">
      <textarea
        ref={hiddenInputRef}
        onKeyDown={handleKeyDown}
        className="fixed top-0 left-0 w-1 h-1 opacity-0 z-[-1] border-none outline-none resize-none"
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />

      <header className="word-blue text-white h-10 flex items-center justify-between px-3 shrink-0 text-sm shadow-sm z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2">
            <span className="material-symbols-outlined text-[20px] cursor-pointer hover:bg-white/10 p-1 rounded">description</span>
          </div>
          <span className="material-symbols-outlined text-[18px] cursor-pointer hover:bg-white/10 p-1 rounded">save</span>
          <span className="material-symbols-outlined text-[18px] cursor-pointer hover:bg-white/10 p-1 rounded">undo</span>
          <span className="material-symbols-outlined text-[18px] cursor-pointer hover:bg-white/10 p-1 rounded">redo</span>
          <div className="w-px h-5 bg-white/30 mx-1"></div>
          <span className="font-medium tracking-wide">{state.fileName} - Word</span>
        </div>
        <div className="flex items-center">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 hover:bg-white/10 cursor-pointer rounded text-xs mr-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span>已自动保存</span>
            </div>
          <div className="flex items-center h-full">
            <span className="material-symbols-outlined text-[20px] px-4 py-2 hover:bg-white/10 cursor-pointer transition-colors">minimize</span>
            <span className="material-symbols-outlined text-[20px] px-4 py-2 hover:bg-white/10 cursor-pointer transition-colors">check_box_outline_blank</span>
            <span className="material-symbols-outlined text-[20px] px-4 py-2 hover:bg-red-600 transition-colors cursor-pointer">close</span>
          </div>
        </div>
      </header>

      <Ribbon 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onUpload={handleFileUpload} 
      />

      <main ref={scrollContainerRef} className="flex-1 overflow-auto word-page-bg flex justify-center py-10 relative">
        <WordPage text={state.displayedText} cursorRef={cursorRef} />
      </main>

      <StatusBar wordCount={state.wordCount} />
    </div>
  );
};

export default App;
