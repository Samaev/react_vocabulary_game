import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Results } from "./components/Results";
import { TestPage } from "./components/TestPage";
import { Vocabulary } from "./components/Vocabulary";
import { actions } from "./features/utils";
import { Word } from "./types/Word";

function App() {

  const words = useAppSelector(state=>state.words.words)
  const dispatch = useAppDispatch();
  const [wordsToCheck, setWordsToCheck] = useState<Word[]>([]);

  useEffect(() => {
    dispatch(actions.setWords(((): Word[] => {
        const storedWords = localStorage.getItem("words");
        return storedWords ? JSON.parse(storedWords) : [];
      })()))
  }, []);

  const handleWordsToCheck = () => {
    const tempArray = [];
    for (let i = 0; i < 10; i++) {
      tempArray.push(words[Math.floor(Math.random() * (words.length - 1))]);
    }
    console.log(tempArray);
    setWordsToCheck(tempArray);
  };

  return (
    <div className="App">
      <Link to="/test" onClick={handleWordsToCheck}>
        Repeat words
      </Link>
      <Link to="/results">Show Results</Link>
      <Link to="/">Home</Link>

      <Routes>
        <Route
          path="/"
          element={<Vocabulary words={words} />}
        />
        <Route
          path="/test"
          element={<TestPage wordsToCheck={wordsToCheck} />}
        />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
