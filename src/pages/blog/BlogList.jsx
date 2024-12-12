import React from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../../data/blog/posts';

export default function BlogList() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-medium tracking-tight text-gray-900 mb-12 text-center">
        Latest Articles
      </h1>
      <div className="grid gap-8">
        {blogPosts.map((post) => (
          <article 
            key={post.slug} 
            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <Link to={`/blog/${post.slug}`} className="space-y-4 block">
              <h2 className="text-2xl font-medium tracking-tight text-gray-900">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500">
                {post.date}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="pt-4">
                <span className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                  Read more →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
} 