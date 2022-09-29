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
    <div className="notification is-primary is-medium">
      <h3 className="title">Your Results</h3>
      {score && <p>Your score: {score}</p>}
      {average && <p>Your average: {average}</p>}
      {attemts && <p>Your attemts: {attemts}</p>}
      {sumScore && <p>Congratulation! You learned {sumScore / 10} words</p>}
      <div className="notification is-warning">
        <h3 className="title">Your history</h3>
        {results.map((res) => (
          <p key={res.result + res.checkDate + Math.random()}>
            {res.result} - {res.checkDate}
          </p>
        ))}
      </div>
    </div>
  );
};
