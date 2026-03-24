export interface Post {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  excerpt: string;
  image: string;
}

export const posts: Post[] = [
  {
    id: 'minimalist-design-principles',
    title: 'Minimalist Design Principles for Modern Web',
    date: 'March 15, 2026',
    tags: ['Design', 'UX'],
    excerpt: 'Exploring the core principles of minimalist design and how they can enhance user experience on the modern web.',
    image: 'https://picsum.photos/seed/blog1/800/600',
    content: `
# Minimalist Design Principles for Modern Web

Minimalism is not just about having less; it's about having exactly what you need. In the context of web design, it's a powerful tool for creating focused, efficient, and beautiful user experiences.

## 1. Less is More
The most fundamental principle of minimalism. Every element on the page should serve a purpose. If it doesn't contribute to the user's goal, it should be removed.

## 2. White Space is Your Friend
White space (or negative space) is the area between design elements. It's not "empty" space; it's a structural component that provides breathing room and helps define hierarchy.

## 3. Typography as a Design Element
In minimalist design, typography often takes center stage. Choosing the right typeface and using it effectively can convey personality and establish a clear visual hierarchy without the need for excessive imagery.

## 4. Limited Color Palette
A minimalist design typically uses a very restricted color palette. This helps maintain a clean look and ensures that the focus remains on the content.

## 5. Purposeful Visuals
When visuals are used, they should be high-quality and directly relevant to the content. A single, powerful image is often more effective than a gallery of mediocre ones.

---
Minimalism is a journey, not a destination. It requires constant refinement and a deep understanding of your users' needs.
    `,
  },
  {
    id: 'mastering-framer-motion',
    title: 'Mastering Framer Motion for React',
    date: 'March 10, 2026',
    tags: ['React', 'Animation'],
    excerpt: 'A comprehensive guide to creating smooth, complex animations in React using the Framer Motion library.',
    image: 'https://picsum.photos/seed/blog2/800/600',
    content: `
# Mastering Framer Motion for React

Framer Motion is a production-ready motion library for React. It's simple yet powerful, allowing you to create complex animations with ease.

## Why Framer Motion?
Framer Motion provides a declarative API that makes it easy to animate components. It handles everything from simple transitions to complex physics-based animations.

## Key Concepts
- **Motion Components**: The core of the library. Any HTML or SVG element can be turned into a motion component by prefixing it with \`motion.\`.
- **Animate Prop**: Used to define the target state of an animation.
- **Initial Prop**: Defines the starting state of a component when it first mounts.
- **Transition Prop**: Controls how the animation moves from the initial to the target state.

## Example
\`\`\`jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  Hello World
</motion.div>
\`\`\`

## Advanced Features
Framer Motion also supports gestures (hover, tap, drag), layout animations, and exit animations with \`AnimatePresence\`.

---
Start small and gradually build up to more complex animations. The possibilities are endless!
    `,
  },
  {
    id: 'the-future-of-frontend',
    title: 'The Future of Frontend Development',
    date: 'March 5, 2026',
    tags: ['Tech', 'Future'],
    excerpt: 'Predicting the trends and technologies that will shape the future of frontend development in the coming years.',
    image: 'https://picsum.photos/seed/blog3/800/600',
    content: `
# The Future of Frontend Development

The world of frontend development is constantly evolving. New frameworks, tools, and techniques emerge every day. Here's what I think the future holds.

## 1. AI-Driven Development
AI is already changing how we write code. In the future, we'll see even more AI-powered tools that help with everything from code generation to automated testing and performance optimization.

## 2. Server-Side Rendering (SSR) and Static Site Generation (SSG)
Frameworks like Next.js and Remix are leading the way in making SSR and SSG more accessible. This trend will continue as developers prioritize performance and SEO.

## 3. WebAssembly (Wasm)
WebAssembly is opening up new possibilities for high-performance applications on the web. We'll see more complex applications, like video editors and games, being built with Wasm.

## 4. Component-Driven Design
The shift towards component-driven design will continue. Tools like Storybook and Figma are making it easier for designers and developers to collaborate on reusable components.

## 5. Enhanced Accessibility
Accessibility will become even more important as the web becomes more integrated into our daily lives. We'll see more tools and frameworks that make it easier to build accessible websites by default.

---
The future is bright for frontend developers. Stay curious and keep learning!
    `,
  },
];
