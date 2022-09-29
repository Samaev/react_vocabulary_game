import React, { useEffect, useState } from "react";
import randomWords from "random-words";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions } from "../features/utils";

export const Vocabulary: React.FC = () => {
  const dispatch = useAppDispatch();
  const { words } = useAppSelector((state) => state.words);
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

  // useEffect(() => {
  //   dispatch(
  //     actions.setWords(
  //       ((): Word[] => {
  //         const storedWords = localStorage.getItem("words");
  //         return storedWords ? JSON.parse(storedWords) : [];
  //       })()
  //     )
  //   );
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("words", JSON.stringify(words));
  // }, [words]);

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(
      actions.setWords([
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
      ])
    );
    setWord("");
    setTranslate("");
  };
  

  console.log(words);
  return (
    <div>
      Vocabulary
      <form className="App-header" onSubmit={handleSubmitForm}>
        <input type="text" value={word} onChange={handleWord} />
        <input type="text" value={translate} onChange={handleTranslate} />
        <input type="submit" value="ADD" />
      </form>
      <button onClick={() => dispatch(actions.setWords([]))}>
        Delete all words
      </button>
      <ol>
        {words.map((word) => (
          <li key={word.id}>{word.word}</li>
        ))}
      </ol>
    </div>
  );
};
