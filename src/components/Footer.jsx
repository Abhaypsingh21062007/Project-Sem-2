export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="mt-8">
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] text-white text-sm py-3 transition"
      >
        Back to top
      </button>
      <div className="bg-[#232f3e] text-white">
        <div className="max-w-[1500px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-bold mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">About Amazon.in</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Press Releases</li>
              <li className="hover:underline cursor-pointer">Amazon Science</li>
              <li className="hover:underline cursor-pointer">Sustainability</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Connect with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer flex items-center gap-2">📘 Facebook</li>
              <li className="hover:underline cursor-pointer flex items-center gap-2">🐦 Twitter</li>
              <li className="hover:underline cursor-pointer flex items-center gap-2">📷 Instagram</li>
              <li className="hover:underline cursor-pointer flex items-center gap-2">▶️ YouTube</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Sell on Amazon.in</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
              <li className="hover:underline cursor-pointer">Advertise Your Products</li>
              <li className="hover:underline cursor-pointer">Self-Publish with Us</li>
              <li className="hover:underline cursor-pointer">Amazon Business</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Your Account</li>
              <li className="hover:underline cursor-pointer">Returns Centre</li>
              <li className="hover:underline cursor-pointer">100% Purchase Protection</li>
              <li className="hover:underline cursor-pointer">Amazon.in App Download</li>
              <li className="hover:underline cursor-pointer">Help</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700">
          <div className="max-w-[1500px] mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-2xl font-bold italic text-white">
              amazon<span className="text-orange-400">.in</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <button className="flex items-center gap-1 hover:underline">
                <span>🇮🇳</span>
                <span>India</span>
                <span className="text-gray-400 hidden md:inline">|</span>
                <span className="hidden md:inline">English</span>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 bg-[#131a22]">
          <div className="max-w-[1500px] mx-auto px-4 py-6 text-xs text-gray-400 flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="hover:underline cursor-pointer">Conditions of Use</span>
              <span className="hover:underline cursor-pointer">Privacy Notice</span>
              <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
              <span className="hover:underline cursor-pointer">© 2026, Amazon.in</span>
            </div>
            <div className="flex items-center gap-3">
              <span>📧 support@amazon.in</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
