import { useEffect } from "react"
import { ThemeSwitch as NextraThemeSwitch, useTheme } from "nextra-theme-docs"
import { useColorMode } from "@vastly/ui"

type ThemeSwitchProps = {
  lite?: boolean
  className?: string
}

export const ThemeSwitch = ({ lite, className }: ThemeSwitchProps) => {
  const { resolvedTheme } = useTheme()
  const { colorMode, toggleColorMode } = useColorMode()

  // Used to sync the Vastly theme with the Nextra theme
  useEffect(() => {
    if (colorMode !== resolvedTheme) {
      toggleColorMode()
    }
  }, [resolvedTheme])

  return <NextraThemeSwitch lite={lite} className={className} />
}
