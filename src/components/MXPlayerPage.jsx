import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Maximize, Film, Star, Share2, Sparkles, ChevronRight } from "lucide-react";

export default function MXPlayerPage() {
  const [activeTab, setActiveTab] = useState("All");
  const videoRef = useRef(null);
  const playerSectionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const shows = [
    {
      id: 1,
      title: "The Agentic Coder",
      genre: "Tech Thriller • Drama",
      rating: "4.9 ★",
      views: "1.2M views",
      description: "A brilliant software engineer working at a top lab cracks artificial general agency. As his AI creation 'Antigravity' starts rewriting the fabric of technology, he faces a thrilling corporate and ethical chase.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
      duration: "15 min",
      type: "Web Series"
    },
    {
      id: 2,
      title: "Cosmic Voyage: Beyond Earth",
      genre: "Sci-Fi • Documentary",
      rating: "4.8 ★",
      views: "890K views",
      description: "An awe-inspiring cinematic journey through nebulae, supermassive black holes, and the edge of our observable universe. Experience stunning vistas and cutting-edge cosmological science in glorious high-definition.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      duration: "10 min",
      type: "Web Series"
    },
    {
      id: 3,
      title: "Comedy Express: Stand Up Special",
      genre: "Standup Comedy",
      rating: "4.6 ★",
      views: "2.1M views",
      description: "Get ready to laugh till your sides hurt! India's top comedy acts come together on one stage, delivering sharp observational jokes, relatable stories, and side-splitting crowd interactions.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      image: "https://images.unsplash.com/photo-1585699324551-f6c309eed262?w=800&q=80",
      duration: "12 min",
      type: "Comedy"
    },
    {
      id: 4,
      title: "The Silent Forest",
      genre: "Nature • Adventure",
      rating: "4.7 ★",
      views: "430K views",
      description: "Explore the untouched depth of temperate rainforests. Discover rare animals, micro-ecosystems, and the ancient communication network of fungi and trees, narrated by a legendary nature filmmaker.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
      duration: "8 min",
      type: "Movies"
    }
  ];

  const [currentShow, setCurrentShow] = useState(shows[0]);

  useEffect(() => {
    // Reset video states on show change
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentShow]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(current);
    setDuration(dur);
    setProgress((current / dur) * 100);
  };

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (videoRef.current) {
      videoRef.current.volume = v;
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const seekPct = parseFloat(e.target.value);
    const newTime = (seekPct / 100) * duration;
    videoRef.current.currentTime = newTime;
    setProgress(seekPct);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const selectShow = (show) => {
    setCurrentShow(show);
    playerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredShows = activeTab === "All" ? shows : shows.filter((s) => s.type === activeTab);

  return (
    <div className="bg-[#090b0e] text-white min-h-screen pb-16 font-sans">
      {/* Sleek MX Player Top Bar */}
      <div className="bg-[#0e1217] border-b border-gray-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-lg sticky top-[95px] md:top-[103px] z-40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-black text-2xl italic tracking-tight bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
            <Film className="text-orange-500 mr-1 animate-pulse" size={24} />
            amazon<span className="font-extrabold uppercase text-white tracking-wider ml-1 text-lg bg-orange-600 px-2 py-0.5 rounded shadow">MX Player</span>
          </div>
          <span className="hidden sm:inline bg-gray-800 text-gray-300 text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full uppercase border border-gray-700">
            Free Streaming
          </span>
        </div>

        {/* Video Category Tabs */}
        <div className="flex gap-2">
          {["All", "Web Series", "Movies", "Comedy"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition duration-200 border ${
                activeTab === tab
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-gray-400 border-gray-800 hover:text-white hover:border-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Video Section */}
      <div ref={playerSectionRef} className="max-w-[1400px] mx-auto px-4 md:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Player */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border border-gray-800 group">
              <video
                ref={videoRef}
                src={currentShow.videoUrl}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Central Custom Play Button Overlay */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/45 cursor-pointer transition group-hover:bg-black/30"
                >
                  <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-6 shadow-2xl scale-95 hover:scale-105 transition-all duration-300">
                    <Play size={36} className="fill-white ml-1" />
                  </button>
                </div>
              )}

              {/* custom overlay player controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Progress bar */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />

                <div className="flex items-center justify-between mt-3 text-xs">
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="text-white hover:text-orange-500 transition">
                      {isPlaying ? <Pause size={18} className="fill-white" /> : <Play size={18} className="fill-white" />}
                    </button>
                    <span className="font-semibold text-gray-300">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Volume */}
                    <div className="flex items-center gap-1.5 group/vol">
                      <Volume2 size={16} className="text-gray-300 hover:text-white" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                      />
                    </div>
                    {/* Fullscreen */}
                    <button 
                      onClick={() => videoRef.current?.requestFullscreen()}
                      className="text-gray-300 hover:text-white transition"
                    >
                      <Maximize size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Show Details */}
            <div className="mt-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="bg-[#ff4500]/10 border border-[#ff4500]/30 text-orange-400 text-xs px-3 py-1 rounded-full font-bold">
                  {currentShow.genre}
                </span>
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
                  <span className="flex items-center gap-1"><Star size={14} className="fill-yellow-500 text-yellow-500" /> {currentShow.rating}</span>
                  <span>{currentShow.views}</span>
                  <span>Duration: {currentShow.duration}</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-3 text-white">
                {currentShow.title}
              </h2>

              <p className="text-sm md:text-base text-gray-300 mt-3 font-medium leading-relaxed border-l-4 border-orange-500 pl-4 bg-orange-500/5 py-2.5 rounded-r">
                {currentShow.description}
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={togglePlay}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-md shadow-lg transition duration-200 flex items-center gap-2"
                >
                  <Play size={16} className="fill-white" /> {isPlaying ? "Pause Stream" : "Watch Now For Free"}
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold text-sm px-4 py-2.5 rounded-md transition duration-200 flex items-center gap-2 border border-gray-700">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>
          </div>

          {/* Featured Sidebar Panel */}
          <div className="lg:col-span-4 bg-[#0e1217] rounded-xl border border-gray-800 p-5 shadow-2xl h-fit">
            <h3 className="font-extrabold text-lg tracking-tight mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-orange-500 animate-pulse" /> Popular Recommendations
            </h3>
            <div className="space-y-4">
              {shows
                .filter((s) => s.id !== currentShow.id)
                .map((show) => (
                  <div
                    key={show.id}
                    onClick={() => selectShow(show)}
                    className="flex gap-3 p-2 rounded-lg hover:bg-white/5 transition duration-200 cursor-pointer group"
                  >
                    <div className="w-28 aspect-video rounded overflow-hidden shrink-0 relative bg-gray-900 border border-gray-800">
                      <img src={show.image} alt={show.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play size={16} className="fill-white text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-200 group-hover:text-orange-400 transition line-clamp-1">
                          {show.title}
                        </h4>
                        <span className="text-[10px] text-gray-500 font-semibold">{show.genre}</span>
                      </div>
                      <span className="text-[10px] text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 w-fit">
                        {show.duration}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid listing below */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-12">
        <div className="border-t border-gray-800/80 pt-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
            <span>Free Web Series & Movies</span>
            <span className="text-xs text-orange-400 hover:underline cursor-pointer flex items-center gap-0.5 font-semibold">
              Explore All <ChevronRight size={14} />
            </span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {shows.map((show) => (
              <div
                key={show.id}
                onClick={() => selectShow(show)}
                className="bg-[#0e1217] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 shadow-md cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                  <img src={show.image} alt={show.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute bottom-2 right-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">
                    {show.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300">
                    <button className="bg-orange-500 text-white rounded-full p-2.5 shadow-2xl scale-90 group-hover:scale-100 transition duration-300">
                      <Play size={16} className="fill-white" />
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <span className="text-[9px] font-extrabold text-orange-400 uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded">
                    {show.type}
                  </span>
                  <h4 className="font-bold text-gray-200 text-sm mt-2 line-clamp-1 group-hover:text-orange-400 transition">
                    {show.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-semibold mt-1">{show.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
