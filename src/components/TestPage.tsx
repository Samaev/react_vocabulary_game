import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions } from "../features/utils";

export const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { results, score, average, attemts, sumScore, wordsToCheck } =
    useAppSelector((state) => state.words);

  useEffect(() => {
    dispatch(actions.setScore(0));
  }, []);

  const [currentWord, setCurrentWord] = useState(0);

  const handleOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      dispatch(actions.setScore(score + 10));
      dispatch(actions.setSumScore(sumScore + 10));
    }

    const nextWord = currentWord + 1;

    if (nextWord < 10) {
      setCurrentWord(nextWord);
    } else {
      dispatch(actions.setAttemts(attemts + 1));
      dispatch(
        actions.setResults([
          ...results,
          {
            checkDate: new Date().toLocaleDateString(),
            result: score ? score + 10 : 0,
          },
        ])
      );
      navigate("/results");
    }
  };

  return (
    <div>
      <h3 className="title">TestPage</h3>
      <div className="notification">
        <h2>This your {attemts + 1} attempt</h2>
        <h2>Your average score is {average} </h2>
        <h3>Translate word {currentWord + 1} / 10</h3>
        <div className="notification is-info">
          <p><span className="is-primary is-medium title margin">{wordsToCheck[currentWord].word}</span> on English means :</p>{" "}
          {wordsToCheck[currentWord].translate
            .sort((a, b) => a.answer.localeCompare(b.answer))
            .map((variant) => (
              <button
                className="button is-warning"
                onClick={() => handleOptionClick(variant.isCorrect)}
                key={variant.answer}
              >
                {variant.answer.toUpperCase()}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
