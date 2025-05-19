import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import guides from '../../data/guides.json';

interface Guide {
  title: string;
  slug: string;
  description: string;
  products: string[];
  date: string;
  author: string;
  types: string[];
  difficulty: string;
  content: string;
  url?: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (guides as Guide[]).map((g) => ({ params: { slug: g.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const guide = (guides as Guide[]).find((g) => g.slug === params?.slug);
  if (!guide) return { notFound: true };
  return {
    props: { guide },
  };
};

export default function GuidePage({ guide }: { guide: Guide }) {
  return (
    <article className="prose lg:prose-lg mx-auto px-4 py-6">
      <Link href="/guides" className="text-sm text-blue-600">← Back to Guides</Link>
      <h1>{guide.title}</h1>
      <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
      <div className="text-xs text-gray-500 flex flex-wrap gap-2 mb-4">
        {guide.products.map((p) => (
          <span key={p} className="bg-gray-200 px-2 py-0.5 rounded">{p}</span>
        ))}
        {guide.types.map((t) => (
          <span key={t} className="bg-purple-200 px-2 py-0.5 rounded">{t}</span>
        ))}
        <span className="bg-blue-200 px-2 py-0.5 rounded">{guide.difficulty}</span>
        <span>{new Date(guide.date).toLocaleDateString()}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: guide.content.replace(/\n/g, '<br/>') }} />
      {guide.url && (
        <p className="mt-6">
          <a href={guide.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            View original resource
          </a>
        </p>
      )}
    </article>
  );
} 