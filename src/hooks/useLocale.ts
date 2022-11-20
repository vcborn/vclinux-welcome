import { useEffect, useState } from "react"
import en from "../locale/en"
import ja from "../locale/ja"

export const useLocale = () => {
  const [t, setT] = useState(en)
  const [lang, setLang] = useState("")
  useEffect(() => {
    window.Main.getLang()
    window.Main.on("lang", (lng: string) => {
      setLang(lng)
    })
    if (lang == 'ja') {
      setT(ja)
    } else {
      setT(en)
    }
  }, [t, lang])
  return { lang, t }
}