import NewGoal from "./Components/newGoal";
import GetGoals from "./Components/getGoals";
import DetailGoal from "./Components/detailGoal";
import DeleteGoal from "./Components/deleteGoal";
import EditGoal from "./Components/editGoal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<GetGoals />} />
          <Route path="/newGoal" element={<NewGoal />} />
          <Route path="/detailGoal/:id" element={<DetailGoal />} />
          <Route path="/deleteGoal/:id" element={<DeleteGoal />} />
          <Route path="/editGoal/:id" element={<EditGoal />} />
        </Routes>
      </Router>
    </div>
  );
}
