import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider, DrawerProvider, LoginProvider } from "./shared/contexts";
import { MenuLateral } from "./shared/components";

function App() {
  return (
    <AppThemeProvider>

      <DrawerProvider>
        <LoginProvider>

          <BrowserRouter>

            <MenuLateral >
              <AppRoutes />
            </MenuLateral>

          </BrowserRouter>

        </LoginProvider>
      </DrawerProvider>

    </AppThemeProvider>

  );
}

export default App;
