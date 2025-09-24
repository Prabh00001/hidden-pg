import React from 'react';
import { Gem } from '../types';
import GemCard from './GemCard';

export default function GemGrid({ items }:{ items: Gem[] }){
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
      {items.map(g => (
        <GemCard key={g.id} gem={g} />
      ))}
    </div>
  );
}
