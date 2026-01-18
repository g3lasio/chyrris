import { useLanguage } from '../hooks/useLanguage';

export default function CaymusTanksSupport() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1a2332] to-[#0a1628] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Caymus Tank Calculator - Support</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              Need help with Caymus Tank Calculator? We are here to assist you.
            </p>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <p className="mb-2"><strong>Email:</strong> support@chyrris.com</p>
              <p className="mb-2"><strong>Website:</strong> <a href="https://chyrris.com" className="text-blue-400 hover:underline">https://chyrris.com</a></p>
              <p><strong>Response Time:</strong> Within 24-48 hours</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-2">How do I calculate tank volumes?</h3>
                <p className="text-gray-300">
                  The app offers two calculation modes: Space to Gallons (calculate how many wine gallons fit in available space) and Gallons to Space (determine space needed for desired wine volume). Simply select your tank model and enter the required measurements.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-2">What is the difference between Wine Gallons and Standard Gallons?</h3>
                <p className="text-gray-300">
                  Wine Gallons are a specific measurement used in the wine industry (1 wine gallon = 3.78541 liters). Standard Gallons refer to US liquid gallons. Our app provides both measurements for your convenience.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-2">How do I cancel my subscription?</h3>
                <p className="text-gray-300">
                  You can cancel your subscription at any time through your App Store account settings. Go to Settings → Your Name → Subscriptions → Caymus Tank Calculator → Cancel Subscription. You will lose access immediately upon cancellation.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-2">Can I add custom tank models?</h3>
                <p className="text-gray-300">
                  Currently, the app includes a comprehensive database of common wine tank models. If you need a specific tank model added, please contact our support team with the specifications.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-2">Is my data private?</h3>
                <p className="text-gray-300">
                  Yes, all your calculations and data remain private on your device. We do not collect, store, or share your operational information. See our <a href="/caymus-tanks/privacy" className="text-blue-400 hover:underline">Privacy Policy</a> for more details.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technical Requirements</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>iOS 13.0 or later</li>
                <li>Compatible with iPhone and iPad</li>
                <li>Internet connection required for initial setup and authentication</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Report a Bug</h2>
            <p className="text-gray-300 mb-4">
              Found a bug or issue? Please email us at <a href="mailto:support@chyrris.com" className="text-blue-400 hover:underline">support@chyrris.com</a> with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <li>Your device model and iOS version</li>
              <li>App version (found in Settings)</li>
              <li>Detailed description of the issue</li>
              <li>Steps to reproduce the problem</li>
              <li>Screenshots if applicable</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 text-center">
          <a href="/caymus-tanks" className="text-blue-400 hover:underline">← Back to Caymus Tank Calculator</a>
        </div>
      </div>
    </div>
  );
}
