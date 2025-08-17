import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="*" element={<h1 className="flex h-screen w-screen items-center justify-center text-primary text-4xl lg:text-8xl p-4">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
