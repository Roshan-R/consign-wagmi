import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Issue from "./pages/Issue";
import Home from "./pages/Home";
import { Demo } from "./Demo";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issue" element={<Issue />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Router>
  );
}
