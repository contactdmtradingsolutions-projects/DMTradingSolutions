import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase';

export default function BlogPage() {
  const [title, setTitle] = useState('Industry Insights');
  const [subtitle, setSubtitle] = useState('Expert advice, news, and insights on procurement and sourcing in Africa.');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop');
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribeHero = onSnapshot(doc(db, 'content', 'blog'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.title) setTitle(data.title);
        if (data.subtitle) setSubtitle(data.subtitle);
        if (data.image) setImage(data.image);
      }
    });

    const unsubscribePosts = onSnapshot(collection(db, 'blogPosts'), (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogPosts(posts);
    });

    return () => {
      unsubscribeHero();
      unsubscribePosts();
    };
  }, []);

  return (
    <>
      <PageHero 
        title={title} 
        subtitle={subtitle}
        image={image}
      />
      
      <section className="py-24 bg-corporate-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-heading font-bold text-corporate-navy mb-4">No articles found</h3>
              <p className="text-gray-600">Check back later for new insights and news.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
                      <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3 line-clamp-2">
                      {post.link ? (
                        <a href={post.link} target="_blank" rel="noopener noreferrer" className="hover:text-corporate-gold transition-colors">
                          {post.title}
                        </a>
                      ) : (
                        <Link to={`/blog/${post.id}`} className="hover:text-corporate-gold transition-colors">
                          {post.title}
                        </Link>
                      )}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    {post.link ? (
                      <a 
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-corporate-navy font-semibold hover:text-corporate-gold transition-colors mt-auto"
                      >
                        Read Full Article <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link 
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-corporate-navy font-semibold hover:text-corporate-gold transition-colors mt-auto"
                      >
                        Read Full Article <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
