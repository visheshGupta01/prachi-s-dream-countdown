# Prachi's Dream Countdown

Create a stunning, romantic, highly animated birthday countdown website for my girlfriend's birthday on 13 September 2026.

For now, keep the website minimal in content. Do NOT add love letters, long romantic messages, memory stories, “things I love about you,” or other written sections. I will add all personal content later.

The main goal is to create an extremely beautiful visual countdown experience with photos, animations, colors, particles, and premium UI.

Main Countdown

The centerpiece of the website should be a large live countdown to:

13 September 2026 — 12:00 AM IST (Asia/Kolkata)

Display:

DAYS : HOURS : MINUTES : SECONDS

Make the countdown large, elegant, and immediately visible.

Use four beautiful glassmorphism countdown cards with:

Large animated numbers

DAYS / HOURS / MINUTES / SECONDS labels

Frosted glass effect

Soft pink/purple glow

Animated borders

Subtle reflections

Floating effect

Smooth number transitions

Premium shadows

Whenever a number changes, animate it smoothly instead of instantly replacing it.

The countdown must use Asia/Kolkata timezone so it reaches zero exactly at midnight IST on 13 September 2026 regardless of the visitor's device timezone.

Visual Style

Create a dreamy romantic night aesthetic.

Use a sophisticated combination of:

Midnight blue

Deep purple

Lavender

Rose pink

Soft pink

Peach

Small golden highlights

White glowing elements

Do NOT make the entire website bright pink.

The background should have a rich animated gradient that slowly changes over time.

Add large blurred gradient orbs moving very slowly in the background to create depth.

The overall design should feel:

dreamy + romantic + magical + premium + modern

It should NOT look childish or like a generic birthday template.

Animated Background

Create a beautiful fullscreen animated background behind the countdown.

Include:

Tiny twinkling stars

Floating glowing particles

Small sparkles

Soft bokeh lights

Very subtle floating hearts

Occasional shooting stars

Slowly moving gradient clouds

Light grain/noise texture

Atmospheric glow

Particles should move at different speeds to create depth.

Some particles should be blurred while others remain sharp.

Keep everything elegant and subtle rather than overwhelming.

Main Photo

Place one large beautiful photo area behind or near the countdown.

For now use a placeholder image that I can easily replace later with a photo of my girlfriend.

The image should NOT simply appear as a rectangular image.

Present it beautifully using:

Soft gradient masking

Blurred edges

Glow

Subtle parallax

Light reflections

Floating particles around it

Blend the photograph naturally into the background.

On desktop, create a cinematic composition with the countdown on one side and the photograph on the other.

On mobile, place the photograph elegantly above or behind the countdown.

Floating Photos

Add approximately 5–7 placeholder photographs around the page.

I will replace them with our actual photos later.

Present them as elegant floating photo cards / Polaroids.

Some should be slightly rotated.

Use different sizes to avoid making the layout feel like a normal gallery.

Photos should slowly float vertically.

Add subtle parallax based on mouse movement on desktop and scrolling on mobile.

On hover:

Move slightly upward

Rotate slightly

Scale slightly

Increase glow

On tap/mobile, trigger a similar animation.

Do NOT add captions or messages to the photos yet.

Photo Gallery

Below the main countdown, create a simple but visually impressive photo section.

No headings or messages are necessary.

Use placeholder photos in a creative layout:

Polaroids

Film-strip elements

Overlapping images

Floating cards

Scrapbook-style positioning

When a photo enters the viewport, animate it into position.

Use staggered animations so photographs appear one after another.

Clicking/tapping a photograph should open it in a beautiful fullscreen lightbox.

The transition should smoothly expand the selected photo into the center.

Mouse / Touch Interactions

On desktop, create a subtle custom cursor effect.

The cursor can have a soft glowing circle.

Occasionally generate tiny sparkles or hearts behind the cursor.

Do NOT generate particles continuously because it could become distracting.

When the user clicks somewhere, create a tiny burst of:

♡
✦
✨

that fades away quickly.

On mobile, tapping empty decorative areas can create the same subtle effect.

Countdown Animations

Make the countdown feel alive.

The numbers should have smooth transitions.

