import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-8">
        Privacy Policy
      </h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-8">
          Last updated: January 15, 2024
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-600 mb-4">
            WaterinPhone ("we," "us," or "our") operates waterinphone.com. This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our website.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Collection and Use</h2>
          <p className="text-gray-600 mb-4">
            While using our website, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This information may include, but is not limited to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Usage data (how you interact with our website)</li>
            <li>Device information (browser type, device type)</li>
            <li>IP address</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Google Analytics</h2>
          <p className="text-gray-600 mb-4">
            We use Google Analytics to analyze the use of our website. Google Analytics is a web analytics service that tracks and reports website traffic. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.
          </p>
          <p className="text-gray-600 mb-4">
            You can opt-out of having your activity available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents Google Analytics JavaScript from sharing information with Google Analytics about visits activity.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Google AdSense</h2>
          <p className="text-gray-600 mb-4">
            We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
          <p className="text-gray-600 mb-4">
            Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device.
          </p>
          <p className="text-gray-600 mb-4">
            Our website uses these cookies to collect information and improve our services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security</h2>
          <p className="text-gray-600 mb-4">
            The security of your personal information is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-600 mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Changes are effective immediately after they are posted.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-600">
            Email: privacy@waterinphone.com
          </p>
        </section>
      </div>
    </div>
  );
} 