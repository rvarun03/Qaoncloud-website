import BlogPageComponent from '@/components/BlogPage/BlogPage';
import type { Metadata, ResolvingMetadata } from 'next';

const routePath = '/Blogs';

const resolveTitle = (title: unknown): string => {
  if (typeof title === 'string') return title;
  if (title && typeof title === 'object') {
    const maybeAbsolute = (title as { absolute?: unknown }).absolute;
    if (typeof maybeAbsolute === 'string') return maybeAbsolute;
    const maybeDefault = (title as { default?: unknown }).default;
    if (typeof maybeDefault === 'string') return maybeDefault;
  }
  return '';
};

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMetadata = await parent;
  const pageTitle = resolveTitle(parentMetadata.title);
  const pageDescription = typeof parentMetadata.description === 'string' ? parentMetadata.description : '';
  const socialTitle = pageTitle.endsWith(' | QAonCloud') ? pageTitle : `${pageTitle} | QAonCloud`;

  return {
    alternates: {
      canonical: routePath,
      languages: {
        en: routePath,
        'x-default': routePath,
      },
    },
    openGraph: {
      title: socialTitle,
      description: pageDescription,
      url: routePath,
    },
    twitter: {
      title: socialTitle,
      description: pageDescription,
    },
  };
}

export default function BlogPage() {
  return <BlogPageComponent />;
}
