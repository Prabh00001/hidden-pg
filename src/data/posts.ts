export type Post = {
  slug: string;
  title: string;
  description: string;
  dateISO: string;
  readTimeMin: number;
  author: string;
  tags: string[];
  hero?: string;
  html: string; // rendered with dangerouslySetInnerHTML
  faq?: { q: string; a: string }[];
};

const TRAILS_POST_SLUG = "5-easy-trails-prince-george";

const TRAILS_POST_HTML = `
<article class="max-w-none">

    <p><strong>New to Prince George or just craving a low-effort walk with big vibes?</strong> Here are five easy trails locals love—zero gatekeeping, just the good stuff. Each pick works for a chill evening stroll, a weekend reset, or a no-sweat intro to PG’s outdoors.</p>

    <p class="mt-6">Heads-up: conditions change with weather and seasons. Pack water, tell someone where you’re going, and give wildlife space. 🐻</p>

    <h2 id="cottonwood" class="mt-10 text-2xl font-bold"> 1) Cottonwood Island Nature Park (2.2 km, flat) <div class="blog-media">
  

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2349.4934044229853!2d-122.7324674233284!3d53.92297757246213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x538898edaf0dd575%3A0xac1591273c318b07!2sCottonwood%20Island%20Nature%20Park!5e0!3m2!1sen!2sca!4v1757186228796!5m2!1sen!2sca" width="680" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div> </h2>
    
    <p>Riverside, mellow, and photogenic. This is the downtown-adjacent walk for “I just want some air.” Look for the hidden tree-carvings and the views where the Nechako meets the Fraser. Great for families and visitors, and it pairs perfectly with a coffee downtown.</p>
    <ul class="list-disc pl-6">
      <li><em>Distance & grade:</em> ~2.2 km loop, under 10 m elevation—very flat.</li>
      <li><em>Best for:</em> after-work walks, first-time visitors, easy photo ops.</li>
      <li><em>Parking:</em> Park by the railway bridge access or the main lot; follow the signed loop.</li>
      <li><em>Internal picks:</em> After your walk, explore our <a href="/#gems">Gem Cards</a>. Locals love pairing this trail with nearby cafés—<a href="/#gems-cafes">see our café picks</a>.</li>
    </ul>

    <h2 class="mt-10 text-2xl font-bold"> 2) Forests for the World – Shane Lake Loop (easy, choose your length) <div class="blog-media"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2351.0338228431883!2d-122.83445752333019!3d53.895602772453756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53889bc1a3a3261d%3A0xaf80406ed49fafc!2sForests%20for%20the%20World!5e0!3m2!1sen!2sca!4v1757196378558!5m2!1sen!2sca" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div> </h2>
    <p>The city’s classic green escape. Well-signed paths weave through mixed forest to Shane Lake, and you can keep it short or extend as your energy allows. Benches, birds, and plenty of shade in summer.</p>
    <ul class="list-disc pl-6">
      <li><em>Route vibe:</em> gentle grades; you choose short lake loops or longer connectors.</li>
      <li><em>Best for:</em> beginners who still want that “I was really in the woods” feeling.</li>
      <li><em>Parking:</em> Multiple access points; the Shane Lake lot is the simplest.</li>
      <li><em>Pro tip:</em> Bring a small snack, sit at the lake, and let time slow down.</li>
    </ul>

    <h2 class="mt-10 text-2xl font-bold">3) Moore’s Meadow Nature Park (easy network; do 3–4 km loops)<div class="blog-media"> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13286.107819162306!2d-122.82176920861606!3d53.93753118866907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x538899b8e4b7f197%3A0x2a86d7ab2b692eb5!2sMoore&#39;s%20Meadow%20Nature%20Park!5e0!3m2!1sen!2sca!4v1757196826745!5m2!1sen!2sca" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div></h2>
    <p>Think wide, soft paths and a tucked-away meadow vibe inside the city. You can walk a relaxed inner loop or explore further—locals often do 30–60 minutes and call it a day. Dog-friendly zones exist; check signage.</p>
    <ul class="list-disc pl-6">
      <li><em>Network:</em> Multiple loop options (the full network is quite long, but most people do 3–4 km).</li>
      <li><em>Best for:</em> dog-walks, low-effort cardio, “talk-walks” with a friend.</li>
      <li><em>Access:</em> Several entrances; Foothills side is common.</li>
    </ul>

    <h2 class="mt-10 text-2xl font-bold">4) Hudson’s Bay Wetland Nature Park (≈1.8 km boardwalks & viewpoints)<div class="blog-media"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9403.325255021637!2d-122.74392339311619!3d53.899202109069805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5388990054429735%3A0x931fb21292520f4d!2sHudson%20Bay%20Wetland%20Nature%20Park!5e0!3m2!1sen!2sca!4v1757197004508!5m2!1sen!2sca" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></h2>
    <p>Birdsong, water views, and interpretive signs just minutes from downtown. Short, scenic, and snackable—you’ll be surprised how fast you feel away from the city. Observation platforms make this great for kids and new arrivals.</p>
    <ul class="list-disc pl-6">
      <li><em>Length:</em> about 1.8 km of trail; expect short rises and weather-dependent footing.</li>
      <li><em>Best for:</em> nature-spotting with minimal effort; sunrise/sunset strolls.</li>
      <li><em>Bonus:</em> Combine with Lheidli T’enneh Memorial Park time afterwards.</li>
    </ul>

    <h2 class="mt-10 text-2xl font-bold">5) Ferguson Lake Nature Reserve (≈3.5 km loop, mostly flat)<div class="blog-media"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53057.934301994035!2d-122.82148935039385!3d54.00541012470878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x538897007d58274b%3A0x123850ec5579c7e!2sFerguson%20Lake%20Nature%20Preserve!5e0!3m2!1sen!2sca!4v1757197083539!5m2!1sen!2sca" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></h2>
    <p>Boardwalks, quiet water, and a loop that just feels good. A favorite “reset” walk for locals when you want the calm of a small lake without the drive.</p>
    <ul class="list-disc pl-6">
      <li><em>Distance:</em> roughly 3.5 km loop; allow ~1 hour if you’re strolling.</li>
      <li><em>Best for:</em> peaceful loops, birdwatching, and all-levels outings.</li>
      <li><em>Look for:</em> historical homesteader remnants along parts of the loop.</li>
    </ul>

    <h3 class="mt-12 text-xl font-semibold">Bonus if you want a tiny challenge</h3>
    <p><strong>L.C. Gunn Park</strong> gives you Fraser River viewpoints along bluff-top singletrack. It’s rated more “moderate” (some steeper sections and roots), but still a short urban adventure. Save this for when you’re feeling a bit spicy.</p>

    <hr class="my-10 border-slate-600" />

    <h2 class="text-2xl font-bold">When to go & local etiquette</h2>
    <ul class="list-disc pl-6">
      <li><em>Best months:</em> Spring–fall are the easiest. Winter is gorgeous but use traction if it’s icy.</li>
      <li><em>Wildlife:</em> This is BC—be bear-aware, keep dogs controlled, and give moose and cubs space.</li>
      <li><em>Leave No Trace:</em> Stay on trails, pack out snacks, and skip feeding wildlife.</li>
    </ul>

    

  </article>
`;

    // === Free Things to Do in Prince George (new post) ===
    const FREE_POST_SLUG = "free-things-to-do-in-prince-george";
    const FREE_POST_HTML = `
    <figure class="my-4">
  <img src="/og-hero.jpg" alt="Prince George riverside trail and skyline" style="width:100%;height:auto;border-radius:12px;">
  <figcaption style="font-size:14px;color:#64748b;margin-top:.5rem;">A free day starts here — river, trails, and a plan.</figcaption>
</figure>

<p>Prince George proves a simple truth: <strong>you don’t need a big budget to feel alive</strong>. Between river-cut trails, community art, and seasonal festivals, the city rewards curiosity. This is a local-first guide with <strong>practical picks you can do today</strong>, even on a quick lunch break. And yes — <strong>it’s all free</strong>.</p>

<h2>1) LC Gunn Park Trails (ridges, river, city views)</h2>
<p>A narrow ridge trail that tracks the Fraser River with <strong>calming forest on one side and PG’s skyline on the other</strong>.</p>
<p><em>Personal note:</em> Walking LC Gunn, you catch a <strong>clean view across to Lheidli T’enneh Memorial Park and downtown</strong> — it’s one of those places where the city and river feel like a single frame.</p>
<p class="text-sm text-slate-500">Trail is narrow in spots with side slopes; watch footing if it’s wet or icy.</p>


<h2>2) Cottonwood Island Nature Park (tree carvings, <em>and</em> Roxy the rock snake)</h2>
<p>Follow the river and <strong>scan the carved cottonwoods</strong> — faces, animals, patterns cut into the trunks. It’s playful, reflective, and <strong>strangely grounding</strong>.</p>
<p><em>Personal note:</em> On recent walks I’ve started “checking in” on <strong>Roxy the rock snake</strong> — a community-built line of painted rocks that keeps growing along the path. It’s simple and wholesome: kids add a few stones, someone paints eyes on a new “head,” and the whole thing becomes a living marker of how many small moments pass through this park.</p>
<p class="text-sm text-slate-500">Roxy is a community project at Cottonwood that locals keep adding to; it’s even inspired decals and community fundraisers over time. </p>

<h2>3) Lheidli T’enneh Memorial Park (big green heart of PG)</h2>
<p>Picnic lawns, riverbank seats, casual strolls — <strong>this is where PG breathes</strong>. On event days, it turns into a community magnet; on quiet days, it’s just <strong>you, trees, and wind</strong>.</p>
<p><strong>Do this:</strong> Park near the bandshell, walk the river edge for 10 minutes, then sit and do nothing for two. You’ll actually hear the city exhale.</p>


<h2>4) Connaught Hill Park (panoramic overlook)</h2>
<p>Drive or walk up and get <strong>a 360° sense of the city</strong>: roads, rooftops, rivers. It’s the kind of view that makes you re-choose the rest of your day.</p>
<p><strong>Golden-hour tip:</strong> If you’re after a quick city photo, this is the “no setup, instant result” spot. Sunrise is calmer; sunset is warmer.</p>


<h2>5) Downtown Murals & Street Art (self-guided mini-gallery)</h2>
<p>PG’s downtown walls are a <strong>free open-air gallery</strong>. Stroll a few blocks and you’ll stack colour, story, and local personality into your afternoon without trying.</p>
<p>Start at 3rd &amp; Quebec and wander two or three blocks each way — you’ll catch a rotation of murals and heritage markers. If you’re in a “learn while you walk” mood, use a <strong>self-guided heritage tour map</strong> to stitch a loop that blends art with history.</p>
<p class="text-sm text-slate-500">Downtown PG maintains walking resources; the library has heritage walking tour PDFs that pair nicely with the murals. </p>

<h2>6) PG Public Library (focus, curiosity, quiet wins)</h2>
<p>Libraries are still <strong>the best productivity hack</strong>. Grab a corner, deep-read for 25 minutes, or browse local history to see how the city became itself.</p>
<p><strong>Micro-focus ritual:</strong> 25-minute read, 5-minute stretch, repeat once. If you only do this, the day already “won.”</p>

<h2>7) PG Farmers’ Market (Saturdays — browse is free)</h2>
<p>Year-round Saturdays (outdoor in summer, indoor in winter) — <strong>8:30am to 2pm</strong> downtown around <strong>3rd Ave &amp; Quebec</strong>. Vendors rotate with the seasons: <strong>local veggies</strong>, <strong>raw honey</strong>, preserves, baked goods, handmade soaps, beadwork, small-batch coffee, and more.</p>
<p><em>Small joy:</em> I like doing one slow lap just to talk to makers, then a second “decide” lap. On busy summer Saturdays the cluster of markets spills onto nearby blocks, and parts of the street feel like an <strong>open-air promenade</strong> — it’s the best way to <strong>feel downtown</strong> without spending much.</p>
<p class="text-sm text-slate-500">Details: Year-round Saturdays, typically 8:30–2:00, centered at 3rd Ave &amp; Quebec; check the market’s own updates for seasonal layouts and street use when the outdoor season is in full swing.</p>


<h2>8) Free Community Festivals (seasonal energy)</h2>
<p>From winter gatherings to summer celebrations, <strong>PG knows how to show up for its own</strong>. Music, food trucks, pop-up stalls — the mood alone is worth the trip.</p>

<h2>9) Northern Lights (when the sky says yes)</h2>
<p>On clear, cold nights, a short drive outside light glow can pay off. You might get a faint ribbon or a full curtain — either way, it’s a reminder: <strong>nature still owns the stage</strong>.</p>

<h2>10) Ancient Forest / Chun T’oh Whudujut (boardwalk through time)</h2>
<p>Old-growth cedars, an elevated boardwalk, and air that feels different. <strong>It’s a free masterclass in perspective</strong> — quiet, massive, and generous. (Check park advisories before you go.)</p>
<p class="text-sm text-slate-500">Accessibility: a <strong>450m Universal Access boardwalk</strong> allows most visitors — including wheelchair users — to experience the inland temperate rainforest; the full boardwalk is ~2.3 km. </p>
<hr class="my-10 border-t border-slate-200/70" />


<p class="mt-6"><strong>Prince George is proof adventure doesn’t need to be expensive</strong> — just intentional. Know a free gem we missed? <a href="/contact">Suggest it</a> and we’ll keep this list growing.</p>
    `;