Add a subtle glow pulse every few seconds.

The separator : can softly pulse.

Occasionally allow a tiny sparkle to travel across the countdown cards.

When seconds change, use a smooth vertical flip/slide animation.

Avoid excessive bouncing animations.

Everything should feel smooth and premium.

Scroll Experience

The website can extend vertically so users can scroll through the floating photos.

Use smooth scrolling.

As the user scrolls:

Photos move at slightly different speeds

Background gradients shift subtly

Stars move slowly

Images fade/scale into view

Some Polaroids rotate into position

Particles continue moving

Background lighting changes slightly

Create a cinematic parallax effect.

At certain points, allow large blurred photographs to briefly appear in the background at very low opacity.

Birthday Mode

When the countdown reaches:

00 DAYS : 00 HOURS : 00 MINUTES : 00 SECONDS

trigger a special visual celebration.

Do NOT add birthday messages yet.

Instead transform the screen visually.

Trigger:

Beautiful confetti

Heart particles

Sparkles

Balloons

Fireworks in the background

Glowing stars

Colorful light bursts

The countdown can disappear with a smooth animation.

The photo area should become brighter and more colorful.

Keep the birthday state ready for me to add custom text/messages later.

Page Loading Animation

Create a premium loading transition.

When the website loads:

Start with a dark screen.

Small stars slowly appear.

Background gradient begins glowing.

Main photograph fades in.

Countdown cards rise into view one after another.

Particles begin moving.

Keep the introduction relatively short — approximately 2–3 seconds.

Do NOT require the visitor to press an “Enter” button.

The countdown should automatically appear.

Responsive Design

This website will primarily be viewed on a phone, so mobile design is extremely important.

On mobile:

Countdown should fit perfectly on screen.

Use a 2×2 countdown card layout if four cards in one row become too small.

Main photo should remain visually prominent.

Floating photos should not cover the countdown.

Animations should remain smooth.

Reduce particle density for performance.

Disable expensive mouse-specific effects.

Ensure there is no horizontal overflow.

Desktop should feel cinematic, while mobile should feel intimate and immersive.

Performance

Despite having many animations, keep the website smooth.

Target 60 FPS animations where possible.

Use GPU-friendly CSS transforms.

Avoid excessive DOM particles.

Reduce effects automatically on weaker/mobile devices.

Respect prefers-reduced-motion.

Optimize all images.

Use lazy loading for photographs outside the initial viewport.

Technical Stack

Build using:

React / Next.js

Tailwind CSS

Framer Motion

Use Canvas/CSS or a lightweight library for particles and confetti.

Keep the architecture simple.

Create reusable components such as:

Countdown

CountdownCard

AnimatedBackground

ParticleField

FloatingPhoto

PhotoGallery

Lightbox

BirthdayCelebration

IMPORTANT — EASY CUSTOMIZATION

Create a single configuration file such as:

config.ts

Put all customizable information there.

For example:

birthdayDate

timezone

mainPhoto

galleryPhotos

backgroundMusic

Do not hardcode photo URLs throughout different components.

Create something like:

galleryPhotos = [
"/photos/photo1.jpg",
"/photos/photo2.jpg",
"/photos/photo3.jpg",
"/photos/photo4.jpg",
"/photos/photo5.jpg",
"/photos/photo6.jpg"
]

Create a /public/photos/ folder so I can simply replace the placeholder images later without changing the layout.

Use beautiful placeholder images for now.

Final Design Direction

The first screen should immediately create a WOW effect.

The visitor should see:

beautiful photograph

huge elegant countdown

dreamy animated background

floating particles/stars

subtle floating photographs

The design should feel like a premium interactive romantic website, not a normal countdown timer.

Keep written content extremely minimal.

Do NOT invent personal messages.

Do NOT invent names.

Do NOT add fake memories.

Do NOT add relationship quotes.

Focus entirely on:

COUNTDOWN + PHOTOS + COLORS + ANIMATIONS + ATMOSPHERE

Leave the architecture ready so I can add personal messages, memories, music, and birthday surprises later. Her name is Prachi and birthday is on 13 sep 2026

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/83471ddb-619e-4ee0-b7e6-7df1cc0b2cb1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
