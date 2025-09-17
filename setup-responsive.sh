#!/bin/bash

echo "⚡ Setting up responsive layout and styles for Next.js + Tailwind project..."

# 1. Ensure app folder exists
mkdir -p src/app

# 2. Create/overwrite layout.js with responsive meta
cat > src/app/layout.js << 'EOF'
export const metadata = {
  title: "My Portfolio",
  description: "Showcasing my work",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased bg-gray-50 text-gray-900">
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
EOF

# 3. Create/append global responsive CSS rules
cat >> src/app/globals.css << 'EOF'

/* === Responsive Global Enhancements === */

/* Make all media scale nicely */
img, video {
  max-width: 100%;
  height: auto;
}

/* Handle overflow text gracefully */
body {
  word-wrap: break-word;
  overflow-x: hidden;
}

/* Responsive typography (fallbacks, Tailwind handles most) */
h1 { font-size: clamp(1.75rem, 4vw, 3rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); }
p  { font-size: clamp(1rem, 2.5vw, 1.25rem); }
EOF

# 4. Create starter responsive homepage (page.js)
cat > src/app/page.js << 'EOF'
export default function Home() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-16">
      {/* Text Section */}
      <div className="text-center md:text-left max-w-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Welcome to My Portfolio
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600">
          I’m a frontend developer passionate about creating clean, responsive websites.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          View My Work
        </button>
      </div>

      {/* Image Section */}
      <div className="flex justify-center md:justify-end w-full md:w-1/2">
        <img
          src="/profile.png"
          alt="Profile"
          className="w-40 sm:w-56 md:w-72 lg:w-96 rounded-full shadow-lg object-cover"
        />
      </div>
    </section>
  );
}
EOF

echo "✅ Responsive setup complete! Files updated: layout.js, globals.css, page.js"
