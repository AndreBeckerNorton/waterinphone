import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import blogPosts from '../../data/blog/posts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-medium text-gray-900">Post not found</h2>
        <Link to="/blog" className="mt-4 inline-block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
          ← Back to articles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/blog" className="inline-block mb-12 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
        ← Articles
      </Link>
      <article className="prose prose-lg mx-auto">
        <header className="mb-16 not-prose">
          <time className="block mb-4 text-sm text-gray-500" dateTime={post.date}>
            {post.date}
          </time>
          <h1 className="text-[40px] leading-tight font-semibold tracking-tight text-gray-900 mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            {post.excerpt}
          </p>
        </header>
        <div className="prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:text-gray-900 prose-h2:mt-16 prose-h2:mb-6
                      prose-h3:text-xl prose-h3:font-medium prose-h3:tracking-tight prose-h3:text-gray-900 prose-h3:mt-12 prose-h3:mb-4
                      prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-600 prose-p:mb-6
                      prose-ul:my-6 prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-2
                      prose-li:text-lg prose-li:leading-relaxed prose-li:text-gray-600 prose-li:mb-0">
          <Markdown
            options={{
              overrides: {
                h2: {
                  props: {
                    className: 'text-2xl font-semibold tracking-tight text-gray-900 mt-16 mb-6',
                  },
                },
                h3: {
                  props: {
                    className: 'text-xl font-medium tracking-tight text-gray-900 mt-12 mb-4',
                  },
                },
                p: {
                  props: {
                    className: 'text-lg leading-relaxed text-gray-600 mb-6',
                  },
                },
                ul: {
                  props: {
                    className: 'my-6 list-none pl-0 space-y-2',
                  },
                },
                li: {
                  props: {
                    className: 'flex items-start text-lg leading-relaxed text-gray-600',
                  },
                  component: ({ children, ...props }) => (
                    <li {...props}>
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 mr-4 shrink-0"></span>
                      <span>{children}</span>
                    </li>
                  ),
                },
              },
            }}
          >
            {post.content}
          </Markdown>
        </div>
      </article>
    </div>
  );
} 