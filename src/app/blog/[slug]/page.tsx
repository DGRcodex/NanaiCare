import { client } from "@/sanity/client";
import { getPostBySlugQuery, getPostsQuery } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await client.fetch(getPostsQuery);
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(getPostBySlugQuery, { slug: params.slug });

  if (!post) {
    return notFound();
  }

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null;
        }
        const ref = value.asset._ref.split("-");
        const url = `https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${ref[1]}-${ref[2]}.${ref[3]}`;
        return (
          <img
            alt={value.alt || " "}
            loading="lazy"
            src={url}
            className="w-full rounded-2xl my-12"
          />
        );
      },
    },
    marks: {
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value.href} rel={rel} className="text-nanai-sage underline decoration-nanai-sage/30 hover:decoration-nanai-sage transition-colors">
            {children}
          </a>
        );
      },
    },
    block: {
      h1: ({ children }: any) => <h1 className="text-4xl font-serif mt-16 mb-6 text-nanai-ink">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-3xl font-serif mt-12 mb-6 text-nanai-ink">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-serif mt-8 mb-4 text-nanai-ink">{children}</h3>,
      normal: ({ children }: any) => <p className="text-lg text-nanai-ink/80 leading-relaxed mb-6 font-light">{children}</p>,
      blockquote: ({ children }: any) => <blockquote className="border-l-2 border-nanai-sage pl-6 italic my-8 text-xl text-nanai-ink/70 font-serif">{children}</blockquote>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-nanai-ink/80 font-light">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-nanai-ink/80 font-light">{children}</ol>,
    },
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-nanai-canvas"
      style={{
        backgroundImage: "var(--nanai-bg-image-3)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "var(--nanai-section-bg-attachment-3)",
        backgroundBlendMode: "var(--nanai-section-bg-blend-3)" as any,
      }}
    >
      <div 
        className="absolute inset-0 bg-nanai-canvas" 
        style={{ opacity: "var(--nanai-section-bg-opacity-3)" }}
      />
      
      <article className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-32">
        <Link href="/blog" className="inline-flex items-center text-sm tracking-widest uppercase font-medium text-nanai-sage mb-12 hover:text-nanai-ink transition-colors">
          ← Back to journal
        </Link>
        
        <header className="mb-16">
          {post.publishedAt && (
            <time className="block text-sm uppercase tracking-[0.2em] mb-4 text-nanai-ink/60 font-medium">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          )}
          <h1 className="text-4xl md:text-6xl font-serif mb-12 text-nanai-ink leading-tight">
            {post.title}
          </h1>

          {post.mainImage && (
            <div className="w-full aspect-[21/9] md:aspect-[2/1] relative overflow-hidden rounded-3xl shadow-nanai-soft">
              <img 
                src={`https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${post.mainImage.asset._ref.split("-")[1]}-${post.mainImage.asset._ref.split("-")[2]}.${post.mainImage.asset._ref.split("-")[3]}`} 
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </header>

        <div className="prose-nanai max-w-none bg-nanai-canvas/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-nanai-blush/40 shadow-sm">
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-nanai-ink/60 italic font-light">This story has no content yet.</p>
          )}
        </div>
      </article>
    </div>
  );
}
