export function Toolbar() {
  return (
    <>
      <header className="h-9 w-full flex border-b-2 border-gray-200 items-center bg-gray-100 dark:bg-gray-950 dark:border-gray-800">
        <span className="px-4 h-full flex items-center justify-center font-light text-sm bg-gray-100 hover:bg-gray-200 text-gray-400 dark:text-gray-300 dark:bg-gray-950 dark:hover:bg-gray-800 cursor-pointer">File</span>
        <span className="px-4 h-full flex items-center justify-center font-light text-sm bg-gray-100 hover:bg-gray-200 text-gray-400 dark:text-gray-300 dark:bg-gray-950 dark:hover:bg-gray-800 cursor-pointer">Edit</span>
        <span className="px-4 h-full flex items-center justify-center font-light text-sm bg-gray-100 hover:bg-gray-200 text-gray-400 dark:text-gray-300 dark:bg-gray-950 dark:hover:bg-gray-800 cursor-pointer">Tools</span>
        <span className="px-4 h-full flex items-center justify-center font-light text-sm bg-gray-100 hover:bg-gray-200 text-gray-400 dark:text-gray-300 dark:bg-gray-950 dark:hover:bg-gray-800 cursor-pointer">Help</span>
      </header>
    </>
    
  )
}