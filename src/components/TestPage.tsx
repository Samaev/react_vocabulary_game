import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions } from "../features/utils";

export const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { words, results, score, average, attemts, sumScore, wordsToCheck } =
    useAppSelector((state) => state.words);
console.log(words)
  useEffect(() => {

    // dispatch(
    //   actions.setResults(
    //     ((): Result[] => {
    //       const storedResults = localStorage.getItem("results");
    //       return storedResults ? JSON.parse(storedResults) : [];
    //     })()
    //   )
    // );
    // dispatch(
    //   actions.setSumScore(
    //     ((): number => {
    //       const storedSumScore = localStorage.getItem("sumScore");
    //       return storedSumScore ? JSON.parse(storedSumScore) : [];
    //     })()
    //   )
    // );
    // dispatch(
    //   actions.setAverage(
    //     ((): number => {
    //       const storedAverage = localStorage.getItem("average");
    //       return storedAverage ? JSON.parse(storedAverage) : 0;
    //     })()
    //   )
    // );
    // dispatch(
    //   actions.setAttemts(
    //     ((): number => {
    //       const storedAttemts = localStorage.getItem("attemts");
    //       return storedAttemts ? JSON.parse(storedAttemts) : 0;
    //     })()
    //   )
    // );
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
            result: score !== 0 ? score + 10 : 0,
          },
        ])
      );
      navigate("/results");
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("attemts", JSON.stringify(attemts));
  //   dispatch(actions.setAverage(sumScore / attemts));
  // }, [attemts]);

  // useEffect(() => {
  //   localStorage.setItem("average", JSON.stringify(average));
  // }, [average]);

  // useEffect(() => {
  //   localStorage.setItem("sumScore", JSON.stringify(sumScore));
  // }, [sumScore]);

  // useEffect(() => {
  //   localStorage.setItem("results", JSON.stringify(results));
  // }, [results]);




  return (
    <div>
      TestPage
      <div>
        <h2>This your {attemts} attemtp</h2>
        <h2>Your average score is {average} </h2>
        <h3>Translate word {currentWord + 1} / 10</h3>
        <p>{wordsToCheck[currentWord].word} on English means :</p>
        {wordsToCheck[currentWord].translate
          .sort((a, b) => a.answer.localeCompare(b.answer))
          .map((variant) => (
            <button
              onClick={() => handleOptionClick(variant.isCorrect)}
              key={variant.answer}
            >
              {variant.answer.toUpperCase()}
            </button>
          ))}
      </div>
    </div>
  );
};
