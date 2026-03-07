import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const blogPosts = [
  {
    id: 'how-to-source-products-from-south-africa',
    title: 'How to Source Products from South Africa',
    date: 'March 15, 2024',
    author: 'DM Trading Expert',
    excerpt: 'Discover the essential steps and strategies for successfully sourcing high-quality products from South Africa for your international business.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    content: `
      <p>Sourcing products from South Africa offers international businesses a strategic advantage, combining high-quality manufacturing with competitive pricing. As a leading hub for trade on the continent, South Africa provides access to a diverse range of products, from industrial machinery and agricultural goods to raw materials and consumer products. However, navigating the local market requires a strategic approach.</p>
      
      <h3>1. Understand the Local Market Dynamics</h3>
      <p>Before you begin sourcing, it is crucial to understand the South African business landscape. The country has a well-developed infrastructure, robust financial systems, and a strong legal framework. Identifying the right industrial hubs—such as Gauteng for manufacturing or the Western Cape for agriculture—can significantly streamline your search for reliable suppliers.</p>
      
      <h3>2. Partner with a Local Sourcing Agent</h3>
      <p>One of the most effective ways to source products from South Africa is to partner with an experienced local sourcing agent like DM Trading Solutions (PTY) LTD. A local partner understands the cultural nuances, speaks the local business language, and has an established network of verified suppliers. This mitigates risks associated with supplier fraud and ensures you are negotiating the best possible prices.</p>
      
      <h3>3. Verify Supplier Credentials</h3>
      <p>Due diligence is non-negotiable. When sourcing products, always verify the supplier's credentials, including their company registration, export licenses, and quality certifications (such as ISO standards). Requesting product samples and conducting factory audits are essential steps before committing to large orders.</p>
      
      <h3>4. Navigate Logistics and Export Regulations</h3>
      <p>South Africa has specific export regulations and customs procedures. Understanding Incoterms, securing the correct export documentation, and choosing the right freight forwarding partner are critical for a smooth supply chain. A professional procurement company can handle these logistical complexities, ensuring your products reach their destination efficiently and compliantly.</p>
      
      <p>By following these steps and leveraging local expertise, international buyers can successfully source products from South Africa, building resilient and profitable supply chains.</p>
    `
  },
  {
    id: 'procurement-services-in-africa',
    title: 'Procurement Services in Africa',
    date: 'April 2, 2024',
    author: 'DM Trading Expert',
    excerpt: 'Explore how professional procurement services in Africa can streamline your supply chain, reduce costs, and mitigate risks in emerging markets.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop',
    content: `
      <p>As global markets expand, businesses are increasingly looking toward Africa for sourcing materials, equipment, and services. However, operating in emerging markets presents unique challenges, from logistical hurdles to regulatory complexities. This is where professional procurement services in Africa become indispensable for international companies aiming to build efficient supply chains.</p>
      
      <h3>The Role of a Procurement Company in Africa</h3>
      <p>A specialized procurement company acts as your strategic partner on the ground. Instead of navigating fragmented markets alone, businesses can leverage the expertise of a local sourcing agent. These professionals handle the entire procurement lifecycle—from identifying reliable suppliers and negotiating contracts to managing quality control and overseeing logistics.</p>
      
      <h3>Key Benefits of African Supply Chain Solutions</h3>
      <p><strong>1. Risk Mitigation:</strong> One of the primary benefits of using procurement services in Africa is risk reduction. Experienced agents conduct thorough supplier verification, ensuring compliance with international standards and protecting your business from fraudulent entities.</p>
      
      <p><strong>2. Cost Efficiency:</strong> Local procurement experts understand market pricing and possess strong negotiation skills. They can secure competitive rates that might be inaccessible to foreign buyers, significantly reducing overall procurement costs.</p>
      
      <p><strong>3. Streamlined Logistics:</strong> Moving goods across African borders requires deep logistical knowledge. Whether it is coordinating transport from South Africa to the Democratic Republic of the Congo or managing port operations, a procurement partner ensures timely and safe delivery.</p>
      
      <h3>Choosing the Right Partner</h3>
      <p>When selecting a procurement partner, look for a company with a proven track record, a robust supplier network, and comprehensive import/export capabilities. DM Trading Solutions (PTY) LTD offers tailored African supply chain solutions, empowering businesses to operate confidently and efficiently across the continent. By outsourcing procurement, companies can focus on their core operations while enjoying the benefits of a optimized African supply chain.</p>
    `
  },
  {
    id: 'buying-mining-equipment-in-africa',
    title: 'Buying Mining Equipment in Africa',
    date: 'April 18, 2024',
    author: 'DM Trading Expert',
    excerpt: 'A comprehensive guide to sourcing and purchasing heavy mining equipment and industrial machinery across the African continent.',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1974&auto=format&fit=crop',
    content: `
      <p>The African mining sector is a cornerstone of the continent's economy, driving demand for robust, high-quality mining equipment. Whether you are operating in the copper belts of the Democratic Republic of the Congo or the gold mines of West Africa, buying mining equipment in Africa requires careful planning, technical knowledge, and reliable sourcing strategies.</p>
      
      <h3>Sourcing from South Africa</h3>
      <p>South Africa is the leading hub for manufacturing and distributing mining equipment on the continent. It boasts advanced engineering capabilities and hosts major international OEMs (Original Equipment Manufacturers). When buying mining equipment in Africa, sourcing from South Africa often guarantees access to top-tier machinery, spare parts, and technical support, making it the preferred starting point for procurement.</p>
      
      <h3>Key Considerations for Procurement</h3>
      <p><strong>1. Equipment Durability and Suitability:</strong> African mining environments are notoriously harsh. Equipment must be rugged, durable, and specifically suited to the local terrain and climate. Always verify that the machinery meets international safety and operational standards.</p>
      
      <p><strong>2. After-Sales Support and Spare Parts:</strong> The true cost of mining equipment includes maintenance. Ensure that your supplier provides reliable after-sales support and that spare parts are readily available within the region to minimize operational downtime.</p>
      
      <p><strong>3. Navigating Cross-Border Logistics:</strong> Transporting heavy machinery across African borders is a complex logistical challenge. It requires specialized freight forwarding, route planning, and strict adherence to customs regulations. Partnering with a logistics expert is crucial to avoid costly delays at border crossings.</p>
      
      <h3>The Value of a Sourcing Agent</h3>
      <p>Utilizing a specialized sourcing agent in Africa, such as DM Trading Solutions (PTY) LTD, simplifies the acquisition process. We leverage our extensive network to find the best equipment, negotiate favorable terms, and manage the end-to-end logistics. By trusting experts with your procurement, you ensure that your mining operations are equipped efficiently, safely, and cost-effectively.</p>
    `
  }
];

export default function BlogPage() {
  const [title, setTitle] = useState('Industry Insights');
  const [subtitle, setSubtitle] = useState('Expert advice, news, and insights on procurement and sourcing in Africa.');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'content', 'blog'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.title) setTitle(data.title);
        if (data.subtitle) setSubtitle(data.subtitle);
        if (data.image) setImage(data.image);
      }
    });

    return () => unsubscribe();
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
                    <Link to={`/blog/${post.id}`} className="hover:text-corporate-gold transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-corporate-navy font-semibold hover:text-corporate-gold transition-colors mt-auto"
                  >
                    Read Full Article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
