import { client } from "@/sanity/client";
import { getPostsQuery } from "@/sanity/queries";
import Link from "next/link";

// Using dynamic rendering to always fetch the latest posts
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts = [];
  try {
    posts = await client.fetch(getPostsQuery);
  } catch (error) {
    console.warn("Could not fetch posts, dataset might not exist yet:", error);
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden text-nanai-ink"
      style={{
        backgroundImage: "var(--nanai-bg-image-3)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "var(--nanai-section-bg-attachment-3)",
        backgroundBlendMode: "var(--nanai-section-bg-blend-3)" as any,
      }}
    >
      {/* Overlay to ensure text readability */}
      <div 
        className="absolute inset-0 bg-nanai-canvas" 
        style={{ opacity: "var(--nanai-section-bg-opacity-3)" }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-16 text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] mb-4 text-nanai-sage font-medium">Stories & Care Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-nanai-ink">Nanai Rituals</h1>
          <p className="text-lg text-nanai-ink/80 leading-relaxed font-light">
            Insights on skin health, barrier repair, and finding rhythm in a busy world. Written with care, for you.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-nanai-canvas/60 backdrop-blur-md rounded-2xl border border-nanai-blush/30">
            <h2 className="text-2xl font-serif mb-3 text-nanai-ink">The rituals space is quiet today</h2>
            <p className="text-nanai-ink/70">Check back soon for new stories and care notes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post: any) => (
              <Link 
                key={post._id} 
                href={`/blog/${post.slug.current}`}
                className="group flex flex-col bg-nanai-canvas/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-nanai-blush/40 hover:border-nanai-sage/60 transition-all duration-500 hover:shadow-nanai-soft hover:-translate-y-1"
              >
                {post.mainImage && (
                  <div className="aspect-[4/3] w-full overflow-hidden bg-nanai-blush/20 relative">
                    {/* Placeholder for Sanity Image, in a real scenario use next-sanity/image */}
                    <div className="absolute inset-0 bg-nanai-rose/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={`https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${post.mainImage.asset._ref.split("-")[1]}-${post.mainImage.asset._ref.split("-")[2]}.${post.mainImage.asset._ref.split("-")[3]}`} 
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  {post.publishedAt && (
                    <time className="text-xs tracking-wider uppercase text-nanai-sage mb-3">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                  )}
                  <h2 className="text-2xl font-serif mb-4 text-nanai-ink group-hover:text-nanai-sage transition-colors">
                    {post.title}
                  </h2>
                  <div className="mt-auto pt-6 flex items-center text-sm font-medium tracking-wide text-nanai-ink/60 group-hover:text-nanai-ink transition-colors">
                    Read story 
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
