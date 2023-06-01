export default function Loading() {
  return (
    <div className="flex flex-col w-[400px] h-[200px] pb-12">
      <div className="loader">
        <span className="relative top-20 right-2 text-purple-500">
          loading...
        </span>
      </div>
    </div>
  )
}
