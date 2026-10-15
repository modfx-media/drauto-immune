import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatBlogDate, type BlogPostSummary } from "@/lib/blog-posts";

/**
 * Post-preview card. `variant="grid"` is the full hub-grid card (image +
 * title + excerpt + meta row) with a slightly stronger hover-lift/scale-up
 * than the generic `Card` component; `variant="compact"` is a smaller
 * thumbnail row used in the "Recent Blogs" sidebar.
 */
export default function BlogCard({
  post,
  variant = "grid",
}: {
  post: BlogPostSummary;
  variant?: "grid" | "compact";
}) {
  const date = formatBlogDate(post.datePublished);
  const href = `/blog/${post.slug}/`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group flex items-center gap-3 rounded-card p-2 transition-colors duration-200 hover:bg-sage"
      >
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-sage">
          {post.image && (
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              sizes="80px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm font-medium leading-snug text-ink group-hover:text-primary">
            {post.title}
          </p>
          {date && <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-ink-soft">{date}</p>}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-gray bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sage">
        {post.image && (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        {date && <Badge tone="neutral">{date}</Badge>}
        <h3 className="text-lg font-extrabold leading-snug text-ink transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        {post.excerpt && <p className="line-clamp-3 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between pt-2 text-sm">
          <span className="font-medium text-primary">Read more →</span>
          {post.readingTime && <span className="text-ink-soft">{post.readingTime}</span>}
        </div>
      </div>
    </Link>
  );
}
