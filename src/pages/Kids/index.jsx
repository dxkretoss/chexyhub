import React from 'react';
import { Shop } from '../Shop';
import { SEO } from '../../components/common/SEO';

export function Kids() {
  return (
    <>
      <SEO
        title="Kids & Juniors Checkered Collection | CHEXY HUB"
        description="Little styles, big personalities. 100% organic cotton, snap closures, and durable check shirts crafted for playtime."
      />
      <Shop defaultCategory="kids" />
    </>
  );
}
