import { useState, useEffect } from 'react';
import { Droplet, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
      {/* Emergency Alert Banner */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-blue-600" />
            <p className="text-sm text-blue-900">
              Water damage? <span className="font-medium">Act fast!</span> Follow our emergency guide below.
            </p>
          </div>
          <Link to="/blog/water-damage-guide" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            Read Guide →
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section with Quick Guide */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-semibold text-gray-900 mb-6">Water Damage First Aid</h1>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">Follow these critical steps immediately:</p>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">1</span>
                      <span>Power off your device immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">2</span>
                      <span>Remove case and any detachable parts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">3</span>
                      <span>Dry exterior thoroughly with clean cloth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">4</span>
                      <span>Use water ejection tool below for speakers</span>
                    </li>
                  </ol>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Important Safety Notes</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Info size={20} className="flex-shrink-0 text-blue-600 mt-0.5" />
                    <span className="text-gray-600">Do not use heat (hair dryers, etc.) - this can cause internal damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info size={20} className="flex-shrink-0 text-blue-600 mt-0.5" />
                    <span className="text-gray-600">Avoid rice - it's ineffective and can cause additional problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info size={20} className="flex-shrink-0 text-blue-600 mt-0.5" />
                    <span className="text-gray-600">For salt water exposure, seek professional help immediately</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Water Ejection Tool Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-8">
              <h2 className="text-3xl font-semibold text-gray-900">Speaker Water Ejection Tool</h2>
              <p className="text-xl text-gray-600">
                Using the same technology as Apple Watch, our tool emits precisely calibrated sound frequencies to safely remove water from your device's speakers.
              </p>
              {showSilentWarning && (
                <div className="text-sm mt-1 flex items-center justify-center gap-1 text-[#FF9500]">
                  <span className="animate-pulse">Turn off silent mode for best results</span>
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-2 text-gray-900">Before You Start</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Maximum volume recommended</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Remove phone case if possible</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Keep device upright</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Disable silent mode</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-2 text-gray-900">During Process</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Wait for full cycle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Keep device still</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Watch for water droplets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Repeat if necessary</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-2 text-gray-900">After Ejection</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Test speaker sound</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Check all openings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Dry exterior completely</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Wait before charging</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Ejector Button */}
            <div className="flex flex-col items-center gap-8">
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

              <p className="text-gray-600 text-center max-w-lg">
                {isPlaying ? 'Ejecting water...' : 'Tap the button to eject water. For the best results, ensure the volume on your device is set to maximum and silent mode is turned off.'}
              </p>
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="bg-white border-t border-gray-100 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">Latest Water Damage Guides</h2>
              <Link to="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
                View All Articles →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Link 
                to="/blog/water-damage-guide"
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-medium text-gray-900 mb-2">Complete Water Damage Guide</h3>
                <p className="text-gray-600 mb-4">Learn everything about protecting your devices from water damage, emergency response, and recovery steps.</p>
                <span className="text-blue-600 font-medium">Read More →</span>
              </Link>
              <Link 
                to="/blog/waterproof-ratings-explained"
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-medium text-gray-900 mb-2">IP Ratings Explained</h3>
                <p className="text-gray-600 mb-4">Understand what IP67, IP68, and other water resistance ratings mean for your device's protection.</p>
                <span className="text-blue-600 font-medium">Read More →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-16">
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
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link to="/blog/water-damage-guide" className="text-gray-600 hover:text-gray-900">Water Damage Guide</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/blog/waterproof-ratings-explained" className="text-gray-600 hover:text-gray-900">IP Ratings Guide</Link></li>
                <li><Link to="/blog/speaker-maintenance" className="text-gray-600 hover:text-gray-900">Speaker Maintenance</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Contact</h3>
              <p className="text-gray-600">
                Questions or concerns?<br />
                <a href="mailto:privacy@waterinphone.com" className="text-blue-600 hover:text-blue-800">privacy@waterinphone.com</a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-600">
            <p>© 2024 Water Ejector. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <CoffeeButton />
    </div>
  );
};

export default WaterEjector;