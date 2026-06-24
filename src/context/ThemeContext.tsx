import { colorScheme, vars } from "nativewind";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance, View } from "react-native";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

// Each vars() call produces a React Native style object that injects CSS
// custom properties into the subtree — no dark: prefixes needed anywhere.
const themeVars = {
  light: vars({
    "--bg":           "255 255 255", // white
    "--surface":      "250 250 250", // black-5
    "--fg":           "15 23 42",    // dark
    "--fg-2":         "97 97 97",    // black-70
    "--fg-muted":     "189 189 189", // black-40
    "--ui-border":    "238 238 238", // black-20
    "--input-bg":     "255 255 255", // white
    "--input-border": "224 224 224", // black-30
  }),
  dark: vars({
    "--bg":           "15 23 42",    // dark
    "--surface":      "30 41 59",    // dark-card
    "--fg":           "255 255 255", // white
    "--fg-2":         "224 224 224", // black-30
    "--fg-muted":     "117 117 117", // black-60
    "--ui-border":    "66 66 66",    // black-80
    "--input-bg":     "30 41 59",    // dark-card
    "--input-border": "97 97 97",    // black-70
  }),
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = Appearance.getColorScheme() ?? "light";
  const [theme, setThemeState] = useState<ThemeMode>(system);

  useEffect(() => {
    colorScheme.set(theme);
  }, [theme]);

  const setTheme = useCallback((mode: ThemeMode) => setThemeState(mode), []);
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === "light" ? "dark" : "light")),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme, setTheme }}>
      <View style={[{ flex: 1 }, themeVars[theme]]}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
