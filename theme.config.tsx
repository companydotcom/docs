import React from "react"
import { DocsThemeConfig } from "nextra-theme-docs"
import { ThemeSwitch } from "./components/theme-switch"


const config: DocsThemeConfig = {
  logo: <span>Vastly Docs</span>,
  project: {
    link: "https://github.com/companydotcom/vastly"
  },
  docsRepositoryBase: "https://github.com/companydotcom/docs",
  footer: {
    text: "Vastly Wave"
  },
  themeSwitch: {
    component(args) {
      return <ThemeSwitch {...args} />
    }
  }
}

export default config
