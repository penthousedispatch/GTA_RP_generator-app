# Modular NYC GTA RP World Layout

## Core rule

Do not build one oversized map. Build a modular stream-safe world:

- Main Exterior World
- Modular Borough Zones
- Long Island Zones
- Special Facility Exteriors
- MLO / Interior Modules
- Teleport / Transition Network

## Main exterior zones

- Zone A: Brooklyn mixed urban
- Zone B: Queens corridor / airport belt
- Zone C: Bronx residential urban
- Zone D: Long Island suburban commercial
- Zone E: Industrial / waterfront special zone

## Special exteriors

- Prison exterior zone (edge of industrial/waterfront area)
- Airport exterior zone (off Queens corridor)
- Plane exterior staged in airport exterior or hangar module

## Interiors (separate modules)

- Prison booking interior
- Prison cellblock interior
- Prison visitation interior
- Airport terminal interior
- Airport security interior
- Airport baggage claim interior
- Commercial plane interior
- Private jet interior
- Cockpit interior

## Transition graph patterns

- `prison_gate_exterior -> prison_booking_interior`
- `prison_corridor_A -> prison_cellblock_A`
- `terminal_entry_A -> airport_terminal_interior`
- `security_gate_B -> airport_gate_waiting_area`
- `jetbridge_A -> plane_interior_commercial`
- `cockpit_door -> cockpit_interior`

## Generator behavior summary

### Borough exteriors
- Believable roads
- Moderate landmark density
- Region-specific storefronts/facades
- Sidewalk clutter + curb wear

### Long Island zones
- Larger setbacks
- More parking lots
- Wider roads
- Suburban medical/commercial assets

### Prison generation
- Rectangular security-driven plans
- Repeated concrete modules
- Limited clutter
- Heavy gate logic
- Institutional materials

### Airport generation
- Clear directional flow
- Long open halls
- High signage density
- Counter + queue + seating logic
- Gate-to-plane transitions

### Plane interiors
- Modular fuselage segments
- Aisle logic
- Seat row templates
- Class variation support
