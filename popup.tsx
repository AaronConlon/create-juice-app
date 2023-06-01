import "./style.css"

import { useEffect, useState } from "react"

import IconPng from "data-base64:~assets/icon.png"
import Initial from "~components/Initial"
import Loading from "~components/Loading"
import { translateTo } from "~utils"

function IndexPopup() {
  const [initLoading, setInitLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [data, setData] = useState("")
  const [isError, setIsError] = useState(false)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [localRecord, setLocalRecord] = useState<Record<string, string>>({})
  const [appid, setAppid] = useState("")
  const [key, setKey] = useState("")
  const [isEnToZh, setIsEnToZh] = useState(true)

  const tryToTranslate = async () => {
    try {
      if (loading) return
      setLoading(true)
      const raw = query.trim()
      const { trans_result } = await translateTo(raw, key, appid, isEnToZh)
      const text = trans_result[0].dst
      const rawRecord = await chrome.storage.sync.get("record")
      const record = rawRecord.record ? JSON.parse(rawRecord.record) : {}
      if (record[raw]) {
        // delete old value and reset order
        delete record[raw]
      }
      // add new record
      record[raw] = text
      // if record's size large than 10, remove the first one
      if (Object.keys(record).length > 10) {
        const keys = Object.keys(record)
        delete record[keys[0]]
      }
      // save to chrome storage
      chrome.storage.sync.set({ record: JSON.stringify(record) })
      setLocalRecord(record)
      setIsError(false)
      return text
    } catch (error) {
      console.log("error:", error)
      setIsError(true)
    }
  }

  const onKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (query.trim().length === 0) {
      setData("")
      return
    }
    if (e.key === "Enter") {
      const result = await tryToTranslate()
      setData(result)
      setLoading(false)
    }
  }

  const onHandleChange = (e) => {
    setQuery(e.target.value)
  }

  const onSetIsReady = (
    _isReady: boolean,
    config: {
      appid: string
      key: string
    }
  ) => {
    setIsReady(_isReady)
    setAppid(config.appid)
    setKey(config.key)
  }

  const onChangeTranslateLanguage = (e: any) => {
    // e.target.stopPagination()
    e.stopPropagation()
    setIsEnToZh(!isEnToZh)
  }

  const onClearRecord = () => {
    setLocalRecord({})
    chrome.storage.sync.set({ record: "" })
  }

  useEffect(() => {
    // get appid and key from chrome storage
    const getAppidAndKey = async () => {
      const rawAppid = await chrome.storage.sync.get("appid")
      setInitLoading(false)
      // 提交限制必须都提交，可以单一判断
      if (!rawAppid.appid) return
      const rawKey = await chrome.storage.sync.get("key")
      setAppid(rawAppid.appid)
      setKey(rawKey.key)
      setIsReady(true)
    }
    const getRecord = async () => {
      const rawRecord = await chrome.storage.sync.get("record")
      if (!rawRecord.record) return
      const result = JSON.parse(rawRecord.record)
      setLocalRecord(result as Record<string, string>)
    }

    getAppidAndKey()
    // chrome.storage.sync.clear()
    getRecord()
  }, [])

  if (initLoading) return <Loading />

  if (!isReady) {
    return <Initial onSetIsReady={onSetIsReady} />
  }

  return (
    <div className="w-[400px]  p-4">
      <div className="mb-8 sticky top-0 z-10 bg-white">
        <div
          className="absolute top-[3px] left-[3px] px-[6px] opacity-70 hover:opacity-100 bottom-[3px] bg-purple-800 text-white flex items-center rounded-md cursor-pointer select-none"
          onClick={onChangeTranslateLanguage}>
          <span>{isEnToZh ? "英" : "中"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M4.993 11.016a1 1 0 0 1-.531-1.848L7.15 6.48a1 1 0 0 1 1.414 1.415l-1.121 1.12h7.55a1 1 0 0 1 0 2h-10Zm14.014 1.968a1 1 0 0 1 .531 1.848L16.85 17.52a1 1 0 1 1-1.414-1.415l1.121-1.12h-7.55a1 1 0 1 1 0-2h10Z"
            />
          </svg>
          <span>{!isEnToZh ? "英" : "中"}</span>
        </div>
        <input
          type="text"
          value={query}
          onChange={onHandleChange}
          onKeyUp={onKeyUp}
          placeholder="..."
          autoFocus
          className="transition-all w-full px-4 py-2 pl-[4.2rem] outline-none border border-purple-400 rounded-md"
        />
        <img
          src={IconPng}
          className="cursor-pointer transform translate-y-[-50%] w-[24px] h-[24px] absolute top-[50%] right-1"
          onClick={tryToTranslate}
        />
      </div>
      {isError ? (
        <div className="text-red-500 text-right mb-2">
          😭 网络异常，请稍后再试
        </div>
      ) : (
        <>
          <div className="flex justify-center flex-col">
            {loading ? (
              <Loading />
            ) : query.trim().length === 0 || data.length === 0 ? null : (
              <div className="mb-4">
                <div className="opacity-50 text-lg">
                  <span>翻译结果：</span>
                </div>
                <div className="text-lg">
                  {query}:&nbsp;&nbsp;{data}
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {loading === false &&
      data.trim().length === 0 &&
      Object.keys(localRecord).length > 0 ? (
        <>
          <div className="h-[1px] bg-gray-100 mb-4"></div>
          <div className="text-lg flex justify-between group">
            <div className="opacity-50">最近翻译</div>
            <svg
              onClick={onClearRecord}
              className="cursor-pointer transition-all text-gray-300 group-hover:text-red-500 opacity-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM7 6v13h10V6H7Zm2 10q0 .425.288.713T10 17q.425 0 .713-.288T11 16V9q0-.425-.288-.713T10 8q-.425 0-.713.288T9 9v7Zm4 0q0 .425.288.713T14 17q.425 0 .713-.288T15 16V9q0-.425-.288-.713T14 8q-.425 0-.713.288T13 9v7ZM7 6v13V6Z"
              />
            </svg>
          </div>
          {Object.entries(localRecord)
            .reverse()
            .map(([k, v], idx) => {
              return (
                <section key={k} className="flex items-center flex-wrap">
                  <span className="text-gray-300">{idx + 1}:</span>
                  <span className="mx-2 p-1 text-purple-800 text-[14px] max-w-[60%] line-clamp-2">
                    {k}
                  </span>
                  <span className="text-gray-700 p-2">{v}</span>
                </section>
              )
            })}
        </>
      ) : null}
    </div>
  )
}

export default IndexPopup
