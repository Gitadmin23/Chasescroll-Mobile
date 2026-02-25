import FlashMessage from "@/components/ui/flash-message";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { flashStore } from "@/lib/flash/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "jotai";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={flashStore}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
          <FlashMessage />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
