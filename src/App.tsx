import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { MenuLateral } from "./shared/components";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { RecoilRoot } from "recoil";
import DialogProviderConfirm from "./shared/components/dialogs/DialogProviderConfirm";

function App() {
  return (
    <RecoilRoot>
      <DialogProviderConfirm>

        <AppThemeProvider>

          <DrawerProvider>
            <AuthProvider>

              <BrowserRouter>

                <MenuLateral>
                  <AppRoutes />
                </MenuLateral>

              </BrowserRouter>

            </AuthProvider>
          </DrawerProvider>

        </AppThemeProvider>
      </DialogProviderConfirm>

    </RecoilRoot>

  );
}

export default App;
