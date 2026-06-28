import { colorScheme, vars } from "nativewind";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme, View } from "react-native";

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
    "--surface":      "245 245 245", // #F5F5F5 — light card bg, distinct from white
    "--fg":           "15 23 42",    // #0F172A — near-black primary text
    "--fg-2":         "97 97 97",    // #616161 — secondary labels (form labels etc.)
    "--fg-muted":     "117 117 117", // #757575 — muted text (subtitles, captions)
    "--ui-border":    "238 238 238", // #EEEEEE
    "--input-bg":     "255 255 255", // white
    "--input-border": "224 224 224", // #E0E0E0
    "--primary":      "38 103 255",  // #2667FF
    "--header":       "38 103 255",  // #2667FF — brand blue header
    "--header-card":  "21 53 184",   // #1535B8 — deeper blue balance card
  }),
  dark: vars({
    "--bg":           "15 23 42",    // #0F172A — dark page bg
    "--surface":      "30 41 59",    // #1E293B — dark card bg
    "--fg":           "255 255 255", // white — primary text
    "--fg-2":         "189 189 189", // #BDBDBD — secondary labels on dark
    "--fg-muted":     "158 158 158", // #9E9E9E — muted captions on dark cards
    "--ui-border":    "66 66 66",    // #424242
    "--input-bg":     "30 41 59",    // #1E293B
    "--input-border": "97 97 97",    // #616161
    "--primary":      "38 103 255",  // #2667FF
    "--header":       "13 27 62",    // #0D1B3E — dark navy header
    "--header-card":  "26 42 82",    // #1A2A52 — dark steel balance card
  }),
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const raw = useColorScheme();
  const systemScheme: ThemeMode = raw === "dark" ? "dark" : "light";
  const [theme, setThemeState] = useState<ThemeMode>(systemScheme);

  // Re-sync whenever the OS appearance changes
  useEffect(() => {
    setThemeState(systemScheme);
  }, [systemScheme]);

  // Keep NativeWind's colorScheme in sync whenever theme changes
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
