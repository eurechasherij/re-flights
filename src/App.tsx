import { FullScreenLayout } from "@/layouts/FullScreenLayout";
import { LandingPage } from "@/pages/LandingPage";
import { Route, Routes } from "react-router";

const App = () => (
  <Routes>
    <Route element={<FullScreenLayout />}>
      <Route path="/" element={<LandingPage />} />
    </Route>
  </Routes>
);

export default App;
