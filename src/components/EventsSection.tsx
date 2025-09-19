import React from "react";
import { events } from "../data/events";
import EventCard from "./EventCard";

export default function EventsSection() {
  const now = new Date();
  const upcoming = events
    .filter(e => new Date(e.end ?? e.start) >= now)
    .sort((a, b) => +new Date(a.start) - +new Date(b.start))
    .slice(0, 3);

  return (
    <section id="events" className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Upcoming Events in Prince George</h2>
          <p className="text-slate-600 mt-1">Hand-picked happenings around the city.</p>
        </div>
        <a
          href="/events"
          className="hidden md:inline-flex rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
        >
          View all events →
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {upcoming.map(ev => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>

      <div className="mt-6 md:hidden">
        <a
          href="/events"
          className="inline-flex w-full justify-center rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
        >
          View all events
        </a>
      </div>
    </section>
  );
}
