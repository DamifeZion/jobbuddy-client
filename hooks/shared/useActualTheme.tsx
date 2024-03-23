import { useTheme } from "next-themes";

//Note: This will always return light/dark. Therefore must be used to conditionally render items like logo, rather than the theme from next-theme
export const useActualTheme = () => {
   const { theme, systemTheme } = useTheme();
   const actualTheme = theme === "system" ? systemTheme : theme;

   return actualTheme;
};
