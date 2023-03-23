import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "./context/AuthContext";
import AppStack from "./navigation";
import { theme } from './lib/theme';

export default function App() {
  return (
    <AuthProvider>
      <NativeBaseProvider theme={theme}>
        <AppStack />
      </NativeBaseProvider>
    </AuthProvider>
  );
}