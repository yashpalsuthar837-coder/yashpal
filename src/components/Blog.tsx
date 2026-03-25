import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '@/src/blogData';

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="py-24 md:py-48 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Articles & Insights</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts on design, technology, and the future of the web.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col gap-6"
            >
              <Link to={`/blog/${post.id}`} className="relative aspect-[16/9] overflow-hidden rounded-3xl glass block">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  whileHover={{ scale: 1.05 }}
                  referrerPolicy="no-referrer"
                />
              </Link>

              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold border border-foreground/10 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-foreground/80 transition-colors">{post.title}</h3>
                </Link>
                <span className="text-xs text-muted-foreground font-medium">{post.date}</span>
                <p className="text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-sm font-bold uppercase tracking-widest mt-2 flex items-center gap-2 group-hover:gap-4 transition-all duration-300"
                >
                  Read More <span className="text-lg">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
