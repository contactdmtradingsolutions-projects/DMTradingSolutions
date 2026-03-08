import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, addDoc } from 'firebase/firestore';
import { Save, LogOut, Loader2, AlertCircle, Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Tabs State
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'services' | 'industries' | 'markets' | 'contact' | 'blog' | 'settings'>('home');

  // Settings State
  const [corporateNavy, setCorporateNavy] = useState('#0A192F');
  const [corporateBlue, setCorporateBlue] = useState('#112240');
  const [corporateGold, setCorporateGold] = useState('#D4AF37');
  const [corporateLight, setCorporateLight] = useState('#F8F9FA');

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
  const [contactAddress, setContactAddress] = useState('');
  const [contactPhone1, setContactPhone1] = useState('');
  const [contactPhone2, setContactPhone2] = useState('');
  const [contactHours, setContactHours] = useState('');
  const [contactEmail1, setContactEmail1] = useState('');
  const [contactEmail2, setContactEmail2] = useState('');

  // Blog Page Content State
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSubtitle, setBlogSubtitle] = useState('');
  const [blogImage, setBlogImage] = useState('');
  
  // Blog Posts State
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [editingPost, setEditingPost] = useState<any | null>(null);

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
        setContactAddress(data.address || '');
        setContactPhone1(data.phone1 || '');
        setContactPhone2(data.phone2 || '');
        setContactHours(data.hours || '');
        setContactEmail1(data.email1 || '');
        setContactEmail2(data.email2 || '');
      }

      // Fetch Blog
      const blogDoc = await getDoc(doc(db, 'content', 'blog'));
      if (blogDoc.exists()) {
        const data = blogDoc.data();
        setBlogTitle(data.title || '');
        setBlogSubtitle(data.subtitle || '');
        setBlogImage(data.image || '');
      }

      // Fetch Blog Posts
      const postsSnapshot = await getDocs(collection(db, 'blogPosts'));
      const postsData = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogPosts(postsData);

      // Fetch Settings
      const settingsDoc = await getDoc(doc(db, 'settings', 'colors'));
      if (settingsDoc.exists()) {
        const data = settingsDoc.data();
        setCorporateNavy(data.corporateNavy || '#0A192F');
        setCorporateBlue(data.corporateBlue || '#112240');
        setCorporateGold(data.corporateGold || '#D4AF37');
        setCorporateLight(data.corporateLight || '#F8F9FA');
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
          description: contactDescription,
          address: contactAddress,
          phone1: contactPhone1,
          phone2: contactPhone2,
          hours: contactHours,
          email1: contactEmail1,
          email2: contactEmail2
        }, { merge: true });
        setSuccess("Contact page content saved successfully!");
      } else if (activeTab === 'blog') {
        await setDoc(doc(db, 'content', 'blog'), {
          title: blogTitle,
          subtitle: blogSubtitle,
          image: blogImage
        }, { merge: true });
        setSuccess("Blog page content saved successfully!");
      } else if (activeTab === 'settings') {
        await setDoc(doc(db, 'settings', 'colors'), {
          corporateNavy,
          corporateBlue,
          corporateGold,
          corporateLight
        }, { merge: true });
        setSuccess("Website colors saved successfully!");
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

  const handleSaveBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editingPost) return;
    
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const postData = {
        title: editingPost.title || '',
        date: editingPost.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        author: editingPost.author || 'DM Trading Expert',
        excerpt: editingPost.excerpt || '',
        image: editingPost.image || '',
        content: editingPost.content || '',
        link: editingPost.link || ''
      };

      if (editingPost.id) {
        // Update existing
        await setDoc(doc(db, 'blogPosts', editingPost.id), postData, { merge: true });
        setSuccess("Blog post updated successfully!");
      } else {
        // Create new
        await addDoc(collection(db, 'blogPosts'), postData);
        setSuccess("Blog post created successfully!");
      }
      
      setEditingPost(null);
      await fetchContent(); // Refresh the list
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error("Error saving blog post:", err);
      setError("Failed to save blog post. You might not have admin permissions.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (!user || !window.confirm("Are you sure you want to delete this post?")) return;
    
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteDoc(doc(db, 'blogPosts', id));
      setSuccess("Blog post deleted successfully!");
      await fetchContent(); // Refresh the list
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error("Error deleting blog post:", err);
      setError("Failed to delete blog post.");
    } finally {
      setSaving(false);
    }
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
                { id: 'settings', label: 'Settings' },
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

                  <div>
                    <label htmlFor="contactAddress" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="contactAddress"
                        rows={3}
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={contactAddress}
                        onChange={(e) => setContactAddress(e.target.value)}
                        placeholder="Johannesburg,\nSouth Africa"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contactPhone1" className="block text-sm font-medium text-gray-700">
                        Phone 1
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="contactPhone1"
                          className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={contactPhone1}
                          onChange={(e) => setContactPhone1(e.target.value)}
                          placeholder="+27 65 845 6336"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contactPhone2" className="block text-sm font-medium text-gray-700">
                        Phone 2 (Optional)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="contactPhone2"
                          className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={contactPhone2}
                          onChange={(e) => setContactPhone2(e.target.value)}
                          placeholder="+27 73 760 4653"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contactHours" className="block text-sm font-medium text-gray-700">
                      Business Hours
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="contactHours"
                        className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={contactHours}
                        onChange={(e) => setContactHours(e.target.value)}
                        placeholder="Mon-Fri, 8am-5pm SAST"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contactEmail1" className="block text-sm font-medium text-gray-700">
                        Email 1
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          id="contactEmail1"
                          className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={contactEmail1}
                          onChange={(e) => setContactEmail1(e.target.value)}
                          placeholder="info@dmtradingsolutions.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contactEmail2" className="block text-sm font-medium text-gray-700">
                        Email 2 (Optional)
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          id="contactEmail2"
                          className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={contactEmail2}
                          onChange={(e) => setContactEmail2(e.target.value)}
                          placeholder="sales@dmtradingsolutions.com"
                        />
                      </div>
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
                      Save Blog Page Content
                    </button>
                  </div>

                  <div className="pt-8 mt-8 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-medium text-gray-900">Manage Blog Posts</h2>
                      <button
                        type="button"
                        onClick={() => setEditingPost({ title: '', excerpt: '', content: '', image: '', link: '' })}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-corporate-navy hover:bg-corporate-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-corporate-gold"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Post
                      </button>
                    </div>

                    {editingPost ? (
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          {editingPost.id ? 'Edit Post' : 'Create New Post'}
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                              type="text"
                              className="mt-1 shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                              value={editingPost.title}
                              onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                            <textarea
                              rows={2}
                              className="mt-1 shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                              value={editingPost.excerpt}
                              onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input
                              type="url"
                              className="mt-1 shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                              value={editingPost.image}
                              onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Live Link (Optional)</label>
                            <input
                              type="url"
                              className="mt-1 shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                              value={editingPost.link || ''}
                              onChange={(e) => setEditingPost({ ...editingPost, link: e.target.value })}
                              placeholder="https://..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Content (HTML allowed)</label>
                            <textarea
                              rows={8}
                              className="mt-1 shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border font-mono text-sm"
                              value={editingPost.content}
                              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                            />
                          </div>
                          <div className="flex justify-end space-x-3 pt-4">
                            <button
                              type="button"
                              onClick={() => setEditingPost(null)}
                              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleSaveBlogPost}
                              disabled={saving}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-corporate-gold hover:bg-yellow-600 disabled:opacity-50"
                            >
                              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                              Save Post
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                          {blogPosts.length === 0 ? (
                            <li className="p-4 text-center text-gray-500">No blog posts found.</li>
                          ) : (
                            blogPosts.map((post) => (
                              <li key={post.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900">{post.title}</h4>
                                  <p className="text-sm text-gray-500">{post.date}</p>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => setEditingPost(post)}
                                    className="p-2 text-gray-400 hover:text-corporate-navy transition-colors"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteBlogPost(post.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'settings' && (
                <>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Website Colors</h2>
                  <p className="text-sm text-gray-500 mb-6">Change the global color palette of the website. Changes will apply immediately.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="corporateNavy" className="block text-sm font-medium text-gray-700">
                        Corporate Navy (Primary Dark)
                      </label>
                      <div className="mt-1 flex items-center space-x-2">
                        <input
                          type="color"
                          id="corporateNavy"
                          className="h-10 w-10 border border-gray-300 rounded-md cursor-pointer"
                          value={corporateNavy}
                          onChange={(e) => setCorporateNavy(e.target.value)}
                        />
                        <input
                          type="text"
                          className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={corporateNavy}
                          onChange={(e) => setCorporateNavy(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="corporateBlue" className="block text-sm font-medium text-gray-700">
                        Corporate Blue (Secondary Dark)
                      </label>
                      <div className="mt-1 flex items-center space-x-2">
                        <input
                          type="color"
                          id="corporateBlue"
                          className="h-10 w-10 border border-gray-300 rounded-md cursor-pointer"
                          value={corporateBlue}
                          onChange={(e) => setCorporateBlue(e.target.value)}
                        />
                        <input
                          type="text"
                          className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={corporateBlue}
                          onChange={(e) => setCorporateBlue(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="corporateGold" className="block text-sm font-medium text-gray-700">
                        Corporate Gold (Accent)
                      </label>
                      <div className="mt-1 flex items-center space-x-2">
                        <input
                          type="color"
                          id="corporateGold"
                          className="h-10 w-10 border border-gray-300 rounded-md cursor-pointer"
                          value={corporateGold}
                          onChange={(e) => setCorporateGold(e.target.value)}
                        />
                        <input
                          type="text"
                          className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={corporateGold}
                          onChange={(e) => setCorporateGold(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="corporateLight" className="block text-sm font-medium text-gray-700">
                        Corporate Light (Background)
                      </label>
                      <div className="mt-1 flex items-center space-x-2">
                        <input
                          type="color"
                          id="corporateLight"
                          className="h-10 w-10 border border-gray-300 rounded-md cursor-pointer"
                          value={corporateLight}
                          onChange={(e) => setCorporateLight(e.target.value)}
                        />
                        <input
                          type="text"
                          className="shadow-sm focus:ring-corporate-gold focus:border-corporate-gold block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={corporateLight}
                          onChange={(e) => setCorporateLight(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab !== 'blog' && (
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
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
