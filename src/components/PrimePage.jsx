import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, Sparkles, CheckCircle, Video, ChevronRight, X, Heart } from "lucide-react";

export default function PrimePage({ isPrime, onJoin }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // Prime Music Player state
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [musicProgress, setMusicProgress] = useState(30); // start at 30s
  const musicTimer = useRef(null);

  const playlist = [
    {
      title: "Rahman Classics (Instrumental)",
      artist: "A.R. Rahman Medley",
      duration: "4:15",
      durationSec: 255,
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&q=80",
    },
    {
      title: "Lofi Study Beats",
      artist: "Chillhop Cafe",
      duration: "3:30",
      durationSec: 210,
      cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=150&q=80",
    },
    {
      title: "Workout EDM Energy Mix",
      artist: "DJ Rev",
      duration: "5:00",
      durationSec: 300,
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&q=80",
    },
    {
      title: "Midnight Jazz Chillout",
      artist: "The Blue Notes Trio",
      duration: "3:48",
      durationSec: 228,
      cover: "https://images.unsplash.com/photo-1487180142328-054b783fc471?w=150&q=80",
    }
  ];

  const videos = [
    {
      id: 1,
      title: "The Boys - Season 4",
      genre: "Action • Sci-Fi • Dark Comedy",
      description: "In Season 4, the world is on the brink. Victoria Neuman is closer than ever to the Oval Office and under the muscled thumb of Homelander.",
      thumbnail: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=600&q=80",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // placeholder mp4
      year: "2024",
      rating: "A (18+)"
    },
    {
      id: 2,
      title: "Reacher - Season 2",
      genre: "Action • Crime • Drama",
      description: "Veteran military police investigator Jack Reacher is pulled from his wandering life by a coded message informing him that a member of his former unit has been murdered.",
      thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      year: "2023",
      rating: "A (18+)"
    },
    {
      id: 3,
      title: "Fallout - Season 1",
      genre: "Sci-Fi • Adventure • Drama",
      description: "Based on one of the greatest video game series of all time, Fallout is the story of haves and have-nots in a world in which there's almost nothing left to have.",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      year: "2024",
      rating: "UA (16+)"
    }
  ];

  // Handle Music Player Progress
  useEffect(() => {
    if (isPlayingMusic) {
      musicTimer.current = setInterval(() => {
        setMusicProgress((prev) => {
          const max = playlist[currentTrackIndex].durationSec;
          if (prev >= max) {
            // Next track
            setCurrentTrackIndex((idx) => (idx + 1) % playlist.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(musicTimer.current);
    }

    return () => clearInterval(musicTimer.current);
  }, [isPlayingMusic, currentTrackIndex]);

  // Handle Mock Video Player Progress
  useEffect(() => {
    let videoTimer;
    if (isVideoPlaying) {
      videoTimer = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setIsVideoPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    } else {
      clearInterval(videoTimer);
    }
    return () => clearInterval(videoTimer);
  }, [isVideoPlaying]);

  const currentTrack = playlist[currentTrackIndex];

  const formatMusicTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleTrackChange = (direction) => {
    setIsPlayingMusic(false);
    setMusicProgress(0);
    setTimeout(() => {
      if (direction === "next") {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
      } else {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
      }
      setIsPlayingMusic(true);
    }, 150);
  };

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen pb-16">
      {/* Prime Header Cover */}
      <div className="relative bg-gradient-to-r from-blue-900 via-sky-900 to-indigo-950 text-white py-12 px-6 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-sky-500/20 rounded-full blur-[100px]" />
        <div className="absolute left-1/4 bottom-0 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px]" />

        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3">
              <span className="bg-sky-500 text-slate-900 text-xs font-black px-3 py-1 rounded-sm uppercase tracking-widest shadow-lg">
                ★ prime
              </span>
              <span className="text-xs text-sky-300 font-semibold flex items-center gap-1">
                <Sparkles size={12} className="animate-pulse" /> Free Shipping & Entertainment
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              One Membership, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">
                Many Worlds of Benefits
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 mt-4 leading-relaxed max-w-lg">
              Unlock FREE Same-Day/One-Day delivery, unlimited video streaming of blockbuster movies & TV shows, ad-free music, early access to shopping events, and more.
            </p>

            {/* Trial Trigger Onboarding */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
              {!isPrime ? (
                <button
                  onClick={onJoin}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-black px-8 py-3 rounded-full shadow-xl shadow-sky-500/20 hover:scale-105 transition-all text-sm uppercase tracking-wider"
                >
                  Start Your 30-Day Free Trial
                </button>
              ) : (
                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 rounded-full text-emerald-400 font-bold">
                  <CheckCircle className="animate-bounce" size={20} />
                  <span>Prime Active! Header Updated & Shipping Unlocked</span>
                </div>
              )}
              <span className="text-xs text-slate-400 font-medium">₹1,499/year after trial. Cancel anytime.</span>
            </div>
          </div>

          <div className="w-full max-w-sm bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 shadow-2xl">
            <h3 className="font-extrabold text-sm text-sky-400 mb-4 flex items-center gap-2">
              <Music size={16} /> Prime Music Widget
            </h3>

            {/* Interactive Music Player Panel */}
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 relative overflow-hidden">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-700 shrink-0 shadow-md">
                  <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden flex-grow">
                  <h4 className="font-bold text-xs truncate text-white">{currentTrack.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{currentTrack.artist}</p>

                  {/* Sound Wave Frequency Visualizer (Animated SVG/CSS when playing) */}
                  <div className="flex items-end gap-0.5 h-6 mt-2">
                    {[6, 12, 18, 10, 14, 8, 16, 11, 7, 13, 9, 15].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-gradient-to-t from-sky-600 to-indigo-400 rounded-full transition-all duration-300 ${
                          isPlayingMusic ? "animate-[bounce_1.2s_infinite]" : "h-1"
                        }`}
                        style={{
                          height: isPlayingMusic ? `${h}px` : "3px",
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Slider */}
              <div className="mt-4">
                <div className="h-1 bg-slate-800 rounded-full w-full relative">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full absolute left-0 top-0"
                    style={{ width: `${(musicProgress / currentTrack.durationSec) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                  <span>{formatMusicTime(musicProgress)}</span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mt-3">
                <button onClick={() => handleTrackChange("prev")} className="text-slate-400 hover:text-white transition">
                  <SkipBack size={18} />
                </button>
                <button
                  onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                  className="bg-sky-500 hover:bg-sky-400 text-slate-950 p-2 rounded-full shadow-lg shadow-sky-500/20 hover:scale-105 transition"
                >
                  {isPlayingMusic ? <Pause size={18} className="fill-slate-950" /> : <Play size={18} className="fill-slate-950 ml-0.5" />}
                </button>
                <button onClick={() => handleTrackChange("next")} className="text-slate-400 hover:text-white transition">
                  <SkipForward size={18} />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-3">
              <span className="flex items-center gap-1"><Volume2 size={12} className="text-sky-500" /> Ad-Free Streaming</span>
              <span className="font-bold hover:underline cursor-pointer text-sky-400">Open Full Player</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-12 space-y-12">
        {/* Prime Video Mock Hub */}
        <div>
          <div className="flex items-baseline justify-between border-b border-slate-800 pb-3 mb-6">
            <h2 className="text-xl md:text-2xl font-extrabold flex items-center gap-2">
              <Video className="text-sky-500" /> Prime Video Originals
            </h2>
            <span className="text-xs text-sky-400 font-bold flex items-center hover:underline cursor-pointer">
              Browse library <ChevronRight size={14} />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => {
                  setActiveVideo(vid);
                  setIsVideoPlaying(true);
                  setVideoProgress(0);
                }}
                className="bg-slate-900/40 rounded-xl overflow-hidden border border-slate-800 hover:border-sky-500/40 transition duration-300 cursor-pointer group shadow-lg"
              >
                {/* Video Image */}
                <div className="aspect-video relative overflow-hidden bg-slate-950">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-sky-500 text-slate-950 p-3.5 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-all">
                      <Play size={20} className="fill-slate-950 ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-sm text-[9px] font-bold px-2 py-0.5 rounded text-gray-200 uppercase tracking-widest border border-slate-700">
                    {vid.rating}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 bg-sky-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow">
                    Original
                  </span>
                </div>

                {/* Video Meta */}
                <div className="p-4">
                  <span className="text-[10px] font-extrabold text-sky-400 tracking-wider uppercase bg-sky-950/60 px-2 py-0.5 rounded">
                    {vid.genre}
                  </span>
                  <h3 className="font-extrabold text-base text-white mt-2 group-hover:text-sky-400 transition">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {vid.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-extrabold text-white mb-6 text-center">
            All the Benefits of Prime in One Place
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-slate-950/40 p-5 rounded-xl border border-slate-800/50">
              <span className="text-3xl">🚀</span>
              <h4 className="font-bold text-sm text-white mt-3">Free 1-Day Delivery</h4>
              <p className="text-xs text-slate-400 mt-1">On millions of items. No minimum purchase required.</p>
            </div>
            <div className="text-center bg-slate-950/40 p-5 rounded-xl border border-slate-800/50">
              <span className="text-3xl">🎬</span>
              <h4 className="font-bold text-sm text-white mt-3">Prime Video</h4>
              <p className="text-xs text-slate-400 mt-1">Unlimited streaming of movies, TV shows, and award-winning originals.</p>
            </div>
            <div className="text-center bg-slate-950/40 p-5 rounded-xl border border-slate-800/50">
              <span className="text-3xl">🎵</span>
              <h4 className="font-bold text-sm text-white mt-3">Prime Music</h4>
              <p className="text-xs text-slate-400 mt-1">Ad-free streaming of 100 million songs, playlists, and podcasts.</p>
            </div>
            <div className="text-center bg-slate-950/40 p-5 rounded-xl border border-slate-800/50">
              <span className="text-3xl">🏷️</span>
              <h4 className="font-bold text-sm text-white mt-3">Early Access Deals</h4>
              <p className="text-xs text-slate-400 mt-1">Get access to blockbuster Lightning Deals 30 minutes before everyone else.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Modal Video Trailer Preview */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setActiveVideo(null)} />
          
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 w-full max-w-3xl relative z-10 shadow-2xl flex flex-col">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition z-20 border border-slate-700"
            >
              <X size={18} />
            </button>

            {/* Cinematic Media Screen */}
            <div className="aspect-video bg-black relative flex items-center justify-center group/screen">
              {isVideoPlaying ? (
                // Simulating media rendering via animated player
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-indigo-950/80 to-slate-950/90 relative overflow-hidden">
                  {/* Dynamic background particles */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-indigo-950 to-black animate-pulse" />
                  
                  {/* Pulse visualizer in center */}
                  <div className="w-16 h-16 rounded-full border-4 border-sky-500 border-t-transparent animate-spin mb-4" />
                  
                  <span className="bg-sky-500/20 text-sky-400 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider border border-sky-500/30">
                    Now Playing
                  </span>
                  <h3 className="font-black text-xl text-white mt-2">{activeVideo.title} Trailer</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">Enjoy cinematic high definition mock trailer streaming powered by Amazon Prime.</p>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950 text-center">
                  <Play size={48} className="text-sky-500 cursor-pointer hover:scale-110 transition" onClick={() => setIsVideoPlaying(true)} />
                  <p className="text-sm font-bold text-white mt-3">Trailer Paused</p>
                  <p className="text-xs text-slate-500 mt-1">Click to resume mock video playback.</p>
                </div>
              )}

              {/* Custom Movie Progress bar overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300">
                <div className="h-1 bg-white/20 rounded-full w-full relative cursor-pointer">
                  <div
                    className="h-full bg-sky-500 rounded-full absolute left-0 top-0"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-gray-400">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsVideoPlaying(!isVideoPlaying)} className="hover:text-white transition">
                      {isVideoPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <span>0:{(Math.floor((videoProgress / 100) * 45) < 10 ? "0" : "") + Math.floor((videoProgress / 100) * 45)} / 0:45</span>
                  </div>
                  <span className="text-sky-400 font-extrabold">1080p HD</span>
                </div>
              </div>
            </div>

            {/* Video Detail Footer */}
            <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
              <div className="max-w-md">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mb-1">
                  <span>{activeVideo.year}</span>
                  <span>•</span>
                  <span>{activeVideo.rating}</span>
                  <span>•</span>
                  <span className="text-sky-400 uppercase">{activeVideo.genre}</span>
                </div>
                <h2 className="text-lg font-black text-white">{activeVideo.title}</h2>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{activeVideo.description}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="bg-white text-slate-950 font-bold px-6 py-2 rounded text-xs hover:bg-slate-200 transition text-center"
                >
                  {isVideoPlaying ? "Pause Playback" : "Play Trailer"}
                </button>
                <button className="border border-slate-700 text-white font-semibold px-6 py-2 rounded text-xs hover:bg-slate-800 transition flex items-center justify-center gap-1.5">
                  <Heart size={14} className="text-rose-500" /> Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
