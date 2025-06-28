import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "./hooks/AuthContext.jsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

import App from './App';

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={clientId}>
   <AuthProvider> {/* Envolver la app con AuthProvider */}
      <App />
    </AuthProvider>
</GoogleOAuthProvider>
)
