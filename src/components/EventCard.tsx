import React from "react";
import { EventItem } from "../types/event";

function toGCalDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

function googleCalendarLink(e: EventItem) {
  const start = toGCalDate(e.start);
  const end = toGCalDate(e.end ?? e.start);
  const details = encodeURIComponent(e.description ?? "");
  const text = encodeURIComponent(e.title);
  const location = encodeURIComponent(e.address ? `${e.location}, ${e.address}` : e.location);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}&sprop=name:Hidden%20PG`;
}

const fmt = new Intl.DateTimeFormat(undefined, {
  weekday: "short", month: "short", day: "numeric",
  hour: "numeric", minute: "2-digit"
});

export default function EventCard({ event }: { event: EventItem }) {
  const start = new Date(event.start);
  const end = event.end ? new Date(event.end) : undefined;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition overflow-hidden">
      {event.image && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium text-slate-700">
            {fmt.format(start)} {end ? `– ${fmt.format(end)}` : ""}
          </span>
          {event.price && (
            <span className="text-xs font-semibold text-emerald-700">
              {event.price}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold leading-snug">
          {event.title}
        </h3>

        <p className="text-sm text-slate-600 line-clamp-3">
          {event.description}
        </p>

        <div className="mt-1 text-sm text-slate-700">
          📍 {event.location}
        </div>

        <div className="mt-3 flex gap-2">
          <a
            href={googleCalendarLink(event)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1.5 text-white text-sm hover:bg-emerald-700"
          >
            Add to Calendar
          </a>
          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              Tickets / Info
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
