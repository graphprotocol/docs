import React, { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import guidesData from '../../data/guides.json';
import Link from 'next/link';

interface Guide {
  title: string;
  slug: string;
  description: string;
  products: string[];
  date: string;
  author: string;
  types: string[];
  url?: string;
  difficulty: string;
  content: string;
}

const PRODUCTS = [
  'Subgraphs',
  'Substreams',
  'Token API',
  'The Graph Network',
  'Graph Node',
] as const;

const GUIDE_TYPES = ['Blog', 'Repository', 'Video', 'Workshop'] as const;

const DIFFICULTIES = ['Easy', 'Intermediate', 'Advanced'] as const;

const fuse = new Fuse(guidesData as Guide[], {
  includeScore: true,
  threshold: 0.4,
  keys: ['title', 'description', 'products', 'types'],
});

export default function GuidesPage() {
  const [query, setQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedDifficulties, setSelectedDifficulties] = useState<Set<string>>(new Set());

  const guides = useMemo(() => {
    let filtered: Guide[] = guidesData as Guide[];

    if (selectedProducts.size) {
      filtered = filtered.filter((g) => g.products.some((p) => selectedProducts.has(p)));
    }
    if (selectedTypes.size) {
      filtered = filtered.filter((g) => g.types.some((t) => selectedTypes.has(t)));
    }
    if (selectedDifficulties.size) {
      filtered = filtered.filter((g) => selectedDifficulties.has(g.difficulty));
    }
    if (query.trim()) {
      return fuse
        .search(query)
        .map((r) => r.item)
        .filter((g) => filtered.includes(g));
    }
    return filtered;
  }, [query, selectedProducts, selectedTypes, selectedDifficulties]);

  const toggle = (value: string, set: React.Dispatch<React.SetStateAction<Set<string>>>) => {
    set((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  };

  const Checkbox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange(): void }) => (
    <li className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-400"
      />
      <span className="text-sm select-none">{label}</span>
    </li>
  );

  return (
    <div className="flex min-h-screen p-6 gap-8 font-sans">
      <aside className="w-64 border-r pr-4 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <ul className="space-y-2">
            {PRODUCTS.map((p) => (
              <Checkbox key={p} label={p} checked={selectedProducts.has(p)} onChange={() => toggle(p, setSelectedProducts)} />
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Guide Type</h2>
          <ul className="space-y-2">
            {GUIDE_TYPES.map((t) => (
              <Checkbox key={t} label={t} checked={selectedTypes.has(t)} onChange={() => toggle(t, setSelectedTypes)} />
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Difficulty</h2>
          <ul className="space-y-2">
            {DIFFICULTIES.map((d) => (
              <Checkbox key={d} label={d} checked={selectedDifficulties.has(d)} onChange={() => toggle(d, setSelectedDifficulties)} />
            ))}
          </ul>
        </div>
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
                {g.products.map((c) => (
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
                <span className="bg-blue-200 px-2 py-0.5 rounded">{g.difficulty}</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
} 