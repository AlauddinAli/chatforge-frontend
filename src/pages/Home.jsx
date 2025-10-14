// // src/pages/Home.jsx
// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
//       {/* Animated background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      
//       {/* Floating orbs */}
//       <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
//       <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>

//       {/* Hero Section */}
//       <div className="relative z-10 container mx-auto px-4 py-20">
//         {/* Main Hero */}
//         <div className="text-center mb-20 animate-fadeIn">
//           <h1 className="text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
//             Welcome to<br />ChatForge 🔥
//           </h1>
//           <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
//             Connect, chat, and collaborate in real-time with friends and teams around the world.
//           </p>
          
//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideUp">
//             <Link
//               to="/register"
//               className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
//             >
//               <span className="relative z-10">Get Started Free 🚀</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
//             </Link>
            
//             <Link
//               to="/login"
//               className="px-8 py-4 backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all hover:scale-105 shadow-xl"
//             >
//               Sign In →
//             </Link>
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-3 gap-8 mb-20 animate-slideUp" style={{ animationDelay: "0.2s" }}>
//           {/* Feature 1 */}
//           <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all hover:scale-105 shadow-2xl group">
//             <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
//             <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//               Real-Time Chat
//             </h3>
//             <p className="text-gray-300">
//               Experience instant messaging with zero lag. Messages delivered in milliseconds with WebSocket technology.
//             </p>
//           </div>

//           {/* Feature 2 */}
//           <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all hover:scale-105 shadow-2xl group">
//             <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🔒</div>
//             <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Secure & Private
//             </h3>
//             <p className="text-gray-300">
//               Your conversations are protected with JWT authentication and secure connections. Your privacy matters.
//             </p>
//           </div>

//           {/* Feature 3 */}
//           <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all hover:scale-105 shadow-2xl group">
//             <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🌍</div>
//             <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
//               Multiple Rooms
//             </h3>
//             <p className="text-gray-300">
//               Join different chat rooms for various topics. Stay organized and connected with different communities.
//             </p>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-12 mb-20 animate-slideUp" style={{ animationDelay: "0.4s" }}>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             <div className="group hover:scale-110 transition-transform">
//               <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
//                 1000+
//               </div>
//               <div className="text-gray-400">Active Users</div>
//             </div>
//             <div className="group hover:scale-110 transition-transform">
//               <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
//                 50K+
//               </div>
//               <div className="text-gray-400">Messages Sent</div>
//             </div>
//             <div className="group hover:scale-110 transition-transform">
//               <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
//                 24/7
//               </div>
//               <div className="text-gray-400">Uptime</div>
//             </div>
//             <div className="group hover:scale-110 transition-transform">
//               <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
//                 99.9%
//               </div>
//               <div className="text-gray-400">Reliability</div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="text-center backdrop-blur-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-3xl p-12 shadow-2xl animate-slideUp" style={{ animationDelay: "0.6s" }}>
//           <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//             Ready to Start Chatting?
//           </h2>
//           <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//             Join thousands of users already enjoying seamless conversations. Create your account in seconds.
//           </p>
//           <Link
//             to="/register"
//             className="inline-block px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
//           >
//             Create Free Account 🎉
//           </Link>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-20 text-gray-500">
//           <p>© 2025 ChatForge. Built with ❤️ for better conversations.</p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-out;
//         }
//         .animate-slideUp {
//           animation: slideUp 0.8s ease-out both;
//         }
//       `}</style>
//     </div>
//   );
// }



// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      
      {/* Floating orbs - Responsive sizes */}
      <div className="absolute top-10 left-5 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-5 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Main Hero */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight px-2">
            Welcome to<br />ChatForge 🔥
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            Connect, chat, and collaborate in real-time with friends and teams around the world.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-slideUp px-4">
            <Link
              to="/register"
              className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Get Started Free 🚀</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
            </Link>
            
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 md:py-4 backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-white/20 transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              Sign In →
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16 lg:mb-20 animate-slideUp px-2" style={{ animationDelay: "0.2s" }}>
          {/* Feature 1 */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-white/15 transition-all hover:scale-105 active:scale-100 shadow-2xl group">
            <div className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Real-Time Chat
            </h3>
            <p className="text-sm md:text-base text-gray-300">
              Experience instant messaging with zero lag. Messages delivered in milliseconds with WebSocket technology.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-white/15 transition-all hover:scale-105 active:scale-100 shadow-2xl group">
            <div className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">🔒</div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Secure & Private
            </h3>
            <p className="text-sm md:text-base text-gray-300">
              Your conversations are protected with JWT authentication and secure connections. Your privacy matters.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-white/15 transition-all hover:scale-105 active:scale-100 shadow-2xl group sm:col-span-2 md:col-span-1">
            <div className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">🌍</div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              Multiple Rooms
            </h3>
            <p className="text-sm md:text-base text-gray-300">
              Join different chat rooms for various topics. Stay organized and connected with different communities.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 mb-12 md:mb-16 lg:mb-20 animate-slideUp mx-2" style={{ animationDelay: "0.4s" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 text-center">
            <div className="group hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1 md:mb-2">
                1000+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-400">Active Users</div>
            </div>
            <div className="group hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1 md:mb-2">
                50K+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-400">Messages Sent</div>
            </div>
            <div className="group hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-1 md:mb-2">
                24/7
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-400">Uptime</div>
            </div>
            <div className="group hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1 md:mb-2">
                99.9%
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-400">Reliability</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center backdrop-blur-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl animate-slideUp mx-2" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent px-2">
            Ready to Start Chatting?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of users already enjoying seamless conversations. Create your account in seconds.
          </p>
          <Link
            to="/register"
            className="inline-block w-full sm:w-auto px-8 md:px-10 py-3 md:py-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl md:rounded-2xl font-bold text-base md:text-xl shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 active:scale-95 mx-4"
          >
            Create Free Account 🎉
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 md:mt-16 lg:mt-20 text-gray-500 text-sm md:text-base px-4">
          <p>© 2025 ChatForge. Built with ❤️ for better conversations.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out both;
        }
      `}</style>
    </div>
  );
}