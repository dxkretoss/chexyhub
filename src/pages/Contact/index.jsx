import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Order Inquiry',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please complete all message fields.');
      return;
    }
    setIsSent(true);
    toast.success('Your message has been received! Our concierge will reply within 24 hours.');
  };

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="Contact Concierge & Client Advisory | CHEXY HUB"
        description="Reach out to CHEXY HUB client advisors for order assistance, sizing guidance, or bespoke family styling."
      />

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 max-w-[1400px] mx-auto w-full">
        {/* Editorial Header */}
        <div className="pb-6 sm:pb-8 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">
            <span>CLIENT RELATIONS</span>
            <span>•</span>
            <span>ATELIER CONCIERGE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black dark:text-white">
            CONTACT THE LABEL
          </h1>
          <p className="text-xs sm:text-sm font-light text-stone-600 dark:text-stone-400 max-w-2xl mt-3 leading-relaxed">
            Our client advisors are at your service for personal check styling, sizing recommendations,
            custom family collection sets, and order fulfillment tracking.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-8 sm:pt-10 items-start">
          {/* Direct Atelier Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-6">
                Direct Channels
              </span>

              <div className="space-y-8 divide-y divide-black/10 dark:divide-white/10">
                <div className="pt-6 first:pt-0 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-black dark:text-white block">
                    Client Concierge Email
                  </span>
                  <a
                    href="mailto:concierge@chexyhub.com"
                    className="text-xs text-stone-600 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors block"
                  >
                    concierge@chexyhub.com
                  </a>
                  <span className="text-[11px] text-stone-400 block">
                    Response timeline: within 24 working hours
                  </span>
                </div>

                <div className="pt-6 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-black dark:text-white block">
                    Direct Telephone & WhatsApp
                  </span>
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    +91 (022) 8800 2400
                  </p>
                  <span className="text-[11px] text-stone-400 block">
                    Monday to Saturday • 09:00 to 20:00 IST
                  </span>
                </div>

                <div className="pt-6 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-black dark:text-white block">
                    Design Atelier & Showroom
                  </span>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    Level 8, The Fashion Atelier, Lower Parel<br />
                    Mumbai, Maharashtra 400013, India
                  </p>
                  <span className="text-[11px] text-stone-400 block">
                    Private viewings by prior appointment
                  </span>
                </div>

                <div className="pt-6 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-black dark:text-white block">
                    Press & Editorial Partnerships
                  </span>
                  <a
                    href="mailto:press@chexyhub.com"
                    className="text-xs text-stone-600 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors block"
                  >
                    press@chexyhub.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Minimalist Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#121212] p-8 sm:p-12 border border-black/10 dark:border-white/10 shadow-sm">
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-2">
                Inquiry Transmission
              </span>
              <h2 className="font-serif text-2xl font-normal text-black dark:text-white">
                SEND A DIRECT MESSAGE
              </h2>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full border border-black dark:border-white flex items-center justify-center text-black dark:text-white">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-normal text-black dark:text-white">
                  MESSAGE DISPATCHED
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.name}. Your inquiry has been forwarded to our client advisory desk.
                  A senior consultant will follow up via {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setFormData({ name: '', email: '', subject: 'Order Inquiry', message: '' });
                  }}
                  className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.2em] underline underline-offset-4 hover:opacity-70 transition-opacity"
                >
                  Send Another Inquiry →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="ENTER YOUR FULL NAME"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-3 text-xs uppercase tracking-wider text-black dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="NAME@EXAMPLE.COM"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-3 text-xs uppercase tracking-wider text-black dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                    Subject of Inquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-3 text-xs uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  >
                    <option value="Order Inquiry" className="bg-white dark:bg-black">Order Inquiry & Delivery Status</option>
                    <option value="Size Consultation" className="bg-white dark:bg-black">Size & Fit Advisory</option>
                    <option value="Family Bundle" className="bg-white dark:bg-black">Matching Family Check Sets</option>
                    <option value="Return Exchange" className="bg-white dark:bg-black">Exchange & Doorstep Return</option>
                    <option value="Wholesale" className="bg-white dark:bg-black">Editorial, VIP & Corporate Bulk</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="PROVIDE DETAILS OF YOUR REQUEST..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-3 text-xs uppercase tracking-wider text-black dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-black dark:bg-white text-white dark:text-black text-[11px] font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-80 flex items-center justify-center gap-2"
                >
                  <span>Transmit Message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