export const posts: Post[] = [

{
  slug: FREE_POST_SLUG,
  title: "10 Best Free Things to Do in Prince George",
  description: "Discover 10 free things to do in Prince George — from riverside trails and murals to markets and night-sky views. Local tips + personal notes inside.",
  dateISO: "2025-09-15",
  readTimeMin: 7,
  author: "",
  tags: ["Prince George", "Free", "Local Guide"],
  hero: "",
  html: FREE_POST_HTML,
},
{
    slug: TRAILS_POST_SLUG,
    title: "5 Easy Trails Near Prince George You’ll Love",
    description:
      "Five low-effort, high-reward walks in and around PG—perfect for newcomers, residents, and mellow weekend plans.",
    dateISO: "2025-09-05",
    readTimeMin: 9,
    author: "",
    tags: ["Outdoors", "Trails", "PG Basics"],
    hero: "/og-hero.jpg",
    html: TRAILS_POST_HTML,
    faq: [
      {
        q: "Are these trails dog-friendly?",
        a: "Most are, but always check trailhead signage. Keep dogs leashed where required; Ginter’s Meadow (nearby to UNBC Connector) has off-leash zones.",
      },
      {
        q: "Can I do these in winter?",
        a: "Yes, but ice happens—microspikes help. Daylight is short; carry a light if you’ll be out late.",
      },
      {
        q: "Which one is best for visitors with limited time?",
        a: "Cottonwood Island (close to downtown) or Hudson’s Bay Wetland for a super quick nature hit.",
      },
      {
        q: "Stroller-friendly options?",
        a: "Cottonwood Island and parts of Hudson’s Bay Wetland are the smoothest, but conditions vary with weather.",
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
