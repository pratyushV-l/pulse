'use client'

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginSignup() {

  const handleGoogleSignIn = () => {
    signIn("google", { redirect_uri: "https://pulsev1.me/" });
  };

  const handleGitHubSignIn = () => {
    signIn("github", { redirect_uri: "https://pulsev1.me/" });
  };

  const handleGuestSignIn = () => {
    //later
  };

  return (
    <div className="background diagonal-line" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src="/logo.png" width={50} height={50} alt="logo" style={{ position: "absolute", left: "69%", top: "8.5%"}}/>
        <h1 className="title-2">Sign-Up</h1>
      </div>
      <button type="button" className="py-2 px-4 max-w-md flex justify-center items-center hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg gh_btn" onClick={handleGitHubSignIn}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
          <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
        </svg>
        Continue with GitHub
      </button>
      <button type="button" className="py-2 px-4 max-w-md flex justify-center items-center bg-white-600 hover:text-white hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mt-4 go_btn" onClick={handleGoogleSignIn}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 48 48">
          <path d="M24 9.5c3.1 0 5.6 1.1 7.5 2.9l5.6-5.6C33.8 3.5 29.2 1.5 24 1.5 14.8 1.5 7.1 7.9 4.3 16.1l6.9 5.4C12.8 14.1 17.9 9.5 24 9.5z" fill="#EA4335"/>
          <path d="M46.5 24c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3.2-2.4 5.9-5 7.7l7.7 6c4.5-4.1 7.1-10.1 7.1-18.2z" fill="#4285F4"/>
          <path d="M10.2 28.5c-1.1-3.2-1.1-6.8 0-10l-6.9-5.4C.9 16.1 0 19.9 0 24s.9 7.9 3.3 11l6.9-5.5z" fill="#FBBC05"/>
          <path d="M24 46.5c5.2 0 9.8-1.7 13.1-4.6l-7.7-6c-2.1 1.4-4.8 2.3-7.5 2.3-6.1 0-11.2-4.6-12.9-10.7l-6.9 5.4C7.1 40.1 14.8 46.5 24 46.5z" fill="#34A853"/>
          <path d="M0 0h48v48H0z" fill="none"/>
        </svg>
        Continue with Google
      </button>
      <button type="button" className="py-2 px-4 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mt-4 guest_btn" onClick={handleGuestSignIn}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        Continue as Guest
      </button>
      <div className="ticker-container-5">
          <div className="ticker">
            {["Efficiency", "Output", "Performance", "Effectiveness", "Proficiency", "Workrate", "Yield", "Capability", "Throughput", "Competence", "Result", "Accomplishment", "Workload", "Produciveness", "Production", "Capacity", "Achievement", "Return", "Excellence", "Success"].map((word, index) => (
              <span key={index}>{word}</span>
            ))}
            {["Efficiency", "Output", "Performance", "Effectiveness", "Proficiency", "Workrate", "Yield", "Capability", "Throughput", "Competence", "Result", "Accomplishment", "Workload", "Produciveness", "Production", "Capacity", "Achievement", "Return", "Excellence", "Success"].map((word, index) => (
              <span key={index + 20}>{word}</span>
            ))}
          </div>
        </div>
        <div className="ticker-container-3">
          <div className="ticker">
            {["Innovation", "Creativity", "Inspiration", "Imagination", "Vision", "Ingenuity", "Originality", "Resourcefulness", "Inventiveness", "Artistry", "Design", "Concept", "Idea", "Plan", "Scheme", "Blueprint", "Framework", "Model", "Prototype", "Draft"].map((word, index) => (
              <span key={index}>{word}</span>
            ))}
            {["Innovation", "Creativity", "Inspiration", "Imagination", "Vision", "Ingenuity", "Originality", "Resourcefulness", "Inventiveness", "Artistry", "Design", "Concept", "Idea", "Plan", "Scheme", "Blueprint", "Framework", "Model", "Prototype", "Draft"].map((word, index) => (
              <span key={index + 20}>{word}</span>
            ))}
          </div>
        </div>
        <div className="ticker-container-4">
          <div className="ticker">
            {["Adventure", "Discovery", "Exploration", "Journey", "Quest", "Odyssey", "Expedition", "Voyage", "Excursion", "Safari", "Trek", "Pilgrimage", "Wanderlust", "Roaming", "Travel", "Tour", "Trip", "Excursion", "Hike", "Expedition"].map((word, index) => (
              <span key={index}>{word}</span>
            ))}
            {["Adventure", "Discovery", "Exploration", "Journey", "Quest", "Odyssey", "Expedition", "Voyage", "Excursion", "Safari", "Trek", "Pilgrimage", "Wanderlust", "Roaming", "Travel", "Tour", "Trip", "Excursion", "Hike", "Expedition"].map((word, index) => (
              <span key={index + 20}>{word}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", zIndex: 9999, paddingTop: 3, paddingLeft: 3 }}>
          <Image src='/logo.png' width={50} height={50} quality={100} alt="logo"/>
          <span style={{ marginLeft: "10px", fontSize: "1.5rem" }} className="logotext">pulse.</span>
        </div>
        <p className="watermark">
          An <a href="https://github.com/pratyushV-l/pulse">open source</a> venture by <a href="https://github.com/pratyushv-l">pratyushv-1</a>.
        </p>
    </div>
  );
}