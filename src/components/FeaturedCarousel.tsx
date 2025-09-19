import React from 'react';
import { FEATURED } from '../data/featured';

export default function FeaturedCarousel(){
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-1 py-2 scrollbar-none">
        {FEATURED.map(item => (
          <div key={item.id} className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[40%] lg:w-[32%]">
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <img src={item.img} alt={item.name} loading="lazy" className="h-52 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-slate-600">{item.blurb}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
