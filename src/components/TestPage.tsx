import { useEffect, useState } from "react";
import { Result } from "../types/Result";
import { Word } from "../types/Word";

type Props = {
  wordsToCheck: Word[];
};

export const TestPage: React.FC<Props> = ({ wordsToCheck }) => {
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<Result[]>(() => {
    const storedResults = localStorage.getItem("results");
    return storedResults ? JSON.parse(storedResults) : [];
  });
  const [sumScore, setSumScore] = useState(() => {
    const storedSumScore = localStorage.getItem("sumScore");
    return storedSumScore ? JSON.parse(storedSumScore) : score;
  });
  const [showScore, setShowScore] = useState(false);
  const [attemts, setAttempts] = useState(() => {
    const storedAttemts = localStorage.getItem("attemts");
    return storedAttemts ? JSON.parse(storedAttemts) : 0;
  });
  const [average, setAverage] = useState(() => {
    const storedAverage = localStorage.getItem("average");
    return storedAverage ? JSON.parse(storedAverage) : 0;
  });
  const [currentWord, setCurrentWord] = useState(0);

  const handleOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 10);
      setSumScore(sumScore + 10);
      console.log(score + " score");
    }

    const nextWord = currentWord + 1;

    if (nextWord < 10) {
      setCurrentWord(nextWord);
    } else {
      setAttempts(attemts + 1);
      setResults([
        ...results,
        {
          checkDate: new Date().toLocaleDateString(),
          result: score !== 0 ? score + 10 : 0,
        },
      ]);
      console.log(results);
      setShowScore(true);
    }
  };
  
  useEffect(() => {
    setAverage(sumScore / (attemts));
  }, [attemts]);

  useEffect(() => {
    localStorage.setItem("attemts", JSON.stringify(attemts));
  }, [attemts]);

  useEffect(() => {
    localStorage.setItem("average", JSON.stringify(average));
  }, [average]);

  useEffect(() => {
    localStorage.setItem("sumScore", JSON.stringify(sumScore));
  }, [sumScore]);

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  return (
    <div>
      TestPage
      {!showScore ? (
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
      ) : (
        <>
          {score && <p>Your score: {score}</p>}
          {average && <p>Your average: {average}</p>}
          {attemts && <p>Your attemts: {attemts}</p>}
          {sumScore && <p>Your sumScore: {sumScore}</p>}
          {results.map((res) => (
            <p key={res.result + res.checkDate + Math.random()}>
              {res.result} - {res.checkDate}
            </p>
          ))}
        </>
      )}
    </div>
  );
};
