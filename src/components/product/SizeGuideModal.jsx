import React from 'react';
import { X, Ruler } from 'lucide-react';

export function SizeGuideModal({ product, onClose }) {
  if (!product || !product.sizeGuide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl rounded-3xl glass-megamenu border border-white/80 dark:border-white/10 shadow-2xl p-6 sm:p-8 z-10 animate-fade-in text-charcoal dark:text-dark-text max-h-[85vh] overflow-y-auto no-scrollbar backdrop-blur-3xl">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-6">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-terracotta" />
            <h3 className="font-serif text-xl font-bold">Size & Measurement Guide</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-secondary-gray mb-6 leading-relaxed">
          Measurements are taken with the shirt laid flat. All values are in inches. If you prefer a relaxed or layered fit over a tee, we recommend taking one size up.
        </p>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 mb-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 dark:bg-stone-800/80 font-bold uppercase tracking-wider text-secondary-gray">
              <tr>
                <th className="p-3">Size</th>
                <th className="p-3">Chest</th>
                <th className="p-3">Length</th>
                <th className="p-3">Shoulder</th>
                <th className="p-3">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800 font-medium">
              {product.sizeGuide.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                  <td className="p-3 font-bold text-terracotta">{row.size}</td>
                  <td className="p-3">{row.chest}</td>
                  <td className="p-3">{row.length}</td>
                  <td className="p-3">{row.shoulder}</td>
                  <td className="p-3">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to measure tips */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 text-xs space-y-2">
          <h4 className="font-bold text-charcoal dark:text-dark-text">How to measure:</h4>
          <p className="text-secondary-gray">
            <strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal under your arms.
          </p>
          <p className="text-secondary-gray">
            <strong>Length:</strong> Measured from the highest point of the shoulder down to the bottom hem.
          </p>
          <p className="text-secondary-gray">
            <strong>Shoulder:</strong> Measured across the back from shoulder seam to shoulder seam.
          </p>
        </div>
      </div>
    </div>
  );
}
