import { Result } from "../types/Result";
import { Word } from "../types/Word";

type State = {
  words: Word[];
  results: Result[];
};

const initialState: State = {
  words: [],
  results: [],
};

type SetWordsAction = {
  type: "words/set";
  payload: Word[];
};

type SetResultsAction = {
  type: "results/set";
  payload: Result[];
};

type Action = SetWordsAction | SetResultsAction;

export const wordsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "words/set":
      return {
        ...state,
        words: action.payload,
      };
    case "results/set":
      return {
        ...state,
        results: action.payload,
      }
    default:
      return state;
  }
};

export const actions = {
  setWords: (words: Word[]): SetWordsAction => ({
    type: "words/set",
    payload: words,
  }),
  setResults: (results: Result[]): SetResultsAction => ({
    type: "results/set",
    payload: results,
  })
};
