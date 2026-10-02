# Cityrosh — Cybersecurity, Penetration Testing & Server Security

A static website (HTML, CSS, JavaScript) for **Cityrosh**, presenting penetration
testing, hacked site and server cleanup, server hardening, AWS cloud security and
our Cloud Intrusion Detection & Response System project.

No build step. No dependencies. Fonts load from Google Fonts with system fallbacks.

## Files

- `index.html` - the page (includes the Fiverr gigs section, id `gigs`)
- `css/style.css` - all styles
- `js/main.js` - navigation, demo assessment, Fiverr gig cards, contact form

## Updating a Fiverr gig

Each gig is one `<article class="gig">` in `index.html`. Change the link, price,
delivery time or text there. The cover images load from Fiverr's own CDN, so if a
gig's image changes on Fiverr, copy the new image address into that card's `<img src>`.
