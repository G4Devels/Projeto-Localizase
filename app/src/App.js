import { AppRoutes } from "./Routers/routes";
import { AuthAccountsProvider } from "./contexts/authAccounts";

export const App = () => {
  return (
    <AuthAccountsProvider>
      <AppRoutes />
    </AuthAccountsProvider>
  );
}

export default App;
