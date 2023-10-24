import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prisma CRUD",
  description: "CRUD App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-[#edf2f4] ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
