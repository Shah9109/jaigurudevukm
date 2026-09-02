import React from 'react';
import { Sparkles, BookOpen, Heart, Eye, Sunrise, Flame } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';

export const Teachings = () => {
  return (
    <div className="min-h-screen py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionTitle
          hindiSubtitle="संत मत एवं आत्म-ज्ञान"
          title="Spiritual Teachings & Philosophy"
          subtitle="The eternal wisdom of Surat-Shabd Yoga, karma theory, living a pure moral life, and spiritual awakening."
        />

        {/* 4 Deep Teachings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-roseBlush-200 shadow-soft space-y-4">
            <div className="flex items-center gap-3 text-maroon-700">
              <Eye className="w-6 h-6" />
              <h3 className="text-xl font-serif font-bold text-stone-900">1. सुरत-शब्द योग (The Science of Inner Sound & Light)</h3>
            </div>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              संत मत के अनुसार प्रत्येक जीवात्मा के भीतर दिव्य शब्द (अनाहद नाद) निरंतर गूंज रहा है। जब सुरत (चेतना) बाहरी संसार और विकारों से सिमटकर अंतर्मुखी होती है, तब वह अंतर में उस दिव्य प्रकाश और नाद को सुनकर अपने मूल परमपिता परमात्मा में लीन हो जाती है।
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-roseBlush-200 shadow-soft space-y-4">
            <div className="flex items-center gap-3 text-sacredGold-700">
              <Sparkles className="w-6 h-6" />
              <h3 className="text-xl font-serif font-bold text-stone-900">2. कर्म सिद्धांत (Law of Karma & Reincarnation)</h3>
            </div>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              'जैसा बोओगे, वैसा काटोगे' — यह प्रकृति का अटल नियम है। मन, वचन और कर्म से किसी को दुःख न पहुंचाएं। प्राणी हत्या, मांसाहार और अत्याचार भारी कर्म बंधन उत्पन्न करते हैं जिनसे चौरासी लाख योनियों का कष्टकारी चक्र चलता है।
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-roseBlush-200 shadow-soft space-y-4">
            <div className="flex items-center gap-3 text-emerald-700">
              <Heart className="w-6 h-6" />
              <h3 className="text-xl font-serif font-bold text-stone-900">3. पूर्ण संत एवं गुरु की आवश्यकता</h3>
            </div>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              जिस प्रकार सांसारिक विद्या प्राप्त करने के लिए शिक्षक की आवश्यकता होती है, उसी प्रकार अंतर के आध्यात्मिक मार्ग, सुरत-शब्द योग की विधि और साधना की गहराइयों को जानने के लिए एक समर्थ एवं दयालु पूर्ण गुरु का मार्गदर्शन अनिवार्य है।
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-roseBlush-200 shadow-soft space-y-4">
            <div className="flex items-center gap-3 text-amber-700">
              <Sunrise className="w-6 h-6" />
              <h3 className="text-xl font-serif font-bold text-stone-900">4. साधक का नित्य आचरण एवं नियम</h3>
            </div>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              साधक को नित्य प्रातः अमृत वेले उठकर सिमरन-ध्यान करना चाहिए। सत्य बोलना, विनम्रता, क्रोध पर नियंत्रण, ईमानदारी की कमाई से जीवन यापन और दीन-दुखियों की सेवा करना एक सच्चे शिष्य के लक्षण हैं।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachings;
