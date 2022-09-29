import { Result } from "../types/Result";
import { Word } from "../types/Word";

type State = {
  words: Word[];
  wordsToCheck: Word[];
  results: Result[];
  score: number;
  average: number;
  attemts: number;
  sumScore: number;
};

const initialState: State = {
  words: [],
  wordsToCheck: [],
  results: [],
  score: 0,
  average: 0,
  attemts: 0,
  sumScore: 0,
};

type SetWordsAction = {
  type: "words/set";
  payload: Word[];
};

type SetWordsToCheckAction = {
  type: "wordsToCheck/set";
  payload: Word[];
};

type SetResultsAction = {
  type: "results/set";
  payload: Result[];
};

type SetScoreAction = {
  type: "score/set";
  payload: number;
};

type SetAverageAction = {
  type: "average/set";
  payload: number;
};

type SetAttemtsAction = {
  type: "attemts/set";
  payload: number;
};

type SetSumScoreAction = {
  type: "sumScore/set";
  payload: number;
};

type Action =
  | SetWordsAction
  | SetResultsAction
  | SetScoreAction
  | SetAverageAction
  | SetAttemtsAction
  | SetSumScoreAction
  | SetWordsToCheckAction;

export const wordsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "words/set":
      return {
        ...state,
        words: action.payload,
      };
    case "wordsToCheck/set":
      return {
        ...state,
        wordsToCheck: action.payload,
      };
    case "results/set":
      return {
        ...state,
        results: action.payload,
      };
    case "score/set":
      return {
        ...state,
        score: action.payload,
      };
    case "sumScore/set":
      return {
        ...state,
        sumScore: action.payload,
      };
    case "average/set":
      return {
        ...state,
        average: action.payload,
      };
    case "attemts/set":
      return {
        ...state,
        attemts: action.payload,
      };
    default:
      return state;
  }
};

export const actions = {
  setWords: (words: Word[]): SetWordsAction => ({
    type: "words/set",
    payload: words,
  }),
  setWordsToCheck: (wordsToCheck: Word[]): SetWordsToCheckAction => ({
    type: "wordsToCheck/set",
    payload: wordsToCheck,
  }),
  setResults: (results: Result[]): SetResultsAction => ({
    type: "results/set",
    payload: results,
  }),
  setScore: (score: number): SetScoreAction => ({
    type: "score/set",
    payload: score,
  }),
  setSumScore: (sumScore: number): SetSumScoreAction => ({
    type: "sumScore/set",
    payload: sumScore,
  }),
  setAverage: (average: number): SetAverageAction => ({
    type: "average/set",
    payload: average,
  }),
  setAttemts: (attemts: number): SetAttemtsAction => ({
    type: "attemts/set",
    payload: attemts,
  }),
};
