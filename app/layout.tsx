import "./globals.css";

export const metadata = {
  title: "Face swap",
  description: "Face swap webapp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
