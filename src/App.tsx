import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { MenuLateral } from "./shared/components";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { RecoilRoot } from "recoil";
import DialogProviderConfirm from "./shared/components/dialogs/DialogProviderConfirm";
import DialogProviderSucess from "./shared/components/dialogs/DialogProviderSucess";

function App() {
  return (
    <RecoilRoot>
      <DialogProviderConfirm>
        <DialogProviderSucess>


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

        </DialogProviderSucess>
      </DialogProviderConfirm>

    </RecoilRoot>

  );
}

export default App;
