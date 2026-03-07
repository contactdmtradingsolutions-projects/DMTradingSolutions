import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { Save, LogOut, Loader2, AlertCircle } from 'lucide-react';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Tabs State
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'services' | 'industries' | 'markets' | 'contact' | 'blog'>('home');

  // Home Page Content State
  const [homeTitle, setHomeTitle] = useState('');
  const [homeSubtitle, setHomeSubtitle] = useState('');
  const [homeHeroImages, setHomeHeroImages] = useState<string[]>(['', '', '']);

  // About Page Content State
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutParagraph1, setAboutParagraph1] = useState('');
  const [aboutParagraph2, setAboutParagraph2] = useState('');
  const [aboutImage, setAboutImage] = useState('');

  // Services Page Content State
  const [servicesTitle, setServicesTitle] = useState('');
  const [servicesDescription, setServicesDescription] = useState('');
  const [servicesImage, setServicesImage] = useState('');

  // Industries Page Content State
  const [industriesTitle, setIndustriesTitle] = useState('');
  const [industriesDescription, setIndustriesDescription] = useState('');
  const [industriesImage, setIndustriesImage] = useState('');

  // Markets Page Content State
  const [marketsTitle, setMarketsTitle] = useState('');
  const [marketsDescription, setMarketsDescription] = useState('');
  const [marketsImage, setMarketsImage] = useState('');

  // Contact Page Content State
  const [contactTitle, setContactTitle] = useState('');
  const [contactDescription, setContactDescription] = useState('');

  // Blog Page Content State
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSubtitle, setBlogSubtitle] = useState('');
  const [blogImage, setBlogImage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchContent();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchContent = async () => {
    try {
      // Fetch Home
      const homeDoc = await getDoc(doc(db, 'content', 'home'));
      if (homeDoc.exists()) {
        const data = homeDoc.data();
        setHomeTitle(data.title || '');
        setHomeSubtitle(data.subtitle || '');
        setHomeHeroImages(data.heroImages || ['', '', '']);
      }

      // Fetch About
      const aboutDoc = await getDoc(doc(db, 'content', 'about'));
      if (aboutDoc.exists()) {
        const data = aboutDoc.data();
        setAboutTitle(data.title || '');
        setAboutParagraph1(data.paragraph1 || '');
        setAboutParagraph2(data.paragraph2 || '');
        setAboutImage(data.image || '');
      }

      // Fetch Services
      const servicesDoc = await getDoc(doc(db, 'content', 'services'));
      if (servicesDoc.exists()) {
        const data = servicesDoc.data();
        setServicesTitle(data.title || '');
        setServicesDescription(data.description || '');
        setServicesImage(data.image || '');
      }

      // Fetch Industries
      const industriesDoc = await getDoc(doc(db, 'content', 'industries'));
      if (industriesDoc.exists()) {
        const data = industriesDoc.data();
        setIndustriesTitle(data.title || '');
        setIndustriesDescription(data.description || '');
        setIndustriesImage(data.image || '');
      }

      // Fetch Markets
      const marketsDoc = await getDoc(doc(db, 'content', 'markets'));
      if (marketsDoc.exists()) {
        const data = marketsDoc.data();
        setMarketsTitle(data.title || '');
        setMarketsDescription(data.description || '');
        setMarketsImage(data.image || '');
      }

      // Fetch Contact
      const contactDoc = await getDoc(doc(db, 'content', 'contact'));
      if (contactDoc.exists()) {
        const data = contactDoc.data();
        setContactTitle(data.title || '');
        setContactDescription(data.description || '');
      }

      // Fetch Blog
      const blogDoc = await getDoc(doc(db, 'content', 'blog'));
      if (blogDoc.exists()) {
        const data = blogDoc.data();
        setBlogTitle(data.title || '');
        setBlogSubtitle(data.subtitle || '');
        setBlogImage(data.image || '');
      }
    } catch (err: any) {
      console.error("Error fetching content:", err);
      setError("Failed to load content. You might not have admin permissions.");
    }
  };

  const handleLogin = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (activeTab === 'home') {
        await setDoc(doc(db, 'content', 'home'), {
          title: homeTitle,
          subtitle: homeSubtitle,
          heroImages: homeHeroImages.filter(img => img.trim() !== '')
        }, { merge: true });
        setSuccess("Home page content saved successfully!");
      } else if (activeTab === 'about') {
        await setDoc(doc(db, 'content', 'about'), {
          title: aboutTitle,
          paragraph1: aboutParagraph1,
          paragraph2: aboutParagraph2,
          image: aboutImage
        }, { merge: true });
        setSuccess("About page content saved successfully!");
      } else if (activeTab === 'services') {
        await setDoc(doc(db, 'content', 'services'), {
          title: servicesTitle,
          description: servicesDescription,
          image: servicesImage
        }, { merge: true });
        setSuccess("Services page content saved successfully!");
      } else if (activeTab === 'industries') {
        await setDoc(doc(db, 'content', 'industries'), {
          title: industriesTitle,
          description: industriesDescription,
          image: industriesImage
        }, { merge: true });
        setSuccess("Industries page content saved successfully!");
      } else if (activeTab === 'markets') {
        await setDoc(doc(db, 'content', 'markets'), {
          title: marketsTitle,
          description: marketsDescription,
          image: marketsImage
        }, { merge: true });
        setSuccess("Markets page content saved successfully!");
      } else if (activeTab === 'contact') {
        await setDoc(doc(db, 'content', 'contact'), {
          title: contactTitle,
          description: contactDescription
        }, { merge: true });
        setSuccess("Contact page content saved successfully!");
      } else if (activeTab === 'blog') {
        await setDoc(doc(db, 'content', 'blog'), {
          title: blogTitle,
          subtitle: blogSubtitle,
          image: blogImage
        }, { merge: true });
        setSuccess("Blog page content saved successfully!");
      }
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error("Error saving content:", err);
      setError("Failed to save content. You might not have admin permissions.");
    } finally {
      setSaving(false);
    }
  };

  const updateHeroImage = (index: number, value: string) => {
    const newImages = [...homeHeroImages];
    newImages[index] = value;
    setHomeHeroImages(newImages);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-corporate-gold" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Dashboard
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to manage website content
            </p>
          </div>
          <button
            onClick={handleLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-corporate-navy hover:bg-corporate-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-corporate-gold transition-colors"
          >
            Sign in with Google
          </button>
          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-md flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-corporate-gold"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-md flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 rounded-md flex items-start">
            <div className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0">✓</div>
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0">
            <nav className="flex flex-col p-4 space-y-1" aria-label="Sidebar">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About Us' },
                { id: 'services', label: 'Services' },
                { id: 'industries', label: 'Industries' },
                { id: 'markets', label: 'Markets' },
                { id: 'blog', label: 'Blog' },
                { id: 'contact', label: 'Contact' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-corporate-gold/10 text-corporate-navy border-r-4 border-corporate-gold font-bold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-r-4 border-transparent'
                  } w-full text-left px-4 py-3 rounded-l-md text-sm transition-colors`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 p-6 md:p-8">
            <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
              
              {activeTab === 'home' && (
                <>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Home Page Content</h2>
                  <div>
                    <label htmlFor="homeTitle" className="block text-sm font-medium text-gray-700">
                      Hero Title (HTML allowed)
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="homeTitle"
                        rows={3}
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={homeTitle}
                        onChange={(e) => setHomeTitle(e.target.value)}
                        placeholder="Your Trusted African <br /> <span class=&quot;text-transparent bg-clip-text bg-gradient-to-r from-corporate-gold to-yellow-200&quot;>Procurement & Sourcing</span> Partner"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="homeSubtitle" className="block text-sm font-medium text-gray-700">
                      Hero Subtitle
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="homeSubtitle"
                        rows={3}
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={homeSubtitle}
                        onChange={(e) => setHomeSubtitle(e.target.value)}
                        placeholder="Expert cross-border trade, supplier sourcing..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Images (URLs)
                    </label>
                    <div className="space-y-3">
                      {[0, 1, 2].map((index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                          <input
                            type="url"
                            className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            value={homeHeroImages[index] || ''}
                            onChange={(e) => updateHeroImage(index, e.target.value)}
                            placeholder="https://images.pexels.com/..."
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'about' && (
                <>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">About Us Content</h2>
                  <div>
                    <label htmlFor="aboutTitle" className="block text-sm font-medium text-gray-700">
                      Section Title
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="aboutTitle"
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={aboutTitle}
                        onChange={(e) => setAboutTitle(e.target.value)}
                        placeholder="Connecting African Suppliers with International Buyers"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="aboutParagraph1" className="block text-sm font-medium text-gray-700">
                      Paragraph 1
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="aboutParagraph1"
                        rows={4}
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={aboutParagraph1}
                        onChange={(e) => setAboutParagraph1(e.target.value)}
                        placeholder="Based in South Africa, DM Trading Solutions..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="aboutParagraph2" className="block text-sm font-medium text-gray-700">
                      Paragraph 2
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="aboutParagraph2"
                        rows={4}
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={aboutParagraph2}
                        onChange={(e) => setAboutParagraph2(e.target.value)}
                        placeholder="Our core expertise lies in facilitating seamless trade..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="aboutImage" className="block text-sm font-medium text-gray-700">
                      Side Image (URL)
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        id="aboutImage"
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={aboutImage}
                        onChange={(e) => setAboutImage(e.target.value)}
                        placeholder="https://images.pexels.com/..."
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'services' && (
                <>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Services Content</h2>
                  <div>
                    <label htmlFor="servicesTitle" className="block text-sm font-medium text-gray-700">
                      Section Title
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="servicesTitle"
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={servicesTitle}
                        onChange={(e) => setServicesTitle(e.target.value)}
                        placeholder="Comprehensive African Procurement & Supply Chain Solutions"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="servicesDescription" className="block text-sm font-medium text-gray-700">
                      Main Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="servicesDescription"
                        rows={6}
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={servicesDescription}
                        onChange={(e) => setServicesDescription(e.target.value)}
                        placeholder="At DM Trading Solutions, we deliver end-to-end supply chain management..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="servicesImage" className="block text-sm font-medium text-gray-700">
                      Side Image (URL)
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        id="servicesImage"
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={servicesImage}
                        onChange={(e) => setServicesImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'industries' && (
                <>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Industries Content</h2>
                  <div>
                    <label htmlFor="industriesTitle" className="block text-sm font-medium text-gray-700">
                      Section Title
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="industriesTitle"
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={industriesTitle}
                        onChange={(e) => setIndustriesTitle(e.target.value)}
                        placeholder="Specialized Sourcing & Procurement for Key African Sectors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="industriesDescription" className="block text-sm font-medium text-gray-700">
                      Main Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="industriesDescription"
                        rows={6}
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={industriesDescription}
                        onChange={(e) => setIndustriesDescription(e.target.value)}
                        placeholder="We deeply understand the unique logistical challenges..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="industriesImage" className="block text-sm font-medium text-gray-700">
                      Side Image (URL)
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        id="industriesImage"
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={industriesImage}
                        onChange={(e) => setIndustriesImage(e.target.value)}
                        placeholder="https://images.pexels.com/..."
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'markets' && (
                <>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Markets Content</h2>
                  <div>
                    <label htmlFor="marketsTitle" className="block text-sm font-medium text-gray-700">
                      Section Title
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="marketsTitle"
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={marketsTitle}
                        onChange={(e) => setMarketsTitle(e.target.value)}
                        placeholder="Connecting Key African Economies"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="marketsDescription" className="block text-sm font-medium text-gray-700">
                      Main Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="marketsDescription"
                        rows={6}
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={marketsDescription}
                        onChange={(e) => setMarketsDescription(e.target.value)}
                        placeholder="We specialize in facilitating trade corridors that drive growth..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="marketsImage" className="block text-sm font-medium text-gray-700">
                      Side Image (URL)
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        id="marketsImage"
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={marketsImage}
                        onChange={(e) => setMarketsImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'contact' && (
                <>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Content</h2>
                  <div>
                    <label htmlFor="contactTitle" className="block text-sm font-medium text-gray-700">
                      Section Title
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="contactTitle"
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={contactTitle}
                        onChange={(e) => setContactTitle(e.target.value)}
                        placeholder="Get in Touch with Our Team"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contactDescription" className="block text-sm font-medium text-gray-700">
                      Main Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="contactDescription"
                        rows={6}
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={contactDescription}
                        onChange={(e) => setContactDescription(e.target.value)}
                        placeholder="Ready to optimize your African supply chain..."
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'blog' && (
                <>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Blog Page Content</h2>
                  <div>
                    <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700">
                      Hero Title
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="blogTitle"
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="Industry Insights"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="blogSubtitle" className="block text-sm font-medium text-gray-700">
                      Hero Subtitle
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="blogSubtitle"
                        rows={3}
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={blogSubtitle}
                        onChange={(e) => setBlogSubtitle(e.target.value)}
                        placeholder="Expert advice, news, and insights..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="blogImage" className="block text-sm font-medium text-gray-700">
                      Hero Image (URL)
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        id="blogImage"
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={blogImage}
                        onChange={(e) => setBlogImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-corporate-gold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-corporate-gold disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
