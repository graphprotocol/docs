import { GetServerSideProps } from 'next';
import guides from '@/data/guides.json';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const guide = (guides as any[]).find((g) => g.slug === params?.slug);
  if (guide) {
    return {
      redirect: {
        destination: guide.url,
        permanent: false,
      },
    };
  }
  return { notFound: true };
};

export default function Guide() {
  return null;
} 