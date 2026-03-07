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

  // Home Page Content State
  const [homeTitle, setHomeTitle] = useState('');
  const [homeSubtitle, setHomeSubtitle] = useState('');
  const [homeHeroImages, setHomeHeroImages] = useState<string[]>(['', '', '']);

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
      const docRef = doc(db, 'content', 'home');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setHomeTitle(data.title || '');
        setHomeSubtitle(data.subtitle || '');
        setHomeHeroImages(data.heroImages || ['', '', '']);
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
      await setDoc(doc(db, 'content', 'home'), {
        title: homeTitle,
        subtitle: homeSubtitle,
        heroImages: homeHeroImages.filter(img => img.trim() !== '')
      }, { merge: true });
      
      setSuccess("Home page content saved successfully!");
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

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Home Page Content</h2>
            <form onSubmit={handleSave} className="space-y-6">
              
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
