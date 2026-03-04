import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Coach } from './pages/Coach';
import { DebtCalculator } from './pages/DebtCalculator';
import { Learn } from './pages/Learn';
import { Layout } from './Layout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/debt" element={<DebtCalculator />} />
          <Route path="/learn" element={<Learn />} />
        </Route>
      </Routes>
    </Router>
  );
}
