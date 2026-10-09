# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Residential homeowners in Montclair, California and surrounding communities who are considering work on their yard, from a refresh to a full landscape, hardscape, or concrete project. They arrive evaluating whether this company can be trusted with their property and whether it can produce something they would be proud of.

## Product Purpose
The marketing site for Bustos Landscaping. It introduces the company, its services, and its process, and turns interested homeowners into estimate requests by phone, email, or the contact page. Success is a visitor who can picture what the company could do for their own yard and reaches out.

## Positioning
A family-owned business run by two brothers who took over their father's landscaping business in 2011, born and raised in Michoacán, Mexico, carrying it on as a family legacy. One crew covers the whole outdoor project: landscape design and installation, lawn care, concrete, pavers and hardscaping, irrigation and turf, excavation and demolition.

## Operating Context
Visitors browse on phones and desktops, often while looking at their own yard. The conversion paths are a phone call ((909) 455-7980 or (928) 503-6277), email (bustoslandscaping@gmail.com), and the /contact page. Hours: Monday–Friday, 7am–9pm.

## Capabilities and Constraints
- Next.js (App Router) + GSAP ScrollTrigger + Tailwind 4 + lucide-react; local preview only, not deployed, indexing blocked.
- Services: general landscaping, landscape design, yard cleanups, mulch, rock installation; lawn mowing and maintenance, tree and bush trimming; concrete installation and demolition; pavers, block and retaining walls; irrigation, sprinkler repair, sod and artificial turf; excavation, grading, demolition, site preparation.
- Service area beyond Montclair is confirmed by phone; no fixed radius is published.

## Brand Commitments
- Name: Bustos Landscaping. The official logo is the black-and-green BL monogram with the wordmark "BUSTOS LANDSCAPE". It lives in `public/assets/brand/`; the best master available is an 875px PNG from the owner's old site, and no vector master exists yet. On dark surfaces the logo sits on an ivory panel and is never recoloured.
- The family story text in `src/lib/data.ts` is the owners' own words and is reproduced exactly.

## Evidence on Hand
- Owner-authorised real project photography, reused from the owner's original website (bustoslandscaping.net), is in `public/assets/work/`. EXIF/GPS has been stripped, some photos are cropped, and visible house numbers are blurred. Captions describe only what is visible; the source filenames are SEO labels, so locations, dates and client details are never claimed.
- `src/lib/projects.ts` groups these photos into projects. Before/after sliders are used only for pairs shot from the same position.
- The homepage hero is a free-license Unsplash scene, labelled on the page as a concept scene and not a Bustos project.
- Verified from the old site: residential and commercial work, and the service-area communities listed on the Contact page.
- Unresolved conflicts, which must not be asserted until confirmed: years of experience (old site says "over 30 years", this site says since 2011); the spelling of the second owner's name ("Jamie" here, "Jaime" in old-site reviews); whether junk removal, tree/palm removal and drought-tolerant landscaping are still offered.
- No reviews, ratings, awards, licences or project counts may be invented. Old-site Yelp review screenshots exist but have not been reused.

## Product Principles
1. Honesty before polish: never present stock or illustrated scenes as finished client work.
2. Show the transformation: help homeowners imagine their own yard finished.
3. Personal and accountable: a family business with a direct line to the owners.
4. Every page leads to a real, easy way to start a project.
