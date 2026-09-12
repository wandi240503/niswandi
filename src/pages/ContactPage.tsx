import React, { useState } from 'react';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, GithubIcon } from '../components/SocialIcons';
import { SuccessModal } from '../components/SuccessModal';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['UI/UX Design']);
  const [selectedBudget, setSelectedBudget] = useState('$1,500 – $3,500');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const servicesList = [
    'UI/UX Design',
    'Website',
    'Development',
    'Branding',
    'Other'
  ];

  const budgetOptions = [
    '< $500',
    '$500 – $1,500',
    '$1,500 – $3,500',
    '$3,500+'
  ];

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      setSelectedServices(selectedServices.filter((s) => s !== svc));
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
      // Reset form
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="text-xs font-mono tracking-widest text-lime uppercase">
            CONTACT
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white dark:text-white light:text-gray-900 leading-tight">
            LET'S WORK TOGETHER<span className="text-lime">.</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
            Have a project, idea, or collaboration in mind? I'd love to hear about it.
          </p>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Area */}
          <div className="lg:col-span-7 rounded-3xl bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 p-8 sm:p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 text-white dark:text-white light:text-gray-900 placeholder-gray-500 focus:outline-none focus:border-lime text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 text-white dark:text-white light:text-gray-900 placeholder-gray-500 focus:outline-none focus:border-lime text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your Company"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 text-white dark:text-white light:text-gray-900 placeholder-gray-500 focus:outline-none focus:border-lime text-sm transition-colors"
                />
              </div>

              {/* What do you need? */}
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
                  What do you need?
                </label>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map((svc) => {
                    const isSelected = selectedServices.includes(svc);
                    return (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => toggleService(svc)}
                        className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                          isSelected
                            ? 'bg-lime text-black font-bold shadow-[0_0_12px_rgba(198,242,33,0.3)]'
                            : 'bg-white/5 dark:bg-white/5 light:bg-gray-100 border border-white/10 dark:border-white/10 light:border-gray-200 text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-white'
                        }`}
                      >
                        {svc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
                  Budget
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((budget) => {
                    const isSelected = selectedBudget === budget;
                    return (
                      <button
                        type="button"
                        key={budget}
                        onClick={() => setSelectedBudget(budget)}
                        className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                          isSelected
                            ? 'bg-lime text-black font-bold shadow-[0_0_12px_rgba(198,242,33,0.3)]'
                            : 'bg-white/5 dark:bg-white/5 light:bg-gray-100 border border-white/10 dark:border-white/10 light:border-gray-200 text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-white'
                        }`}
                      >
                        {budget}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                  Tell me about your project
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 text-white dark:text-white light:text-gray-900 placeholder-gray-500 focus:outline-none focus:border-lime text-sm transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-3.5 rounded-full bg-lime text-black font-bold text-sm hover:bg-lime-hover shadow-[0_0_20px_rgba(198,242,33,0.35)] transition-all disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Direct Contact Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 p-8 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold font-display text-white dark:text-white light:text-gray-900 mb-2">
                  Get in touch
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600">
                  You can also reach me directly through the following channels:
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="mailto:muhniswandii@gmail.com"
                  className="flex items-center space-x-3 p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-lime/40 text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-all group"
                >
                  <Mail className="w-4 h-4 text-lime" />
                  <span>muhniswandii@gmail.com</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/niswandii/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-lime/40 text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-all group"
                >
                  <LinkedinIcon className="w-4 h-4 text-lime" />
                  <span>linkedin.com/in/niswandii</span>
                </a>

                <a
                  href="https://instagram.com/niswandi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-lime/40 text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-all group"
                >
                  <InstagramIcon className="w-4 h-4 text-lime" />
                  <span>instagram.com/niswandi</span>
                </a>

                <a
                  href="https://github.com/wandi240503"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-lime/40 text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-all group"
                >
                  <GithubIcon className="w-4 h-4 text-lime" />
                  <span>github.com/wandi240503</span>
                </a>
              </div>
            </div>

            {/* Location Badge */}
            <div className="rounded-3xl bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 p-8 shadow-xl flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 flex items-center justify-center text-lime">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-gray-500 uppercase block">Based in</span>
                <span className="text-lg font-bold text-white dark:text-white light:text-gray-900 font-display">Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};
