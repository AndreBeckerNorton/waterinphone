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
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-6 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl font-semibold text-gray-900">Water Ejector</h1>
          <p className="text-xl text-gray-600">
            Got water in your phone? Our advanced water ejection tool uses precisely calibrated sound frequencies to safely remove water from your device's speakers.
          </p>
          {showSilentWarning && (
            <div className="text-sm mt-1 flex items-center justify-center gap-1 text-[#FF9500]">
              <span className="animate-pulse">Turn off silent mode for best results</span>
            </div>
          )}
        </div>

        {/* Ejector Button */}
        <div className="relative">
          <button
            onClick={handleButtonClick}
            disabled={isPlaying}
            className="relative w-40 h-40 rounded-full flex items-center justify-center transition-all transform disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'rgba(50, 173, 230, 0.80)',
              transform: isPlaying ? 'scale(0.95)' : 'scale(1)',
              opacity: isPlaying ? '0.8' : '1',
              boxShadow: '0 0 20px rgba(0, 122, 255, 0.3)',
            }}
            aria-label={isPlaying ? "Stop water ejection" : "Start water ejection"}
            aria-pressed={isPlaying}
            title={isPlaying ? "Click to stop ejecting water" : "Click to eject water from your phone's speaker"}
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
                size={80} 
                className="text-white drop-shadow-lg"
                loading="lazy"
              />
            </div>
          </button>
        </div>

        {/* Status Text */}
        <p className="text-gray-600 text-center max-w-lg">
          {isPlaying ? 'Ejecting water...' : 'Tap the button to eject water. For the best results, ensure the volume on your device is set to maximum and silent mode is turned off.'}
        </p>

        {/* Quick Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-2 text-gray-900">Before You Start</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Maximum volume recommended</li>
              <li>• Remove phone case if possible</li>
              <li>• Keep device upright</li>
              <li>• Disable silent mode</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-2 text-gray-900">During Process</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Wait for full cycle</li>
              <li>• Keep device still</li>
              <li>• Watch for water droplets</li>
              <li>• Repeat if necessary</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-2 text-gray-900">After Ejection</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Test speaker sound</li>
              <li>• Check all openings</li>
              <li>• Dry exterior completely</li>
              <li>• Wait before charging</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Educational Sections */}
      <section className="w-full bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold mb-12 text-gray-900">Understanding Water Damage & Protection</h2>
          
          <div className="space-y-16">
            <div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">How Our Water Ejector Works</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Using the same technology found in high-end smartphones, our water ejector tool emits precisely calibrated sound frequencies that create controlled vibrations in your device's speaker chamber. These vibrations effectively push out trapped water droplets, helping restore sound quality and prevent potential water damage.
              </p>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-3">Key Benefits:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                  <li>• Immediate results</li>
                  <li>• No disassembly required</li>
                  <li>• Safe for all devices</li>
                  <li>• Prevents corrosion</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Device Compatibility</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our water ejection tool is designed to work with all modern smartphones and devices with built-in speakers. Whether you have an iPhone, Samsung Galaxy, Google Pixel, or any other smartphone, our universal solution helps expel water effectively through your device's speaker system.
              </p>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-3">Compatible Devices:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                  <li>• iPhones (all models)</li>
                  <li>• Android smartphones</li>
                  <li>• Tablets & iPads</li>
                  <li>• Smartwatches</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">When to Seek Professional Help</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                While our water ejection tool is highly effective for speaker water removal, some situations require professional attention. If your device has experienced severe water damage or shows signs of internal water penetration, we recommend consulting a professional repair service.
              </p>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-3">Warning Signs:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                  <li>• Screen discoloration</li>
                  <li>• Battery issues</li>
                  <li>• Charging problems</li>
                  <li>• Unresponsive buttons</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-12 text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-4 text-gray-900">Is this safe for my device?</h3>
            <p className="text-gray-600 leading-relaxed">
              Yes, our water ejection tool is completely safe. It uses the same technology as Apple's built-in water ejection feature found in Apple Watches. The sound waves are carefully calibrated to be effective yet harmless to your device's components.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4 text-gray-900">How many times should I use it?</h3>
            <p className="text-gray-600 leading-relaxed">
              We recommend running the water ejection process 2-3 times or until you no longer see water droplets being expelled. If sound quality isn't fully restored after multiple attempts, wait 30 minutes and try again, as water may need time to settle.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4 text-gray-900">Does it work for salt water exposure?</h3>
            <p className="text-gray-600 leading-relaxed">
              While our tool can help remove salt water from speakers, we strongly recommend seeking professional service after salt water exposure. Salt water is highly corrosive and can cause permanent damage if not properly treated.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4 text-gray-900">What about other liquid types?</h3>
            <p className="text-gray-600 leading-relaxed">
              Our tool works with any liquid, but sticky substances (soda, coffee, etc.) may require professional cleaning. After using the water ejector, we recommend cleaning the affected area with a slightly damp cloth to remove any residue.
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