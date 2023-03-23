import { NativeBaseProvider, Box } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <Box>Test</Box>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}