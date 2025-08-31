import { 
  initializeApp, 
  FirebaseApp 
} from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  User,
  Auth
} from 'firebase/auth';
import { firebaseConfig } from '../config/firebase';

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Add scopes
googleProvider.addScope('openid');
googleProvider.addScope('profile');
googleProvider.addScope('email');

class FirebaseAuthService {
  // Sign in with Google
  async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw new Error('Failed to sign in with Google');
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw new Error('Failed to sign out');
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!auth.currentUser;
  }

  // Get user profile data
  getUserProfile(user: User) {
    return {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      picture: user.photoURL,
      verified: user.emailVerified,
      provider: user.providerData[0]?.providerId || 'unknown'
    };
  }
}

// Create singleton instance
export const firebaseAuthService = new FirebaseAuthService();
export default firebaseAuthService;
