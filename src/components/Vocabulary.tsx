import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions } from "../features/utils";

export const Vocabulary: React.FC = () => {
  const dispatch = useAppDispatch();
  const { words } = useAppSelector((state) => state.words);
  return (
    <div className="box">
      <h3 className="title">Vocabulary</h3>
      <p className="notification is-primary">
        In this App You can check your knowledge in English words. Press Add a
        word to enter new ones or just choose Starter Pack!
      </p>
      <button
        className="button is-danger center"
        onClick={() => dispatch(actions.setWords([]))}
      >
        Delete all words
      </button>
      <div className="table">
        <p className="notification is-warning">Below You can see All words ready to checked by You! Add more or strat with them!</p>
        <ul className="notification is-info">
          {words.map((word) => (
            <li key={word.id}>{word.word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
