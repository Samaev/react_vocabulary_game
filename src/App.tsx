import { Link, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Results } from "./components/Results";
import { TestPage } from "./components/TestPage";
import { Vocabulary } from "./components/Vocabulary";
import { actions } from "./features/utils";

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
      <Link to="/test" onClick={handleWordsToCheck}>
        Repeat words
      </Link>
      <Link to="/results">Show Results</Link>
      <Link to="/">Home</Link>

      <Routes>
        <Route path="/" element={<Vocabulary />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
