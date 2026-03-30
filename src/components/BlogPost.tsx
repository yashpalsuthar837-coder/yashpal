import { motion, useScroll, useTransform } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '@/src/blogData';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === id);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6">
        <Helmet>
          <title>Post Not Found | Yashpal Portfolio</title>
          <meta name="description" content="The blog post you are looking for could not be found." />
        </Helmet>
        <h1 className="text-4xl font-bold mb-6">Post Not Found</h1>
        <Link to="/blog" className="px-8 py-4 rounded-full glass font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-background min-h-screen text-foreground"
      ref={containerRef}
    >
      <Helmet>
        <title>{`${post.title} | Yashpal's Blog`}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <link rel="canonical" href={window.location.href} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:author" content="Yashpal Suthar" />
        <meta property="article:section" content={post.tags[0]} />
        <meta property="article:tag" content={post.tags.join(', ')} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <meta name="twitter:creator" content="@yasxpal" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover grayscale opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <Link to="/blog" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight"
          >
            {post.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-sm font-medium">{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={16} />
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs font-bold uppercase tracking-widest border border-border px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="prose prose-lg max-w-none"
          >
            <div className="markdown-body">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8"
          >
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Share this article</span>
              <div className="flex gap-4">
                {/* Social Share Buttons (Mock) */}
                <button className="text-muted-foreground hover:text-foreground transition-colors">Twitter</button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">Facebook</button>
              </div>
            </div>
            <Link to="/blog" className="px-8 py-4 rounded-full glass font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300">
              Back to Blog
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.article>
  );
}
