import { useState, useEffect } from 'react';
import { Moon, Sun, Droplet } from 'lucide-react';

const WaterEjector = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    // Check system dark mode preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const playWaterEjectionSound = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    // Create audio context if it doesn't exist
    const ctx = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    if (!audioContext) setAudioContext(ctx);
    
    // Function to create a single burst
    const createBurst = (startTime) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = 200;
      gainNode.gain.value = 0.5;
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.25);
    };

    // Create 10 bursts
    const burstInterval = 0.3; // 0.25s burst + 0.05s pause
    for (let i = 0; i < 10; i++) {
      createBurst(ctx.currentTime + (i * burstInterval));
    }

    // Create success jingle
    const jingleTime = ctx.currentTime + (10 * burstInterval);
    [300, 400, 500].forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = freq;
      gainNode.gain.value = 0.3;
      
      oscillator.start(jingleTime + (i * 0.033));
      oscillator.stop(jingleTime + (i * 0.033) + 0.05);
    });

    // Reset playing state after all sounds finish
    setTimeout(() => setIsPlaying(false), 4000);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-between ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Water Ejector</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-lg mx-auto flex flex-col items-center justify-center p-6 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-medium">Remove water from your device speakers</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Place your phone speaker-side down and tap the button below
          </p>
        </div>

        {/* Ejector Button */}
        <button
          onClick={playWaterEjectionSound}
          disabled={isPlaying}
          className={`w-32 h-32 rounded-full flex items-center justify-center transition-all transform
            ${isDarkMode 
              ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700' 
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }
            ${isPlaying ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}
            disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className={`transition-transform ${isPlaying ? 'animate-bounce' : ''}`}>
            <Droplet size={48} color="white" />
          </div>
        </button>

        {/* Status Text */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isPlaying ? 'Ejecting water...' : 'Ready'}
        </p>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© 2024 Water Ejector. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WaterEjector;