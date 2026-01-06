
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./(dashboard)/providers";
import ClientLayout from "./ClientLayout";
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
        <AuthProvider>
          <ClientLayout>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              enableMultiContainer
              containerId="global" 
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              className="custom-toast-container"
            />
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
