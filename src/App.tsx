import { FullScreenLayout } from "@/layouts/FullScreenLayout";
import { LandingPage } from "@/pages/LandingPage";
import { FlightsPage } from "@/pages/FlightsPage";
import { FlightDemo } from "@/pages/FlightDemo";
import { Route, Routes } from "react-router";

const App = () => (
  <Routes>
    <Route element={<FullScreenLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/flights" element={<FlightsPage />} />
      <Route path="/demo" element={<FlightDemo />} />
    </Route>
  </Routes>
);

export default App;
