import { ref, watchEffect } from "vue";

export type Theme = "ocean" | "forest";//| "desert";
const currentTheme = ref<Theme>(
  (window.localStorage.getItem("theme") as Theme) || "ocean"
);

export function useTheme() {
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme;
    window.localStorage.setItem("theme", theme);
    (document as any).documentElement.setAttribute("data-theme", theme);
  };

  // reactive update
  watchEffect(() => {
    (document as any).documentElement.setAttribute("data-theme", currentTheme.value);
  });

  return { currentTheme, setTheme };
}
