
import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Me-API Playground',
  description: 'Profile playground to search projects, skills and view profile',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Navbar />

          <main>{children}</main>

          <footer className="footer mt-6 border-t pt-4 text-center text-sm text-gray-500">
            Built for Backend Assessment • Calls 
          </footer>
        </div>
      </body>
    </html>
  );
}
