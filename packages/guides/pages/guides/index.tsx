import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import guidesData from '@/data/guides.json';
import Link from 'next/link';

interface Guide {
  title: string;
  slug: string;
  description: string;
  categories: string[];
  date: string;
  author: string;
  types: string[];
  url: string;
}

const fuse = new Fuse(guidesData as Guide[], {
  includeScore: true,
  threshold: 0.4,
  keys: ['title', 'description', 'categories', 'types'],
});

const allCategories = Array.from(
  new Set((guidesData as Guide[]).flatMap((g) => g.categories)),
).sort();

export default function GuidesPage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const guides = useMemo(() => {
    let filtered: Guide[] = guidesData as Guide[];
    if (selected.size) {
      filtered = filtered.filter((g) => g.categories.some((c) => selected.has(c)));
    }
    if (query.trim()) {
      return fuse.search(query).map((r) => r.item).filter((g) => filtered.includes(g));
    }
    return filtered;
  }, [query, selected]);

  const toggleCategory = (cat: string) => {
    const next = new Set(selected);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    setSelected(next);
  };

  return (
    <div className="flex min-h-screen p-6 gap-8 font-sans">
      <aside className="w-64 border-r pr-4">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {allCategories.map((cat) => (
            <li key={cat} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selected.has(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 rounded border-gray-400"
              />
              <span className="text-sm">{cat}</span>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/2 border rounded px-3 py-2"
          />
        </div>
        <ul className="space-y-6">
          {guides.map((g) => (
            <li key={g.slug} className="border rounded p-4 hover:shadow">
              <Link href={`/guides/${g.slug}`} target="_blank">
                <h3 className="text-lg font-semibold mb-1">{g.title}</h3>
              </Link>
              <p className="text-sm text-gray-600 mb-2">{g.description}</p>
              <div className="text-xs text-gray-500 flex flex-wrap gap-2">
                {g.categories.map((c) => (
                  <span key={c} className="bg-gray-200 px-2 py-0.5 rounded">
                    {c}
                  </span>
                ))}
                {g.types.map((t) => (
                  <span key={t} className="bg-purple-200 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
                <span>{new Date(g.date).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
} 