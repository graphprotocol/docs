import { Children, isValidElement, useState } from 'react';

export function CodeTabs({ children, defaultIndex = 0 }: { children: React.ReactNode; defaultIndex?: number }) {
  const tabs = Children.toArray(children).filter(isValidElement);

  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className="w-full my-6">
      {/* tab labels */}
      <div className="flex gap-2 border-b border-gray-700 mb-4 overflow-x-auto">
        {tabs.map((tab: any, i: number) => {
          const label = tab.props.label ?? `Tab ${i + 1}`;
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`px-3 py-1 text-sm rounded-t border-b-2 transition-colors ${
                i === activeIndex
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* active tab contents */}
      <div>{tabs[activeIndex]}</div>
    </div>
  );
}

export function CodeTab({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}