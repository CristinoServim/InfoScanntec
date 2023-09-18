import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider, DrawerProvider, LoginProvider } from "./shared/contexts";
import { MenuLateral } from "./shared/components";
import { AuthProvider } from "./shared/contexts/AuthContext";

function App() {
  return (
    <AppThemeProvider>

      <DrawerProvider>
        <AuthProvider>

          <BrowserRouter>

            <MenuLateral >
              <AppRoutes />
            </MenuLateral>

          </BrowserRouter>

        </AuthProvider>
      </DrawerProvider>

    </AppThemeProvider>

  );
}

export default App;
