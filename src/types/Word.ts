export type Word = {
  word: string;
  translate: [
    { answer: string; isCorrect: boolean },
    { answer: string; isCorrect: boolean },
    { answer: string; isCorrect: boolean },
    { answer: string; isCorrect: boolean }
  ];
  id: number;
};
