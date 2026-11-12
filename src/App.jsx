import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Load pages only when they are needed
const Home = lazy(() => import("./Pages/Home"));
const Details = lazy(() => import("./Pages/Details"));
const Preview = lazy(() => import("./Pages/Preview"));
const About = lazy(() => import("./Pages/About"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div style={{ textAlign: "center", padding: "40px" }}>
            Loading page...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:templateId" element={<Details />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;