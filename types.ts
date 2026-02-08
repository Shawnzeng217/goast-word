
export interface WordState {
  originalText: string;
  displayedText: string;
  currentIndex: number;
  wordCount: number;
  fileName: string;
}

export enum RibbonTab {
  Home = 'Home',
  Insert = 'Insert',
  Design = 'Design',
  Layout = 'Layout',
  References = 'References',
  Mailings = 'Mailings',
  Review = 'Review',
  View = 'View',
  Help = 'Help'
}
