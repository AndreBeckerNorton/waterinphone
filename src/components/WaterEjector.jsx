import React, { useState, useRef, useEffect } from 'react';
import { Droplet } from 'lucide-react';

const WaterEjector = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContext = useRef(null);
  const oscillator = useRef(null);

  useEffect(() => {
    return () => {
      if (oscillator.current) {
        oscillator.current.stop();
        oscillator.current.disconnect();
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const handleButtonClick = () => {
    if (isPlaying) {
      if (oscillator.current) {
        oscillator.current.stop();
        oscillator.current.disconnect();
      }
      setIsPlaying(false);
      return;
    }

    try {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      oscillator.current = audioContext.current.createOscillator();
      oscillator.current.type = 'sine';
      oscillator.current.frequency.setValueAtTime(165, audioContext.current.currentTime);

      oscillator.current.connect(audioContext.current.destination);
      oscillator.current.start();

      setIsPlaying(true);

      // Stop after 3 seconds
      setTimeout(() => {
        if (oscillator.current) {
          oscillator.current.stop();
          oscillator.current.disconnect();
        }
        setIsPlaying(false);
      }, 3000);
    } catch (error) {
      console.error('Error playing sound:', error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-4xl font-medium tracking-tight text-gray-900 text-center mb-8">
          Remove Water from Phone Speaker
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-12">
          Got water in your phone speaker? Use our free tool to eject it instantly. Works on all phones - iPhone, Samsung, and more.
        </p>

        {/* Eject Button */}
        <button
          className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
            isPlaying ? 'scale-95' : 'scale-100'
          }`}
          style={{
            backgroundColor: 'rgba(50, 173, 230, 0.8)',
          }}
          onClick={handleButtonClick}
          aria-label={isPlaying ? "Stop water ejection" : "Start water ejection"}
          aria-pressed={isPlaying}
          title={isPlaying ? "Click to stop ejecting water" : "Click to eject water from your phone's speaker"}
        >
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
          <div className="relative z-10 text-white text-lg font-medium">
            {isPlaying ? 'Stop' : 'Eject'}
          </div>
        </button>

        {/* Status Text */}
        <p className="text-gray-600 text-center mt-8">
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
              This water ejection tool is designed to work with a wide range of devices, including smartphones, tablets, laptops, and any device with built-in speakers. Whether you use an iPhone, Samsung Galaxy, Google Pixel, other Android devices, or even laptops, this universal solution helps expel water effectively through your device's speaker system.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-900">Is it safe to use this water removal tool?</h3>
            <p className="text-gray-600">
              Yes, this tool is completely safe. It uses the same technology as Apple's built-in water ejection feature. The sound waves are harmless and can't damage your device's speaker or other components.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-sm text-gray-600">
        <p>© 2024 Water Ejector. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default WaterEjector;