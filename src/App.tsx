import { Link, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { AddWordPage } from "./components/AddWordPage";
import { Results } from "./components/Results";
import { TestPage } from "./components/TestPage";
import { Vocabulary } from "./components/Vocabulary";
import { actions } from "./features/utils";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const { words } = useAppSelector((state) => state.words);
  const handleWordsToCheck = () => {
    const tempArray = [];
    for (let i = 0; i < 10; i++) {
      tempArray.push(words[Math.floor(Math.random() * (words.length - 1))]);
    }
    console.log(tempArray);
    dispatch(actions.setWordsToCheck(tempArray));
  };

  return (
    <div className="App">
      <div className="nav">
        <Link className="box" to="/">
          Home
        </Link>
        <Link className="box" to="/addword">
          Add a word
        </Link>
        {words.length ? <Link className="box" to="/test" onClick={handleWordsToCheck}>
          Repeat words
        </Link> : null}
        <Link className="box" to="/results">
          Show Results
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Vocabulary />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/addword" element={<AddWordPage />} />
      </Routes>
    </div>
  );
}

export default App;
