import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
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
    <>
      <SEO
        title="Contact Customer Support & Concierge | CHEXY HUB"
        description="Reach out to CHEXY HUB customer care for order assistance, size advice, or bespoke family styling."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
            Always At Your Service
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal dark:text-dark-text">
            Contact Concierge
          </h1>
          <p className="text-xs sm:text-sm text-secondary-gray mt-2">
            Have questions regarding sizing, 3D visualization, or family pack customizations? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-charcoal dark:text-dark-text">
                Direct Channels
              </h2>

              <div className="space-y-5 text-xs text-secondary-gray">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-charcoal dark:text-dark-text block font-semibold text-sm">
                      Email Concierge
                    </strong>
                    <a href="mailto:concierge@chexyhub.com" className="hover:text-terracotta">
                      concierge@chexyhub.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-charcoal dark:text-dark-text block font-semibold text-sm">
                      Phone & WhatsApp
                    </strong>
                    <p>+91 (022) 8800 2400</p>
                    <p className="text-[11px] text-stone-400">Toll-free across India</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-charcoal dark:text-dark-text block font-semibold text-sm">
                      Operating Hours
                    </strong>
                    <p>Monday – Saturday: 9:00 AM – 8:00 PM IST</p>
                    <p>Sunday: 10:00 AM – 5:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-charcoal dark:text-dark-text block font-semibold text-sm">
                      Design Studio & HQ
                    </strong>
                    <p>Level 8, The Fashion Atelier, Lower Parel</p>
                    <p>Mumbai, Maharashtra 400013, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 shadow-md">
              <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-dark-text mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs text-secondary-gray mb-6">
                Fill out the form below and an atelier stylist will connect with you.
              </p>

              {isSent ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <h3 className="font-serif text-lg font-bold text-emerald-800 dark:text-emerald-400">
                    Message Dispatched
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Thank you, {formData.name}. We have logged your inquiry and will contact you via {formData.email}.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setFormData({ name: '', email: '', subject: 'Order Inquiry', message: '' });
                    }}
                    className="text-xs font-semibold text-terracotta hover:underline mt-2 inline-block"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Aarav Mehta"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                    >
                      <option value="Order Inquiry">Order Inquiry / Tracking Status</option>
                      <option value="Size Consultation">Size & Fit Consultation</option>
                      <option value="Family Bundle">Matching Family Custom Bundle</option>
                      <option value="Return Exchange">Exchange or Doorstep Return</option>
                      <option value="Wholesale">Corporate / Wedding Bulk Gifting</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>Send Message to Concierge</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
