import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const CATEGORIES = ['All', 'Building', 'Renovations', 'Plumbing', 'Finishes'];

// All 58 CS Construction project images, categorized by service type
const PROJECTS = [
  // ── RENOVATIONS ──────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Wall Opening & Archway Creation',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.03.20.jpeg',
    description: 'Structural wall demolition to create a wide archway between living spaces, expanding flow and natural light throughout the home.',
    scope: ['Brick wall demolition', 'Structural assessment', 'Arch formation', 'Debris removal & cleanup'],
    challenge: 'Removing a load-bearing wall section without compromising the structural integrity of the floor above.',
    solution: 'Installed a reinforced steel lintel across the opening span before phased brick removal.',
    stats: { duration: '4 Days', client: 'Residential Client', materials: 'Steel lintel & mixed aggregate' }
  },
  {
    id: 2,
    title: 'Interior Door Frame Renovation',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.04.04.jpeg',
    description: 'Full interior door frame re-positioning, including brick cutting, new frame fitting, and plaster finishing around the new opening.',
    scope: ['Door frame removal', 'Brick cutting & wall opening', 'New frame installation', 'Plastering & skimming'],
    challenge: 'Aligning the new door frame perfectly plumb in an older non-square wall structure.',
    solution: 'Used laser level guides and shimmed the frame before fixing to achieve a true-level finish.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'Timber frames & plaster' }
  },
  {
    id: 3,
    title: 'Concrete & Brick Demolition Work',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.04.05.jpeg',
    description: 'Heavy demolition of old concrete render and brickwork in preparation for a full structural renovation and replastering.',
    scope: ['Concrete layer chipping', 'Brick expose & assessment', 'Rubble clearing', 'Surface prep'],
    challenge: 'Removing decades-old concrete render without damaging the structural brick underneath.',
    solution: 'Used rotary hammers with chisel bits and worked section by section to preserve brick integrity.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Recycled aggregate & new plaster' }
  },
  {
    id: 4,
    title: 'Ceiling Replacement & Skimming',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.04.04 (1).jpeg',
    description: 'Complete ceiling board replacement with flawless gypsum skimming and sanding for a seamless painted finish.',
    scope: ['Old ceiling removal', 'New board installation', 'Joint taping', 'Gypsum skimming'],
    challenge: 'Achieving a perfectly smooth ceiling surface with no visible joints under bright spotlight conditions.',
    solution: 'Applied three-pass gypsum skim with cross-lighting inspection between each coat.',
    stats: { duration: '5 Days', client: 'Residential Client', materials: 'Gypsum board & PVA skim coat' }
  },
  {
    id: 5,
    title: 'Roof Truss & Ceiling Framework',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.04.06.jpeg',
    description: 'Exposed roof truss and insulation assessment with electrical conduit routing for a full ceiling replacement project.',
    scope: ['Truss inspection', 'Insulation check', 'Electrical conduit routing', 'Ceiling board preparation'],
    challenge: 'Routing new electrical conduits without disturbing the existing insulation barrier.',
    solution: 'Carefully lifted insulation panels and re-laid after conduit work, preserving thermal performance.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Timber battens & insulation blanket' }
  },
  {
    id: 6,
    title: 'Bedroom Repaint & Coving Work',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.08.51.jpeg',
    description: 'Complete interior repaint with feature wall coving installation and fresh white ceiling coat for a modern bedroom finish.',
    scope: ['Surface sanding & priming', 'Feature wall paint', 'White ceiling recoat', 'Coving installation'],
    challenge: 'Achieving a crisp paint line at the ceiling junction with the dark feature wall color.',
    solution: 'Used masking tape with spray adhesive edge and applied two coats for a razor-sharp finish line.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Premium acrylic paint & coving plaster' }
  },
  {
    id: 7,
    title: 'Room Skimming & Cornice Fitting',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.08.52 (1).jpeg',
    description: 'Full room wall skimming and ornate cornice installation, creating a refined, plaster-smooth interior finish.',
    scope: ['Wall chip & prep', 'Gypsum skimming', 'Cornice adhesive fixing', 'Sand & prime'],
    challenge: 'Cornice mitre joints on non-90-degree room corners required precision angle cutting.',
    solution: 'Template-cut each corner piece individually and back-filled with flex filler for a seamless join.',
    stats: { duration: '4 Days', client: 'Residential Client', materials: 'Gypsum plaster & ornate cornice' }
  },
  {
    id: 8,
    title: 'Dark Feature Wall & Plaster Repair',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.08.52.jpeg',
    description: 'Plaster patching and a dramatic charcoal feature wall repaint for a contemporary interior refresh.',
    scope: ['Crack filling & patching', 'Feature wall paint', 'Coving repair', 'Full room prime'],
    challenge: 'Old plaster cracks reappeared after initial filling due to movement in the wall substrate.',
    solution: 'Applied fibreglass mesh tape over cracks before plastering, bonding across any future movement lines.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'Charcoal paint & fibreglass mesh tape' }
  },
  {
    id: 9,
    title: 'Open-Plan Interior Partitioning',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.08.53.jpeg',
    description: 'New drywall partition creating a defined study area within an open-plan living room, with concealed cabling and a skimmed finish.',
    scope: ['Steel stud frame', 'Drywall boarding', 'Cable concealment', 'Skimming & paint'],
    challenge: 'Partition had to integrate with an existing vaulted ceiling without visible fixing points.',
    solution: 'Used angle brackets between the partition top rail and sloped ceiling, filled and skimmed over.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Steel studs & gypsum board' }
  },
  {
    id: 10,
    title: 'Drywall Partition & Beam Fitting',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.08.54.jpeg',
    description: 'Steel stud drywall partition with a decorative timber beam header, creating a defined living space in an open-plan home.',
    scope: ['Steel stud layout', 'Board installation', 'Timber beam fitting', 'Skimming'],
    challenge: 'Installing the timber beam header without distorting the drywall face below it.',
    solution: 'Fixed the beam independently to wall studs before boarding, leaving a shadow gap for expansion.',
    stats: { duration: '4 Days', client: 'Residential Client', materials: 'Steel studs & solid pine beam' }
  },
  {
    id: 11,
    title: 'Worker Plastering & Skimming',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.08.55.jpeg',
    description: 'Professional plasterer applying gypsum skim coat to a freshly boarded partition wall in a residential renovation project.',
    scope: ['Board preparation', 'First coat plaster', 'Sand & second coat', 'Final skim'],
    challenge: 'Getting a glassy-smooth finish on the board junction where expansion gaps can telegraph through skim.',
    solution: 'Applied cotton-reinforced bonding tape over all joints before the base coat, preventing cracking.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'Gypsum skim & bonding tape' }
  },
  {
    id: 12,
    title: 'Open-Plan Vaulted Space Renovation',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.08.54 (1).jpeg',
    description: 'Structural drywall work in a vaulted-ceiling open-plan space, including truss repair and new partition installation.',
    scope: ['Truss inspection', 'Wall partition fitting', 'Vaulted ceiling repair', 'Interior painting'],
    challenge: 'Working at height in a vaulted space required specialized scaffolding without damaging the existing timber ceilings.',
    solution: 'Used freestanding adjustable scaffold towers with soft-top caps to protect finished surfaces.',
    stats: { duration: '5 Days', client: 'Residential Client', materials: 'Pine timber & gypsum board' }
  },
  {
    id: 13,
    title: 'Structural Ceiling Truss Repair',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.08.56.jpeg',
    description: 'Replacement and repair of damaged roof trusses within an existing vaulted ceiling space, restoring structural integrity.',
    scope: ['Old truss removal', 'New truss installation', 'Timber treatment', 'Ceiling refit'],
    challenge: 'Removing damaged trusses without allowing the roof load to transfer to other structural members.',
    solution: 'Installed temporary acrow props before each truss removal, transferring load safely to the floor slab.',
    stats: { duration: '4 Days', client: 'Residential Client', materials: 'Treated pine trusses & timber screws' }
  },

  // ── BUILDING ──────────────────────────────────────────────────────────────
  {
    id: 14,
    title: 'Residential Extension Build',
    category: 'Building',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.08.57.jpeg',
    description: 'Complete room extension build including foundation, brickwork, roofing, and plastering for a growing family home.',
    scope: ['Foundation concrete pour', 'Brick coursing & laying', 'Roof truss fitting', 'Internal plastering'],
    challenge: 'Matching new brickwork exactly to existing aged brick colour and mortar joint style.',
    solution: 'Sourced reclaimed bricks from a demolition yard and mixed mortar pigments to achieve a seamless match.',
    stats: { duration: '6 Weeks', client: 'Residential Client', materials: 'Reclaimed bricks & concrete' }
  },
  {
    id: 15,
    title: 'Timber Frame Construction',
    category: 'Building',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.04.33 (1).jpeg',
    description: 'Timber stud-frame room construction with OSB boarding, including window placement and electrical conduit installation.',
    scope: ['Floor plate layout', 'Stud wall framing', 'OSB boarding', 'Window frame fitting', 'Conduit routing'],
    challenge: 'Ensuring wall studs were perfectly plumb in a room with a slightly uneven concrete slab floor.',
    solution: 'Shimmed the bottom plates level before fixing, ensuring every stud was plumb regardless of floor variation.',
    stats: { duration: '2 Weeks', client: 'Residential Client', materials: 'Treated pine studs & OSB board' }
  },
  {
    id: 16,
    title: 'Frame & Wiring Rough-In',
    category: 'Building',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.04.33.jpeg',
    description: 'Timber stud wall with complete electrical rough-in wiring and conduit runs, ready for drywall boarding.',
    scope: ['Stud wall build', 'Conduit bending & routing', 'Wiring rough-in', 'Junction box installation'],
    challenge: 'Routing multiple circuit conduits through the same stud bay without creating a congestion point.',
    solution: 'Staggered conduit attachment points and used a stud gang plate where multiple conduits crossed.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Pine studs, PVC conduit & cable' }
  },
  {
    id: 17,
    title: 'New Build Room Construction',
    category: 'Building',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.05.jpeg',
    description: 'Full timber-framed new room construction from ground up, with exposed roof trusses, window openings and concrete floor slab.',
    scope: ['Slab preparation', 'Stud wall framing', 'Roof truss fitting', 'Window rough-in', 'Electrical prep'],
    challenge: 'Coordinating stud wall layout with window rough openings to maintain structural integrity.',
    solution: 'Used doubled king studs and trimmer studs at all window openings, with timber headers over each span.',
    stats: { duration: '3 Weeks', client: 'Residential Client', materials: 'Treated pine & OSB board' }
  },
  {
    id: 18,
    title: 'House Extension Foundation & Walls',
    category: 'Building',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.02.jpeg',
    description: 'Structural brick extension to an existing home, including new foundation, cavity wall construction and damp-proof course.',
    scope: ['Foundation excavation', 'Concrete strip footing', 'DPC installation', 'Cavity brickwork'],
    challenge: 'Tying the new extension into the existing foundation without disrupting the original building.',
    solution: 'Excavated alongside the existing footings and poured a connected strip foundation with rebar dowels.',
    stats: { duration: '4 Weeks', client: 'Residential Client', materials: 'Concrete, bricks & DPC membrane' }
  },
  {
    id: 19,
    title: 'Structural Roof Truss Installation',
    category: 'Building',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.03 (1).jpeg',
    description: 'Installation of timber roof trusses and ridge beam for a new residential extension, with hurricane straps and roof anchoring.',
    scope: ['Ridge beam placement', 'Truss hoisting', 'Hurricane strap fixing', 'Purlin installation'],
    challenge: 'Setting the ridge beam level across a span with no intermediate support during initial placement.',
    solution: 'Erected temporary timber A-frame supports mid-span to hold the ridge during truss installation.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'Treated pine trusses & hurricane straps' }
  },
  {
    id: 20,
    title: 'Brick & Mortar Boundary Wall',
    category: 'Building',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.06.jpeg',
    description: 'New boundary wall build using face brickwork with a raked mortar joint finish for a clean, professional perimeter.',
    scope: ['Foundation strip', 'Face brick coursing', 'Raked joint finishing', 'DPC layering'],
    challenge: 'Keeping mortar joints consistent in width across a long straight wall run.',
    solution: 'Used a jointing gauge bar and string line at each course to maintain uniform mortar spacing.',
    stats: { duration: '1 Week', client: 'Residential Client', materials: 'Face bricks & cement mortar' }
  },
  {
    id: 21,
    title: 'Interior Structural Wall Build',
    category: 'Building',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.07.jpeg',
    description: 'New internal brick wall for room division, including foundation preparation, brick laying and plaster-ready surface finishing.',
    scope: ['Floor saw cut', 'Starter rebar fixing', 'Full brick wall', 'Plastering prep'],
    challenge: 'Building a new wall between existing concrete floors without cracking the existing slab.',
    solution: 'Used a diamond blade to saw-cut expansion joints and fixed the wall base with flex adhesive mortar.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Plaster bricks & sharp sand mortar' }
  },
  {
    id: 22,
    title: 'Open-Plan Roof Truss Replacement',
    category: 'Building',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.08.jpeg',
    description: 'Full replacement of deteriorated roof trusses in a large open-plan residential space with new treated timber trusses.',
    scope: ['Old truss removal', 'Temporary propping', 'New truss installation', 'Structural timber treatment'],
    challenge: 'Removing and replacing trusses in a room occupied by homeowners, minimizing disruption.',
    solution: 'Worked one truss at a time with pre-cut replacements ready, completing each truss in a single day.',
    stats: { duration: '1 Week', client: 'Residential Client', materials: 'Treated pine & joist hanger hardware' }
  },

  // ── PLUMBING ──────────────────────────────────────────────────────────────
  {
    id: 23,
    title: 'Toilet & Bathroom Plumbing',
    category: 'Plumbing',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.04.32.jpeg',
    description: 'Full toilet installation with new plumbing connections, including supply stop valve, cistern fitting and seal-tested connections.',
    scope: ['Supply pipe connection', 'Stop valve fitting', 'Cistern installation', 'Seal pressure test'],
    challenge: 'Existing water supply pipe was at a non-standard height, requiring a custom offset connection.',
    solution: 'Used a flexible braided hose with a 90-degree fitting to bridge the height offset cleanly.',
    stats: { duration: '1 Day', client: 'Residential Client', materials: 'Close-coupled toilet suite & fittings' }
  },
  {
    id: 24,
    title: 'External Drainage & Tap Work',
    category: 'Plumbing',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.01.jpeg',
    description: 'External yard tap installation with new drainage channel, concrete surround and pressure-tested supply connections.',
    scope: ['Pipe trench', 'Supply connection', 'Tap fitting', 'Concrete drainage channel'],
    challenge: 'Slope of the yard meant water would pool at the tap base without a drainage solution.',
    solution: 'Cast a sloped concrete channel with centre drain opening directing water away from the structure.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'CPVC pipe, tap & concrete' }
  },
  {
    id: 25,
    title: 'Plumbing Rough-In & Drainage',
    category: 'Plumbing',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.01 (1).jpeg',
    description: 'Underground drainage pipe rough-in with brick enclosure, ready for connection to the main sewer line.',
    scope: ['Trench excavation', 'Drainage pipe laying', 'Inspection chamber', 'Brick enclosure'],
    challenge: 'Old cast iron drainage run needed to connect to new uPVC piping with a compatible adapter.',
    solution: 'Used a rubber push-fit coupling to connect the old cast iron to new uPVC without threading.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'uPVC pipe, rubber couplings & bricks' }
  },
  {
    id: 26,
    title: 'Bathroom PEX Pipe Rerouting',
    category: 'Plumbing',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.09.jpeg',
    description: 'Complete PEX pipe rerouting in a bathroom renovation, replacing old galvanized supply lines with flexible PEX piping.',
    scope: ['Old pipe removal', 'PEX routing & crimping', 'Pressure testing', 'Valve installation'],
    challenge: 'Old galvanized pipes had scale buildup reducing flow; new routing had to improve flow rates.',
    solution: 'Upsized the PEX pipe diameter and eliminated 90-degree elbows where possible to maximize flow.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'PEX-A pipe & brass crimp fittings' }
  },
  {
    id: 27,
    title: 'Geyser Supply Line Installation',
    category: 'Plumbing',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.11 (1).jpeg',
    description: 'New hot and cold supply line installation for a geyser upgrade, with pressure-reducing valve and tempering valve fitting.',
    scope: ['Supply line routing', 'PRV installation', 'Tempering valve', 'Pressure test'],
    challenge: 'Low incoming water pressure required a pump addition to achieve adequate geyser pressure.',
    solution: 'Installed an inline booster pump with pressure switch upstream of the geyser supply valve.',
    stats: { duration: '1 Day', client: 'Residential Client', materials: 'CPVC pipe, PRV & booster pump' }
  },

  // ── FINISHES ──────────────────────────────────────────────────────────────
  {
    id: 28,
    title: 'Bathroom Tiling – Wall & Floor',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.10.jpeg',
    description: 'Full bathroom wall and floor tiling using large-format grey porcelain tiles with decorative mosaic border strip.',
    scope: ['Tile layout planning', 'Adhesive bedding', 'Large format wall tiles', 'Mosaic border', 'Grouting'],
    challenge: 'Large format tiles over a slightly uneven wall surface required back-buttering to prevent lippage.',
    solution: 'Back-buttered each tile and used a notched trowel on the wall, checking with a straightedge every 3 tiles.',
    stats: { duration: '4 Days', client: 'Residential Client', materials: 'Porcelain tile, adhesive & mosaic strip' }
  },
  {
    id: 29,
    title: 'Window Installation & Reveal Plaster',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.04.31.jpeg',
    description: 'New aluminium window installation with precision plastered reveals and sills for a clean interior finish.',
    scope: ['Window rough opening check', 'Aluminium frame installation', 'Reveal plastering', 'Sill fitting'],
    challenge: 'The new window was slightly smaller than the original opening, requiring infill brickwork on both sides.',
    solution: 'Cut and bonded partial bricks to fill the gaps before plastering the reveals for a seamless surround.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'Aluminium window & plaster' }
  },
  {
    id: 30,
    title: 'Bathroom Window Reveal & Ceiling',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.04.30.jpeg',
    description: 'Bathroom window reveal plastering and ceiling skimming with corner bead for a crisp finished interior result.',
    scope: ['Corner bead fitting', 'Window reveal plaster', 'Ceiling skim', 'Final sand & prime'],
    challenge: 'Achieving a square window reveal corner with an angled ceiling intersecting the same corner.',
    solution: 'Cut the corner bead to the exact ceiling angle and used feathering plaster to blend the junction.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'Gypsum plaster & metal corner bead' }
  },
  {
    id: 31,
    title: 'High-Gloss Interior Paint Finish',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.11.jpeg',
    description: 'Professional interior paint application in a high-gloss finish, including cornice detail and crisp ceiling line.',
    scope: ['Wall sanding & priming', 'Two coat acrylic', 'Cornice painting', 'Final inspection'],
    challenge: 'High-gloss paint exposed every minor wall imperfection not visible under matt paint.',
    solution: 'Applied three rounds of skim-sanding and spot-filling before the first gloss coat.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'High-gloss acrylic & PVA primer' }
  },
  {
    id: 32,
    title: 'Feature Tile Floor Installation',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.12.jpeg',
    description: 'Decorative patterned floor tile installation in a bathroom, combining textured cement-look tiles with a vibrant Moroccan mosaic border.',
    scope: ['Floor leveling compound', 'Layout marking', 'Patterned tile laying', 'Grouting'],
    challenge: 'Pattern tiles with different thicknesses required float-bedding to create an even surface.',
    solution: 'Used a self-leveling compound base and varied the adhesive bed thickness across tiles to compensate.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Moroccan pattern tiles & flex adhesive' }
  },
  {
    id: 33,
    title: 'Plaster Skim & Cornice Work',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.13.jpeg',
    description: 'Expert skim plastering and ornate cornice installation in a lounge renovation for a high-end interior finish.',
    scope: ['Existing plaster assessment', 'Skim coat application', 'Cornice adhesive fixing', 'Corner mitring'],
    challenge: 'Old walls had an uneven wave pattern from previous brush-applied plaster coats.',
    solution: 'Applied a floating coat to flatten the waves before the final skim, resulting in a perfectly flat wall.',
    stats: { duration: '4 Days', client: 'Residential Client', materials: 'Gypsum skim & ornate cornice' }
  },
  {
    id: 34,
    title: 'Floor Tiling & Paving Finish',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.13 (1).jpeg',
    description: 'Outdoor paving and indoor tile continuation project creating a seamless indoor-outdoor living transition.',
    scope: ['Ground leveling', 'Screed base', 'Indoor tile installation', 'Outdoor paver laying'],
    challenge: 'Matching grout joint lines from the indoor tile to the outdoor paving across a threshold.',
    solution: 'Set out from a single datum line and used spacers to maintain the joint width across both surfaces.',
    stats: { duration: '5 Days', client: 'Residential Client', materials: 'Indoor tiles, pavers & flex adhesive' }
  },
  {
    id: 35,
    title: 'Wall Skimming & Interior Painting',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.14.jpeg',
    description: 'Complete interior skimming and two-coat paint finish in a renovated bedroom for a clean, move-in ready result.',
    scope: ['Wall crack repair', 'Full skim coat', 'Sanding', 'Two-coat paint'],
    challenge: 'Previous homeowner had applied textured paint that required neutralizing before smooth plastering.',
    solution: 'Used a PVA bonding agent over the textured surface before skimming to ensure adhesion.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'PVA bonding agent & gypsum skim' }
  },
  {
    id: 36,
    title: 'Bathroom Tile & Sanware Install',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.15.jpeg',
    description: 'Porcelain wall tiling with sanware installation in a bathroom renovation, including concealed cistern fitting.',
    scope: ['Wall tile installation', 'Concealed cistern fitting', 'Sanware plumbing', 'Silicon sealing'],
    challenge: 'Concealed cistern required precise tile cutouts for the flush plate without cracking surrounding tiles.',
    solution: 'Used a diamond hole saw to cut the flush plate opening and sealed edges with silicon.',
    stats: { duration: '4 Days', client: 'Residential Client', materials: 'Porcelain tile & concealed cistern' }
  },
  {
    id: 37,
    title: 'Kitchen & Bathroom Tiling',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.15 (1).jpeg',
    description: 'Large-format floor and wall tile installation across a kitchen and bathroom, including cutting and fitting around all fixtures.',
    scope: ['Layout planning', 'Floor tile laying', 'Wall tile installation', 'Fixture cutouts', 'Grout & seal'],
    challenge: 'Door opening between rooms required a level transition tile that would not create a trip hazard.',
    solution: 'Used a tapered aluminum threshold strip and cut the last tile course with a precise taper to match.',
    stats: { duration: '5 Days', client: 'Residential Client', materials: 'Large-format tiles & aluminum threshold' }
  },
  {
    id: 38,
    title: 'Paving & Outdoor Tile Finish',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.16.jpeg',
    description: 'Outdoor entertainment area tile and paving installation, with drainage channel integration for winter rains.',
    scope: ['Ground preparation', 'Screed leveling', 'Tile & paver installation', 'Drainage channel'],
    challenge: 'Outdoor area had to drain away from the structure to prevent damp ingress through the patio door sill.',
    solution: 'Set tile fall at 1:60 away from structure, installing a linear drain at the property perimeter.',
    stats: { duration: '4 Days', client: 'Residential Client', materials: 'Outdoor porcelain & concrete pavers' }
  },
  {
    id: 39,
    title: 'White Matte Wall Paint & Finishes',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.17.jpeg',
    description: 'Premium white matte interior paint application in a newly renovated room with cornice detailing and crisp baseboard finish.',
    scope: ['Full wall priming', 'Two-coat matte white', 'Cornice painting', 'Baseboard gloss'],
    challenge: 'Fresh plaster required extended drying time before paint could be applied without blistering.',
    solution: 'Allowed 4 weeks cure time and tested moisture content with a meter before priming.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'Premium white matte & gloss paint' }
  },
  {
    id: 40,
    title: 'Neutral Interior Colour Scheme',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.18.jpeg',
    description: 'Interior paint finish in a warm neutral palette, including cut-in lines at cornices, architraves and skirting boards.',
    scope: ['Color consultation', 'Prime coat', 'Two coat colour', 'Trim gloss painting'],
    challenge: 'Matching paint sample to the actual wall color under different lighting conditions in the room.',
    solution: 'Applied a test patch 500x500mm and viewed under both natural and artificial light before committing.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'Neutral tinted paint & trim gloss' }
  },
  {
    id: 41,
    title: 'Full Interior Repaint',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.19.jpeg',
    description: 'Complete interior repaint for a residential property, including all walls, ceilings, and woodwork in a neutral modern palette.',
    scope: ['Masking & prep', 'Ceiling paint', 'Wall two-coat', 'Woodwork gloss'],
    challenge: 'Multiple occupants in the home required completing painting room by room without fume disruption.',
    solution: 'Used low-VOC water-based paints and scheduled rooms to be vacated for just 4 hours each.',
    stats: { duration: '1 Week', client: 'Residential Client', materials: 'Low-VOC acrylic & gloss enamel' }
  },
  {
    id: 42,
    title: 'Premium Tiling & Grouting Finish',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.20.jpeg',
    description: 'High-precision tile laying with epoxy grout finish, ensuring a long-lasting and stain-resistant bathroom surface.',
    scope: ['Floor leveling', 'Tile installation', 'Epoxy grout application', 'Polish & seal'],
    challenge: 'Epoxy grout has a short working time and had to be applied in small sections without grout haze.',
    solution: 'Mixed small batches and worked in 1m² sections, cleaning each section before moving to the next.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Porcelain tiles & epoxy grout' }
  },
  {
    id: 43,
    title: 'Interior Skimming & Paint',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.21.jpeg',
    description: 'Skim plaster and paint finish for a newly renovated living room, achieving a flawless, paint-ready surface.',
    scope: ['Wall leveling skim', 'Sanding', 'Prime coat', 'Two colour coats'],
    challenge: 'Existing walls had multiple layers of old wallpaper residue affecting skim adhesion.',
    solution: 'Steamed off residue, applied a stabilizing primer and allowed full cure before skim plastering.',
    stats: { duration: '4 Days', client: 'Residential Client', materials: 'Stabilizing primer & gypsum skim' }
  },
  {
    id: 44,
    title: 'Floor Tiling – Large Format Tiles',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.22.jpeg',
    description: 'Large-format floor tile installation using a calibrated slipstone finish for a contemporary open-plan interior.',
    scope: ['Self-leveling compound', 'Tile adhesive bedding', 'Large format tile laying', 'Grout & seal'],
    challenge: 'Large format tiles over a long-span floor required preventing any bounce caused by floor spring.',
    solution: 'Poured a 10mm self-leveling compound to stiffen the base before laying tiles in a full adhesive bed.',
    stats: { duration: '4 Days', client: 'Residential Client', materials: '800x800mm porcelain & SLC compound' }
  },
  {
    id: 45,
    title: 'Bathroom Tile Work & Splash Area',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.22 (1).jpeg',
    description: 'Bathroom splash area tiling and floor finish installation with precise cutting around sanitary ware and fixtures.',
    scope: ['Splash tile layout', 'Floor tile cutting', 'Sanitary ware cutouts', 'Grout & silicon seal'],
    challenge: 'Cutting tiles around a non-circular basin pedestal required a template trace cut.',
    solution: 'Traced the pedestal profile onto cardboard, transferred to the tile and cut with a jigsaw diamond blade.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'Ceramic wall tile & floor tile' }
  },
  {
    id: 46,
    title: 'Room Tile & Skirting Finish',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.23.jpeg',
    description: 'Complete room floor tiling with skirting tile installation and precise corner mitring for a high-end finish.',
    scope: ['Floor tile layout', 'Skirting tile fitting', 'Corner miter cuts', 'Grout'],
    challenge: 'Corner miter cuts on the skirting tile required a 45-degree wet saw setup for each piece.',
    solution: 'Set the wet saw table at 45 degrees and test-cut first before cutting all skirting corner pieces.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Porcelain tile & mitre adhesive' }
  },
  {
    id: 47,
    title: 'Multi-Room Tile Installation',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.24.jpeg',
    description: 'Consistent floor tiling across multiple rooms in a newly built home, with matching grout lines running through doorways.',
    scope: ['Datum line setup', 'Floor tile installation', 'Threshold fitting', 'Grout'],
    challenge: 'Maintaining a continuous grout line through three different room thresholds.',
    solution: 'Set a single datum line through all three rooms and worked outward from it, ensuring all joints aligned.',
    stats: { duration: '1 Week', client: 'Residential Client', materials: 'Consistent floor tile across all rooms' }
  },
  {
    id: 48,
    title: 'Exterior Wall Paint & Finish',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.25.jpeg',
    description: 'Complete exterior repaint using waterproof acrylic masonry paint to protect and refresh a residential property facade.',
    scope: ['Crack filling', 'Waterproof prime', 'Two coat masonry paint', 'Window surround trim'],
    challenge: 'Exterior cracks from thermal movement needed a flexible filler to prevent recracking.',
    solution: 'Used elastomeric filler rated for exterior movement, overpainted with elastomeric masonry paint.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Elastomeric filler & waterproof masonry paint' }
  },
  {
    id: 49,
    title: 'Luxury Bathroom Tile Finish',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.25 (1).jpeg',
    description: 'Premium bathroom tiling using large-format white porcelain tiles with a flush shower niche and linear drain installation.',
    scope: ['Shower niche framing', 'Linear drain installation', 'Full tile installation', 'Silicon finishing'],
    challenge: 'Shower niche required a precise waterproof membrane application before tiling to prevent water ingress.',
    solution: 'Applied two coats of liquid membrane to the niche, wrapping corners with fibreglass mesh tape.',
    stats: { duration: '5 Days', client: 'Residential Client', materials: 'Porcelain tile, linear drain & waterproof membrane' }
  },
  // Additional images from the 13 June and 15 June batches
  {
    id: 50,
    title: 'Residential Renovation Overview',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-13 at 16.09.24.jpeg',
    description: 'Full scope residential renovation including structural changes, plastering, painting and finishing works.',
    scope: ['Structural wall changes', 'Plastering & skimming', 'Painting', 'Final finishes'],
    challenge: 'Coordinating multiple trades across a live property with minimal downtime.',
    solution: 'Scheduled trades sequentially and used a rolling program to keep each area moving without conflict.',
    stats: { duration: '6 Weeks', client: 'Residential Client', materials: 'Various - full renovation' }
  },
  {
    id: 51,
    title: 'Bathroom Tile Laying Progress',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.03.jpeg',
    description: 'Active tile laying progress in a bathroom renovation, showing precision workmanship in adhesive application and tile placement.',
    scope: ['Floor prep', 'Adhesive spreading', 'Tile placement & leveling', 'Joint spacing'],
    challenge: 'Bathroom floor had an existing drain in a non-optimal position requiring tile cutting around.',
    solution: 'Set layout to minimize cuts at the drain and used a drain insert to match tile pattern.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'Porcelain tile & grey adhesive' }
  },
  {
    id: 52,
    title: 'New Build Interior Fit-Out',
    category: 'Building',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.04.jpeg',
    description: 'Interior fit-out of a new build, including drywall installation, electrical rough-in and first-fix carpentry.',
    scope: ['Drywall installation', 'First-fix carpentry', 'Electrical rough-in', 'Insulation'],
    challenge: 'Fitting drywall around structural steel columns without creating visible cold bridging points.',
    solution: 'Used thermal break tape at all steel-to-drywall contact points and filled any gaps with insulation.',
    stats: { duration: '2 Weeks', client: 'Residential Client', materials: 'Drywall, timber framing & insulation' }
  },
  {
    id: 53,
    title: 'Pipe Chase & Wall Reinstatement',
    category: 'Plumbing',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.05 (1).jpeg',
    description: 'Pipe chase cutting and reinstatement with tiled finish for concealed plumbing in a bathroom renovation.',
    scope: ['Chase cutting', 'Pipe installation', 'Chase infill', 'Tile reinstatement'],
    challenge: 'Cutting pipe chases through old masonry without breaking adjacent tile on an adjoining wall.',
    solution: 'Used an angle grinder with a diamond disc to score the chase line, preventing cracking beyond the cut.',
    stats: { duration: '1 Day', client: 'Residential Client', materials: 'CPVC pipe & tile adhesive' }
  },
  {
    id: 54,
    title: 'Plastered & Painted Interior',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.06 (1).jpeg',
    description: 'Freshly plastered and painted interior room showing the high quality of CS Construction\'s surface finishing work.',
    scope: ['Plaster application', 'Sanding', 'Primer', 'Two-coat paint'],
    challenge: 'Achieving a flat wall finish against an irregular brick substrate.',
    solution: 'Applied a floating coat first to fill high points, checked with a straightedge and skimmed to finish.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Plaster, primer & interior paint' }
  },
  {
    id: 55,
    title: 'Roof Structure Inspection & Repair',
    category: 'Building',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.08 (1).jpeg',
    description: 'Roof structure inspection and repair, including replacement of damaged timber members and securing of ridge beam.',
    scope: ['Structural inspection', 'Damaged member removal', 'New timber fitting', 'Fixing & bracing'],
    challenge: 'Some roof members showed dry rot which required careful assessment to identify structural extent.',
    solution: 'Probed all suspected members with a sharp tool and replaced any that penetrated more than 25mm.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Treated pine & joist hanger hardware' }
  },
  {
    id: 56,
    title: 'Drain & Foundation Repair',
    category: 'Plumbing',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.10 (1).jpeg',
    description: 'Drainage repair and foundation waterproofing, including re-channeling of surface water drainage away from the property.',
    scope: ['Drain excavation', 'Pipe rerouting', 'Foundation waterproofing', 'Backfill'],
    challenge: 'Root ingress from a nearby tree had blocked the original drainage run.',
    solution: 'Rerouted the drainage away from the tree root zone and installed a root barrier membrane.',
    stats: { duration: '2 Days', client: 'Residential Client', materials: 'uPVC pipe & root barrier membrane' }
  },
  {
    id: 57,
    title: 'Ceiling Replacement & Lighting',
    category: 'Renovations',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.02.jpeg',
    description: 'Complete ceiling board replacement with recessed lighting installation for a modern, clean interior finish.',
    scope: ['Old board removal', 'New boarding', 'Recessed light cutouts', 'Skim & paint'],
    challenge: 'Positioning recessed lights to avoid existing structural joists required precise joist mapping.',
    solution: 'Used a stud finder and drew a joist map on the floor before marking light positions.',
    stats: { duration: '3 Days', client: 'Residential Client', materials: 'Gypsum board & LED downlights' }
  },
  {
    id: 58,
    title: 'Outdoor Paving & Drainage Works',
    category: 'Finishes',
    location: 'Cape Town, Western Cape',
    image: '/images/WhatsApp Image 2026-06-15 at 20.54.03 (1).jpeg',
    description: 'Outdoor paving and surface drainage construction including paver installation, concrete edging and drainage channel.',
    scope: ['Ground excavation', 'Compacted base', 'Paver installation', 'Concrete edging', 'Drainage channel'],
    challenge: 'Paving alongside an existing wall showed standing water would redirect towards the building foundation.',
    solution: 'Laid pavers with a fall away from the building and installed a channel drain at the lowest point.',
    stats: { duration: '1 Week', client: 'Residential Client', materials: 'Concrete pavers & drain channel' }
  }
];

