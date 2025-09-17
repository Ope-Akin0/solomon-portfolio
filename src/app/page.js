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
