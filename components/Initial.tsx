import { type FormEvent, useState } from "react"

interface IProps {
  onSetIsReady: (
    isReady: boolean,
    config: { appid: string; key: string }
  ) => void
}
// 初始化保存翻译 API 的 KEY 和 APPID
export default function Initial({ onSetIsReady }: IProps) {
  const [appidError, setAppidError] = useState("")
  const [keyError, setKeyError] = useState("")
  const [appid, setAppid] = useState("")
  const [key, setKey] = useState("")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (appid.trim().length === 0) {
      setAppidError("appid 不能为空")
      return
    }
    if (key.trim().length === 0) {
      setKeyError("key 不能为空")
      return
    }
    chrome.storage.sync.set({ appid, key })
    onSetIsReady(true, { appid, key })
  }

  return (
    <form className="w-[400px] p-4" onSubmit={onSubmit}>
      <div className="flex flex-col gap-2 mb-2">
        <label htmlFor="appid">百度翻译 APPID:</label>
        <input
          className="border border-purple-300 rounded-sm p-1"
          type="text"
          id="appid"
          value={appid}
          onChange={(e) => setAppid(e.target.value.trim())}
        />
        <span className="text-red-400 font-sm">{appidError}</span>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        <label htmlFor="key">百度翻译 KEY:</label>
        <input
          className="border border-purple-300 rounded-sm p-1"
          type="text"
          id="key"
          value={key}
          onChange={(e) => setKey(e.target.value.trim())}
        />
        <span className="text-red-400 font-sm">{keyError}</span>
      </div>
      <button
        type="submit"
        className="px-3 py-1.5 rounded-sm bg-purple-500 text-white mt-4">
        初始化
      </button>
    </form>
  )
}