// For hero slideshow - use the best images from each category
export const HERO_SLIDESHOW_IMAGES = [
  { src: '/images/WhatsApp Image 2026-06-15 at 20.54.10.jpeg', category: 'Finishes', label: 'Premium Tiling' },
  { src: '/images/WhatsApp Image 2026-06-13 at 16.03.20.jpeg', category: 'Renovations', label: 'Structural Renovations' },
  { src: '/images/WhatsApp Image 2026-06-15 at 20.54.05.jpeg', category: 'Building', label: 'New Build Construction' },
  { src: '/images/WhatsApp Image 2026-06-13 at 16.04.32.jpeg', category: 'Plumbing', label: 'Plumbing Works' },
  { src: '/images/WhatsApp Image 2026-06-15 at 20.54.02.jpeg', category: 'Building', label: 'Roof & Ceiling Works' },
  { src: '/images/WhatsApp Image 2026-06-13 at 16.08.51.jpeg', category: 'Renovations', label: 'Interior Renovations' },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  useEffect(() => {
    // Animate cards on filter change
    gsap.fromTo('.gallery-card',
      { opacity: 0, scale: 0.95, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.06 }
    );
  }, [activeTab]);

  const filteredProjects = activeTab === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeTab);

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    if (cat === 'All') {
      acc[cat] = PROJECTS.length;
    } else {
      acc[cat] = PROJECTS.filter(p => p.category === cat).length;
    }
    return acc;
  }, {});

  return (
    <section className="w-full bg-slate-50 min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="uppercase text-[10px] font-semibold text-blue-600 tracking-widest font-geist bg-blue-50 border border-blue-200/50 rounded-full px-3.5 py-1.5 inline-block mb-4">
            Our Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-slate-900 tracking-tight font-jakarta mb-6 leading-tight">
            Premium Projects &amp; Craftsmanship
          </h1>
          <p className="text-slate-600 font-jakarta text-base sm:text-lg leading-relaxed">
            Explore all {PROJECTS.length} of our real construction projects across Cape Town — every image is authentic work delivered by the CS Construction team.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 animate-fade-up delay-100">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-medium tracking-tight font-geist transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-slate-900 text-white shadow-sm border border-slate-900'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-sm'
              }`}
            >
              {tab}
              <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${
                activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {categoryCounts[tab]}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="gallery-card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 cursor-pointer flex flex-col group"
              style={{ contentVisibility: 'auto' }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/95 text-slate-900 text-xs font-semibold font-geist px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    View Project Details
                  </span>
                </div>
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-800 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-md border border-slate-200 shadow-sm font-geist">
                  {project.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-blue-600 tracking-wider uppercase mb-1 font-geist">
                    {project.location}
                  </p>
                  <h3 className="text-lg font-medium text-slate-900 tracking-tight font-jakarta mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 font-jakarta">
                    {project.description}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="border-t border-slate-100 mt-4 pt-4 flex items-center justify-between text-[11px] text-slate-400 font-geist">
                  <span>Duration: <strong className="text-slate-600">{project.stats.duration}</strong></span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                    Explore Details &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-y-auto border border-slate-200 shadow-2xl relative animate-scale-up">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-colors z-50 shadow cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Image banner */}
              <div className="md:col-span-6 relative aspect-video md:aspect-auto md:min-h-[500px] bg-slate-100">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-blue-600 text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded shadow-sm font-geist">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl font-medium text-white tracking-tight font-jakarta mt-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/80 text-xs font-geist mt-1">{selectedProject.location}</p>
                </div>
              </div>

              {/* Details column */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-geist mb-2">
                    Project Overview
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-jakarta">
                    {selectedProject.description}
                  </p>

                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-geist mb-3">
                    Scope of Work
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 mb-6">
                    {selectedProject.scope.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-jakarta">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Challenge and Solution block */}
                  <div className="border-l-2 border-blue-600 pl-4 mb-6">
                    <p className="text-xs text-slate-500 italic font-jakarta mb-1">
                      <strong>The Challenge:</strong> {selectedProject.challenge}
                    </p>
                    <p className="text-xs text-slate-700 font-jakarta">
                      <strong>Our Solution:</strong> {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Modal footer statistics */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 grid grid-cols-2 gap-4 text-xs font-geist mt-4">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Timeline</span>
                    <strong className="text-slate-800">{selectedProject.stats.duration}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Client Representative</span>
                    <strong className="text-slate-800">{selectedProject.stats.client}</strong>
                  </div>
                  <div className="col-span-2 border-t border-slate-200/60 pt-2 mt-2">
                    <span className="text-slate-400 block mb-0.5">Key Materials Used</span>
                    <strong className="text-slate-800">{selectedProject.stats.materials}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
