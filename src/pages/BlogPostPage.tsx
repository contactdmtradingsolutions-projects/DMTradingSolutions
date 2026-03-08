import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import SEO from '../components/SEO';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'blogPosts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-corporate-light pt-20">
        <div className="text-center">
          <p className="text-gray-600 mb-8">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-corporate-light pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-corporate-navy mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you are looking for does not exist.</p>
          <Link to="/blog" className="bg-corporate-gold text-corporate-navy px-6 py-3 rounded-sm font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-corporate-light">
      <SEO 
        title={post.title} 
        description={post.excerpt || post.title}
      />
      <PageHero 
        title={post.title} 
        subtitle={`${post.date} | ${post.author}`}
        image={post.image}
      />

      <article className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-corporate-navy font-semibold hover:text-corporate-gold transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-corporate-navy prose-p:text-gray-700 prose-a:text-corporate-gold hover:prose-a:text-yellow-500"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="bg-white p-8 rounded-sm shadow-md text-center">
              <h3 className="text-2xl font-heading font-bold text-corporate-navy mb-4">Need Procurement Assistance?</h3>
              <p className="text-gray-600 mb-6">Contact DM Trading Solutions (PTY) LTD today to discuss your African sourcing requirements.</p>
              <Link to="/quote" className="bg-corporate-gold text-corporate-navy px-8 py-4 rounded-sm font-bold text-lg hover:bg-yellow-500 transition-colors inline-block">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
