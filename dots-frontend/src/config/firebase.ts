// Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAFxXzFiaPzbyjFy8NHrDkZB_LpXBA76G0",
  authDomain: "dots-frontend.firebaseapp.com",
  projectId: "dots-frontend",
  storageBucket: "dots-frontend.firebasestorage.app",
  messagingSenderId: "70392966908",
  appId: "1:70392966908:web:8ba088f70dbf88384a7179",
};

// Firebase Auth configuration
export const authConfig = {
  signInOptions: [
    {
      provider: 'google',
      scopes: ['openid', 'profile', 'email'],
      customParameters: {
        prompt: 'select_account'
      }
    }
  ],
  signInFlow: 'popup',
  callbacks: {
    signInSuccessWithAuthResult: () => false, // Prevent redirect
  }
};
