import { Children, isValidElement, useState } from 'react'

export function CodeTabs({ children, defaultIndex = 0 }: { children: React.ReactNode; defaultIndex?: number }) {
  const tabs = Children.toArray(children).filter(isValidElement)

  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  return (
    <div className="my-6 w-full">
      {/* tab labels */}
      <div className="border-gray-700 mb-4 flex gap-2 overflow-x-auto border-b">
        {tabs.map((tab: any, i: number) => {
          const label = tab.props.label ?? `Tab ${i + 1}`
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`text-sm rounded-t border-b-2 px-3 py-1 transition-colors ${
                i === activeIndex
                  ? 'border-blue-500 text-blue-500'
                  : 'text-gray-400 hover:text-gray-200 border-transparent'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* active tab contents */}
      <div>{tabs[activeIndex]}</div>
    </div>
  )
}

export function CodeTab({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
