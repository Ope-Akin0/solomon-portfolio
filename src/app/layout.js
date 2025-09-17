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
