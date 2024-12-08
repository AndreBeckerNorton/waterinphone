import { useState, useEffect } from 'react';
import { Moon, Sun, Droplet } from 'lucide-react';
import CoffeeButton from './CoffeeButton';

const WaterEjector = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showSilentWarning, setShowSilentWarning] = useState(false);

  // Apple official colors
  const colors = {
    darkBg: '#000000',          // Apple dark mode background
    darkSecondary: '#1C1C1E',   // Apple dark mode secondary
    lightBg: '#F5F5F7',         // Apple light mode background
    lightSecondary: '#FFFFFF',   // Apple light mode secondary
    buttonLight: 'rgba(0, 122, 255, 0.9)',  // Apple blue with transparency
    buttonDark: 'rgba(10, 132, 255, 0.9)',  // Apple dark mode blue with transparency
    warning: '#FF9500'          // Apple orange
  };

  useEffect(() => {
    // Check if device is iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(ios);
    setShowSilentWarning(ios);
    
    // Check system dark mode preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const initializeAudioContext = () => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(ctx);
      
      if (isIOS && ctx.state === 'suspended') {
        ctx.resume();
      }
    } else if (isIOS && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  };

  const playWaterEjectionSound = async () => {
    if (isPlaying) return;
    
    // Track button click in Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'water_ejection', {
        'event_category': 'user_interaction',
        'event_label': 'eject_water_button_clicked'
      });
    }

    setIsPlaying(true);
    
    // Initialize or resume AudioContext
    initializeAudioContext();
    
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

  const handleButtonClick = () => {
    if (isIOS && (!audioContext || audioContext.state === 'suspended')) {
      initializeAudioContext();
    }
    playWaterEjectionSound();
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-between transition-colors duration-300"
      style={{
        backgroundColor: isDarkMode ? colors.darkBg : colors.lightBg,
        color: isDarkMode ? '#FFFFFF' : '#000000'
      }}
    >
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center">
        <div className="relative">
          <h1 className="text-2xl font-semibold">Water Ejector</h1>
          {showSilentWarning && (
            <div 
              className="text-xs mt-1 flex items-center gap-1"
              style={{ color: 'rgb(255, 149, 0)' }}
            >
              <span className="animate-pulse">Turn off silent mode</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full transition-colors"
          style={{
            backgroundColor: isDarkMode ? colors.darkSecondary : colors.lightSecondary
          }}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-lg mx-auto flex flex-col items-center justify-center p-6 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-medium">Remove water from your device&apos;s speaker</h2>
        </div>

        {/* Ejector Button */}
        <button
          onClick={handleButtonClick}
          disabled={isPlaying}
          className="relative w-32 h-32 rounded-full flex items-center justify-center transition-all transform disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
          style={{
            backgroundColor: isDarkMode ? 'rgba(100, 210, 255, 0.80)' : 'rgba(50, 173, 230, 0.80)',
            transform: isPlaying ? 'scale(0.95)' : 'scale(1)',
            opacity: isPlaying ? '0.8' : '1',
            boxShadow: `0 0 20px ${isDarkMode ? 'rgba(10, 132, 255, 0.2)' : 'rgba(0, 122, 255, 0.2)'}`,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        >
          <div 
            className={`absolute inset-0 rounded-full ${isPlaying ? 'animate-[ping_0.3s_ease-in-out_10]' : ''}`}
            style={{
              backgroundColor: isDarkMode ? colors.buttonDark : colors.buttonLight,
              opacity: isPlaying ? '0.2' : '0'
            }} 
          />
          <div 
            className={`relative z-10 ${isPlaying ? 'animate-[pulse_0.3s_ease-in-out_10]' : ''}`}
          >
            <Droplet 
              size={64} 
              className="transition-transform"
              style={{
                color: 'white',
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
              }}
            />
          </div>
        </button>

        {/* Status Text */}
        <p style={{ color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
          {isPlaying ? 'Ejecting water...' : 'Tap the button to eject water'}
        </p>
      </main>

      {/* FAQ Section */}
      <section className="w-full max-w-2xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-2">How do I get water out of my phone speaker?</h3>
            <p style={{ color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
              To remove water from your phone speaker: 1) Place your phone speaker-side down, 2) Click the water eject button above, 3) Wait for the sound sequence to complete. The sound waves will help push water out of your speaker.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Does this really work to get water out of phone speakers?</h3>
            <p style={{ color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
              Yes! This tool uses the same technology as the Apple Watch&apos;s water ejection feature. It plays a specific frequency that creates vibrations to physically push water out of your device&apos;s speaker grilles.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">What types of phones does this work with?</h3>
            <p style={{ color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
              This water ejection tool works with all phones, including iPhones, Samsung Galaxy, Google Pixel, and other Android devices. It&apos;s a universal solution that works through your device&apos;s speaker.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Is it safe to use this water removal tool?</h3>
            <p style={{ color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
              Yes, this tool is completely safe. It uses the same technology as Apple&apos;s built-in water ejection feature. The sound waves are harmless and can&apos;t damage your device&apos;s speaker or other components.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">How many times should I use the water eject feature?</h3>
            <p style={{ color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
              If water is still present after the first use, you can safely run the water ejection sequence 2-3 times. Make sure to keep your phone speaker-side down between attempts to let gravity help remove the water.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-sm" 
        style={{ color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
      >
        <p>© 2024 Water Ejector. All rights reserved.</p>
      </footer>
      <CoffeeButton />
  </div>
);
};

export default WaterEjector;