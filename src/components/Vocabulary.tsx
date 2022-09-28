import React, { useEffect, useState } from "react";
import { Word } from "../types/Word";
import randomWords from "random-words";

type Props = {
  words: Word[];
  onSetWords: (words: Word[]) => void;
};

export const Vocabulary: React.FC<Props> = ({ words, onSetWords }) => {
  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");


  const handleWord: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setWord(event.target.value);
  };

  const handleTranslate: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTranslate(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSetWords([
      ...words,
      {
        word,
        translate: [
          { answer: translate, isCorrect: true },
          { answer: randomWords(1).toString(), isCorrect: false },
          { answer: randomWords(1).toString(), isCorrect: false },
          { answer: randomWords(1).toString(), isCorrect: false },
        ],
        id: words.length + 1,
      },
    ]);
    setWord("");
    setTranslate("");
  };
  console.log(words);
  return (
    <div>
      Vocabulary {randomWords(1)}
      <form className="App-header" onSubmit={handleSubmitForm}>
        <input type="text" value={word} onChange={handleWord} />
        <input type="text" value={translate} onChange={handleTranslate} />
        <input type="submit" value="ADD" />
      </form>
      <button onClick={() => onSetWords([])}>Delete all words</button>
      <ol>
        {words.map((word) => (
          <li key={word.id}>{word.word}</li>
        ))}
      </ol>
    </div>
  );
};
