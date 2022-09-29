import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions } from "../features/utils";

export const Results = () => {
  const { results, score, average, attemts, sumScore } = useAppSelector(
    (state) => state.words
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.setAverage(sumScore / attemts));
  }, []);

  return (
    <div>
      Results
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
    </div>
  );
};
