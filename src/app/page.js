"use client";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
      {/* Hero Text */}
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
        <span>YOU</span> <span>IMAGINE</span><br />
        <span>WE</span> <span>CREATE</span>
      </h1>

      {/* Decorative green icon - hidden on small screens */}
      <div className="absolute inset-0 hidden md:block">
        <img src="/green-icon.svg" alt="" className="mx-auto opacity-70" />
      </div>

      {/* Profile Image - hidden on small screens */}
      <div className="absolute top-4 right-4 hidden md:block">
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
        />
      </div>

      {/* Icons row */}
      <div className="flex justify-center gap-8 mt-12">
        <img src="/icons/home.svg" alt="Home" className="w-10 h-10 no-animate-sm" />
        <img src="/icons/crown.svg" alt="Crown" className="w-10 h-10 no-animate-sm" />
        <img src="/icons/user.svg" alt="User" className="w-10 h-10 no-animate-sm" />
        <img src="/icons/arrow.svg" alt="Arrow" className="w-10 h-10 no-animate-sm" />
      </div>

      {/* Footer Logo */}
      <div className="mt-8 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
        AsodTech
      </div>
    </div>
  );
}
