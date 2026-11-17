import React from 'react';
import { Shop } from '../Shop';
import { SEO } from '../../components/common/SEO';

export function Men() {
  return (
    <>
      <SEO
        title="Men's Premium Checkered Shirts | CHEXY HUB"
        description="Everyday classics and effortless confidence. Explore tailored tartans, heavy brushed buffalo overshirts, and breathable summer Madras checks for men."
      />
      <Shop defaultCategory="men" />
    </>
  );
}
