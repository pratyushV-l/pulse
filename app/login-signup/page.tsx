'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginSignup() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteComplete = () => {
      setTimeout(() => {
        setLoading(false);
      }, 99000);
    };

    const originalPush = router.push;
    router.push = (url, options) => {
      handleRouteChange();
      return Promise.resolve(originalPush(url, options)).finally(handleRouteComplete);
    };

    return () => {
      router.push = originalPush;
    };
  }, [router]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/homepage");
    } catch (err) {
      setError((err as any).message);
      setLoading(false);
    }
  };

  const toggleSignUpLogin = () => {
    setIsSignUp(!isSignUp);
  }

  return (
    <div>
      {loading && <Loading />}
      <div className="background-2 diagonal-line" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" width={50} height={50} alt="logo" style={{ position: "absolute", left: "69%", top: "8.5%"}}/>
          <h1 className="title-2">{isSignUp ? 'Sign-Up' : 'Login'}</h1>
        </div>
        <div style={{ position: "absolute", left: '58%', top:"25%"}} className="authentication-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button
            type="button"
            onClick={handleAuth}
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </div>
        <p onClick={toggleSignUpLogin} style={{ cursor: 'pointer', marginTop: "10px", textAlign: "center"}} className="sign-log">
          {isSignUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
        </p>
        <div className="ticker-container-5">
          <div className={`ticker ${isSignUp ? '' : 'ticker-reverse'}`}>
            {["Efficiency", "Output", "Performance", "Effectiveness", "Proficiency", "Workrate", "Yield", "Capability", "Throughput", "Competence", "Result", "Accomplishment", "Workload", "Produciveness", "Production", "Capacity", "Achievement", "Return", "Excellence", "Success"].map((word, index) => (
              <span key={index}>{word}</span>
            ))}
            {["Efficiency", "Output", "Performance", "Effectiveness", "Proficiency", "Workrate", "Yield", "Capability", "Throughput", "Competence", "Result", "Accomplishment", "Workload", "Produciveness", "Production", "Capacity", "Achievement", "Return", "Excellence", "Success"].map((word, index) => (
              <span key={index + 20}>{word}</span>
            ))}
          </div>
        </div>
        <div className="ticker-container-3">
          <div className={`ticker ${isSignUp ? '' : 'ticker-reverse'}`}>
            {["Innovation", "Creativity", "Inspiration", "Imagination", "Vision", "Ingenuity", "Originality", "Resourcefulness", "Inventiveness", "Artistry", "Design", "Concept", "Idea", "Plan", "Scheme", "Blueprint", "Framework", "Model", "Prototype", "Draft"].map((word, index) => (
              <span key={index}>{word}</span>
            ))}
            {["Innovation", "Creativity", "Inspiration", "Imagination", "Vision", "Ingenuity", "Originality", "Resourcefulness", "Inventiveness", "Artistry", "Design", "Concept", "Idea", "Plan", "Scheme", "Blueprint", "Framework", "Model", "Prototype", "Draft"].map((word, index) => (
              <span key={index + 20}>{word}</span>
            ))}
          </div>
        </div>
        <div className="ticker-container-4">
          <div className={`ticker ${isSignUp ? '' : 'ticker-reverse'}`}>
            {["Adventure", "Discovery", "Exploration", "Journey", "Quest", "Odyssey", "Expedition", "Voyage", "Excursion", "Safari", "Trek", "Pilgrimage", "Wanderlust", "Roaming", "Travel", "Tour", "Trip", "Excursion", "Hike", "Expedition"].map((word, index) => (
              <span key={index}>{word}</span>
            ))}
            {["Adventure", "Discovery", "Exploration", "Journey", "Quest", "Odyssey", "Expedition", "Voyage", "Excursion", "Safari", "Trek", "Pilgrimage", "Wanderlust", "Roaming", "Travel", "Tour", "Trip", "Excursion", "Hike", "Expedition"].map((word, index) => (
              <span key={index + 20}>{word}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", zIndex: 9998, paddingTop: 3, paddingLeft: 3, position: "absolute" }}>
          <Image src='/logo.png' width={50} height={50} quality={100} alt="logo"/>
          <span style={{ marginLeft: "10px", fontSize: "1.5rem" }} className="logotext">pulse.</span>
        </div>
        <p className="watermark">
          An <a href="https://github.com/pratyushV-l/pulse">open source</a> venture by <a href="https://github.com/pratyushv-l">pratyushv-1</a>.
        </p>
      </div>
    </div>
  );
}