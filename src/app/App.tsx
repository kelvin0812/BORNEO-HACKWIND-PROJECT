import { RouterProvider, createBrowserRouter } from 'react-router';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Coach } from './pages/Coach';
import { DebtCalculator } from './pages/DebtCalculator';
import { Learn } from './pages/Learn';
import { Invest } from './pages/Invest';
import { Profile } from './pages/Profile';
import { Layout } from './Layout';
import { FinanceProvider } from './context/FinanceContext';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "coach", Component: Coach },
      { path: "debt", Component: DebtCalculator },
      { path: "learn", Component: Learn },
      { path: "invest", Component: Invest },
      { path: "profile", Component: Profile },
    ],
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  }
]);

function App() {
  return (
    <FinanceProvider>
      <RouterProvider router={router} />
    </FinanceProvider>
  );
}

export default App;
