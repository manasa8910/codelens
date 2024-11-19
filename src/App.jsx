import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Settings from "./pages/Settings";
import Header from "./components/Header";

function App() {
  const location = useLocation();

  return (
    <>
      <div
        className={`h-full w-full ${location.pathname === "/" ? "" : "flex"}`}
      >
        {location.pathname !== "/" && <Header />}
        {/* Only show Header if not on Home */}
        <Routes>
          <Route exact path="/" element={<Landing />} />

          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<Project />} />
          <Route exact path="/settings" element={<Settings />} />

          {/* Add route for About page */}
        </Routes>
      </div>
    </>
  );
}

export default App;
