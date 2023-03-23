import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Box } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <NativeBaseProvider>
          <SafeAreaView>
            <Box>Test</Box>
          </SafeAreaView>
        </NativeBaseProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}