import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions } from "../features/utils";

export const Vocabulary: React.FC = () => {
  const dispatch = useAppDispatch();
  const { words } = useAppSelector((state) => state.words);
  return (
    <div>
      Vocabulary
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
