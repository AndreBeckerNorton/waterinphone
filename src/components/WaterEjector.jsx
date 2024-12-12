import { useState, useEffect } from 'react';
import { Droplet } from 'lucide-react';
import CoffeeButton from './CoffeeButton';

const WaterEjector = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showSilentWarning, setShowSilentWarning] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(ios);
    setShowSilentWarning(ios);
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
    <div className="min-h-screen flex flex-col items-center justify-between bg-[#F5F5F7]">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-lg mx-auto flex flex-col items-center justify-center p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">Water Ejector</h1>
          {showSilentWarning && (
            <div className="text-xs mt-1 flex items-center justify-center gap-1 text-[#FF9500]">
              <span className="animate-pulse">Turn off silent mode</span>
            </div>
          )}
        </div>

        {/* Ejector Button */}
        <button
          onClick={handleButtonClick}
          disabled={isPlaying}
          className="relative w-32 h-32 rounded-full flex items-center justify-center transition-all transform disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'rgba(50, 173, 230, 0.80)',
            transform: isPlaying ? 'scale(0.95)' : 'scale(1)',
            opacity: isPlaying ? '0.8' : '1',
            boxShadow: '0 0 20px rgba(0, 122, 255, 0.3)',
          }}
        >
          <div 
            className={`absolute inset-0 rounded-full ${isPlaying ? 'animate-[ping_0.3s_ease-in-out_10]' : ''}`}
            style={{
              backgroundColor: 'rgba(0, 122, 255, 0.9)',
              opacity: isPlaying ? '0.2' : '0'
            }} 
          />
          <div className={`relative z-10 ${isPlaying ? 'animate-[pulse_0.3s_ease-in-out_10]' : ''}`}>
            <Droplet 
              size={64} 
              className="text-white drop-shadow-lg"
              loading="lazy"
            />
          </div>
        </button>

        {/* Status Text */}
        <p className="text-gray-600 text-center">
          {isPlaying ? 'Ejecting water...' : 'Tap the button to eject water. For the best results, ensure the volume on your device is set to maximum.'}
        </p>
      </main>

      {/* FAQ Section */}
      <section className="w-full max-w-2xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900">Restore Sound. Protect Your Device.</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-900">How It Works</h3>
            <p className="text-gray-600">
              With a tap, waterinphone.com emits a finely tuned audio frequency designed to resonate within the speaker chamber. These precise vibrations push out trapped water, clearing your speaker components in seconds.

              The result? Clearer sound, reduced risk of moisture damage, and peace of mind.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-900">What types of devices does this work with?</h3>
            <p className="text-gray-600">
              This water ejection tool is designed to work with a wide range of devices, including smartphones, tablets, laptops, and any device with built-in speakers. Whether you use an iPhone, Samsung Galaxy, Google Pixel, other Android devices, or even laptops, this universal solution helps expel water effectively through your device&apos;s speaker system.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-900">Is it safe to use this water removal tool?</h3>
            <p className="text-gray-600">
              Yes, this tool is completely safe. It uses the same technology as Apple&apos;s built-in water ejection feature. The sound waves are harmless and can&apos;t damage your device&apos;s speaker or other components.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-sm text-gray-600">
        <p>© 2024 Water Ejector. All rights reserved.</p>
      </footer>
      <CoffeeButton />
    </div>
  );
};

export default WaterEjector;