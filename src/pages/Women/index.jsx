import React from 'react';
import { Shop } from '../Shop';
import { SEO } from '../../components/common/SEO';

export function Women() {
  return (
    <>
      <SEO
        title="Women's Checkered Studio | CHEXY HUB"
        description="Modern patterns and timeless elegance. Discover oversized boyfriend checks, cropped pastel ginghams, and flowing Nordic windowpane tunics."
      />
      <Shop defaultCategory="women" />
    </>
  );
}
