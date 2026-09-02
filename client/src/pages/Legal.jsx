import React from 'react';
import { useLocation } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';

export const Legal = () => {
  const location = useLocation();
  const path = location.pathname;

  const isPrivacy = path.includes('privacy');
  const isTerms = path.includes('terms');

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionTitle
          hindiSubtitle="वैधानिक एवं गोपनीयता नीति"
          title={
            isPrivacy
              ? 'Privacy Policy (गोपनीयता नीति)'
              : isTerms
              ? 'Terms of Service (सेवा की शर्तें)'
              : 'Disclaimer (अस्वीकरण)'
          }
        />

        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-roseBlush-200 shadow-soft text-stone-700 text-sm leading-relaxed space-y-6 font-light">
          {isPrivacy ? (
            <>
              <p>
                <b>1. Public Access & Zero User Tracking:</b> Jaigurudev Sanstha's official website is purely informational and spiritual. We do not require public visitors or devotees to register, create accounts, or provide personal passwords to access satsang schedules, notices, or audio/video discourses.
              </p>
              <p>
                <b>2. Contact Form Enquiries:</b> Any details submitted through our contact form (such as name, optional phone, or email) are utilized strictly by the Ashram administration to respond to your inquiry and are never shared with third parties.
              </p>
              <p>
                <b>3. Mobile Sadhana App Privacy:</b> All spiritual practice records, naam-dhyan session timers, alarms, and personal reflection journals created within the Jaigurudev Sadhana mobile application remain 100% stored locally on your device's SQLite database.
              </p>
            </>
          ) : isTerms ? (
            <>
              <p>
                <b>1. Acceptance of Terms:</b> By accessing the Jaigurudev Sanstha website, you agree to observe peaceful and respectful engagement with all published spiritual content, satsang guidelines, and ashram adhesh.
              </p>
              <p>
                <b>2. Intellectual Property & Sacred Materials:</b> All official discourses, ashram adhesh, and audio-visual recordings are published for spiritual elevation and human welfare. Unauthorized commercial exploitation is strictly prohibited.
              </p>
              <p>
                <b>3. Free Participation:</b> Attendance at Jaigurudev public satsangs, langar, and ashram darshan is completely free. No person is authorized to charge any fee for satsang attendance.
              </p>
            </>
          ) : (
            <>
              <p>
                <b>Official Disclaimer:</b> This portal represents the official online informational presence of Jaigurudev Sanstha. All guidelines and instructions are published under the authority of the Ashram management.
              </p>
              <p>
                Devotees are advised to verify satsang schedules and travel guidelines directly from this official portal or by contacting the Mathura Ashram office.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Legal;
