import Header from "./components/common/Header";
import "./globals.css";

export const metadata = {
  title: "Microters | Explore, Create, And Grow Online",
  description: "Why invest in digital marketing campaigns if you can’t reach your potential customers? Be it Google’s #1 page or getting the right leads – every single step taken in designing your marketing strategy counts. And Microters is here to help.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Header/>
        <main>{children}</main>
      </body>
    </html>
  );
}
