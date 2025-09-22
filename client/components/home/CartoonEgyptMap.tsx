import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Landmark, Waves, BedDouble, MapPin } from "lucide-react";
import { governorates } from "@/lib/egypt-data";
import { outlinePath, project, GOV_CENTROIDS, polylinePath, NILE_PATH, NILE_DELTA_LEFT, NILE_DELTA_RIGHT, SUEZ_CANAL, LAKE_NASSER, OASES } from "@/lib/egypt-geo";

export type PrefKeys = "overview" | "historical" | "coastal" | "hotels";
export type GovPrefs = Record<string, Record<PrefKeys, boolean>>;

// pin positions computed from GOV_CENTROIDS using projection

const ICONS: { key: PrefKeys; label: string; Icon: any; angle: number }[] = [
  { key: "overview", label: "Overview", Icon: Info, angle: -120 },
  { key: "historical", label: "Historical", Icon: Landmark, angle: -45 },
  { key: "coastal", label: "Coastal", Icon: Waves, angle: 45 },
  { key: "hotels", label: "Hotels", Icon: BedDouble, angle: 120 },
];

export function CartoonEgyptMap({
  selectedGov,
  prefs,
  onSelectGov,
  onTogglePref,
}: {
  selectedGov: string;
  prefs: GovPrefs;
  onSelectGov: (gov: string) => void;
  onTogglePref: (gov: string, key: PrefKeys) => void;
}) {
  const availableGovs = useMemo(() => Object.keys(governorates), []);
  const [menuGov, setMenuGov] = useState<string | null>(null);

  // Precompute projected centroids and simple Voronoi-like partitions
  const centers = useMemo(() =>
    availableGovs
      .map((g) => {
        const c = GOV_CENTROIDS.find((x) => x.gov === g);
        if (!c) return null;
        const p = project(c.lng, c.lat, 100, 100);
        return { gov: g, x: p.x, y: p.y };
      })
      .filter(Boolean) as { gov: string; x: number; y: number }[],
  [availableGovs]);

  function clipWithHalfPlane(poly: { x: number; y: number }[], a: number, b: number, c: number) {
    // keep points where ax + by <= c
    const out: { x: number; y: number }[] = [];
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i];
      const q = poly[(i + 1) % poly.length];
      const pin = a * p.x + b * p.y <= c;
      const qin = a * q.x + b * q.y <= c;
      if (pin) out.push(p);
      if (pin !== qin) {
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        const t = (c - a * p.x - b * p.y) / (a * dx + b * dy);
        out.push({ x: p.x + t * dx, y: p.y + t * dy });
      }
    }
    return out;
  }

  const regions = useMemo(() => {
    const base: { x: number; y: number }[] = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ];
    const regs: Record<string, { x: number; y: number }[]> = {};
    for (const p of centers) {
      let poly = base;
      for (const q of centers) {
        if (q.gov === p.gov) continue;
        // bisector: (x·(qx-px) + y·(qy-py)) <= 0.5*(qx^2+qy^2 - px^2 - py^2)
        const vx = q.x - p.x;
        const vy = q.y - p.y;
        const rhs = 0.5 * (q.x * q.x + q.y * q.y - p.x * p.x - p.y * p.y);
        poly = clipWithHalfPlane(poly, vx, vy, rhs);
        if (poly.length === 0) break;
      }
      regs[p.gov] = poly;
    }
    return regs;
  }, [centers]);

  useEffect(() => {
    if (!availableGovs.includes(selectedGov)) {
      const first = availableGovs[0];
      onSelectGov(first);
    }
  }, [availableGovs, selectedGov, onSelectGov]);

  return (
    <div className="relative h-96 w-full rounded-xl border overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#ecfdf5" />
          </linearGradient>
          <clipPath id="egypt-clip">
            <path d={outlinePath(100, 100)} />
          </clipPath>
          <filter id="paperNoise" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.08" />
            </feComponentTransfer>
          </filter>
          <pattern id="dunes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
            <path d="M0 3 H6" stroke="#d4a373" strokeWidth="0.4" opacity="0.3" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="#f4e4bc" />
        <g clipPath="url(#egypt-clip)">
          <rect x="0" y="0" width="100" height="100" fill="#e6d3a3" />
          <rect x="0" y="0" width="100" height="100" fill="url(#dunes)" opacity="0.4" />
          <rect x="0" y="0" width="100" height="100" filter="url(#paperNoise)" />
          {/* governorate regions */}
          {availableGovs.map((g, i) => {
            const poly = regions[g];
            if (!poly || poly.length < 3) return null;
            const d = `M ${poly.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" L ")} Z`;
            const fills = ["#d4a373", "#e9c46a", "#f4a261", "#e76f51", "#2a9d8f", "#264653", "#e63946", "#f77f00", "#fcbf49", "#003049"];
            return (
              <path key={g} d={d} fill={fills[i % fills.length]} opacity="0.35" stroke="#8b4513" strokeOpacity="0.6" strokeWidth="0.8" />
            );
          })}
          {/* raised base */}
          <g opacity="0.6" transform="translate(0,1.2)">
            <path d={outlinePath(100, 100)} fill="#8b4513" />
          </g>
          {/* labels per region */}
          {availableGovs.map((g) => {
            const center = centers.find((c) => c.gov === g);
            if (!center) return null;
            return (
              <text key={`lbl-${g}`} x={center.x} y={center.y} textAnchor="middle" fontSize="3" fill="#78350f" opacity="0.7">
                {g}
              </text>
            );
          })}
          {/* country outline and water features on top */}
          <path d={outlinePath(100, 100)} fill="none" stroke="#8b4513" strokeWidth="1.2" opacity="0.9" />
          <path d={polylinePath(NILE_PATH, 100, 100)} fill="none" stroke="#1e40af" strokeWidth="2" opacity="0.9" />
          <path d={polylinePath(NILE_DELTA_LEFT, 100, 100)} fill="none" stroke="#1e40af" strokeWidth="1.5" opacity="0.9" />
          <path d={polylinePath(NILE_DELTA_RIGHT, 100, 100)} fill="none" stroke="#1e40af" strokeWidth="1.5" opacity="0.9" />
          <path d={polylinePath(SUEZ_CANAL, 100, 100)} fill="none" stroke="#3b82f6" strokeDasharray="2 2" strokeWidth="1.2" opacity="0.9" />
          <path d={polylinePath(LAKE_NASSER, 100, 100)} fill="none" stroke="#1e40af" strokeWidth="2.5" opacity="0.8" />
        </g>
        <g opacity="0.45">
          <text x="12" y="8" fontSize="4" fill="#0284c7">Mediterranean Sea</text>
          <text x="78" y="60" fontSize="4" fill="#0284c7" transform="rotate(-90 78,60)">Red Sea</text>
          <text x="20" y="40" fontSize="3.2" fill="#92400e">Western Desert</text>
          <text x="70" y="30" fontSize="3.2" fill="#92400e">Sinai</text>
        </g>
        <g>
          {OASES.map((o) => {
            const p = project(o.lng, o.lat, 100, 100);
            return (
              <g key={o.name}>
                <circle cx={p.x} cy={p.y} r={1.6} fill="#16a34a" opacity="0.9" />
                <text x={p.x + 1.8} y={p.y - 0.8} fontSize="2.8" fill="#166534">{o.name}</text>
              </g>
            );
          })}
        </g>
        {/* decorative boat in Mediterranean */}
        <g opacity="0.8">
          <path d="M 45 10 l 8 0 l -2 3 l -6 0 Z" fill="#0ea5e9" stroke="#0369a1" strokeWidth="0.4" />
          <path d="M 49 10 l 0 -4 l 4 4 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="0.3" />
        </g>
        {/* pyramid near Giza */}
        <g opacity="0.9">
          <polygon points="34,60 40,60 37,56" fill="#fbbf24" stroke="#a16207" strokeWidth="0.4" />
          <polyline points="34,60 37,58 40,60" fill="none" stroke="#d97706" strokeWidth="0.4" opacity="0.6" />
        </g>
        {/* flags on selected cities */}
        {centers.map((c) => (
          <g key={`flag-${c.gov}`} opacity="0.9">
            <rect x={c.x + 1.2} y={c.y - 6} width={3.2} height={2} fill="#ef4444" stroke="#111827" strokeWidth="0.2" />
            <rect x={c.x + 1.2} y={c.y - 4} width={3.2} height={2} fill="#ffffff" stroke="#111827" strokeWidth="0.2" />
            <rect x={c.x + 1.2} y={c.y - 2} width={3.2} height={2} fill="#111827" />
            <rect x={c.x + 1} y={c.y - 6} width={0.3} height={6} fill="#111827" />
          </g>
        ))}
      </svg>

      {availableGovs.map((gov) => {
        const center = GOV_CENTROIDS.find((c) => c.gov === gov);
        const proj = center ? project(center.lng, center.lat, 100, 100) : { x: 50, y: 50 };
        const pos = { x: proj.x, y: proj.y };
        const active = menuGov === gov;
        const current = prefs[gov] || {
          overview: false,
          historical: false,
          coastal: false,
          hotels: false,
        };
        return (
          <div
            key={gov}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <button
              className={`group relative inline-flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1.5 shadow hover:shadow-md transition ${
                selectedGov === gov ? "border-primary" : "border-foreground/10"
              }`}
              onClick={() => {
                onSelectGov(gov);
                setMenuGov((m) => (m === gov ? null : gov));
              }}
            >
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{gov}</span>
            </button>

            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0"
                >
                  {ICONS.map(({ key, label, Icon, angle }) => {
                    const radius = 52;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * radius;
                    const y = Math.sin(rad) * radius;
                    const selected = !!current[key];
                    return (
                      <motion.button
                        key={key}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0.6 }}
                        animate={{ x, y, opacity: 1, scale: 1 }}
                        exit={{ x: 0, y: 0, opacity: 0, scale: 0.6 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onTogglePref(gov, key);
                        }}
                        className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-2 shadow bg-background/95 backdrop-blur ${
                          selected ? "border-primary ring-2 ring-primary/30" : "border-foreground/10"
                        }`}
                        style={{ left: 0, top: 0 }}
                        title={label}
                      >
                        <Icon className={`h-4 w-4 ${selected ? "text-primary" : "text-foreground/80"}`} />
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-1 text-[10px] text-foreground/70">
              {current.overview && <span className="mr-2">• Overview</span>}
              {current.historical && <span className="mr-2">• Historical</span>}
              {current.coastal && <span className="mr-2">• Coastal</span>}
              {current.hotels && <span>• Hotels</span>}
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground">
          Tap a governorate pin, then toggle the icons to set your interests.
        </div>
        <div className="flex items-center gap-2">
          <LegendItem icon={<Info className="h-3.5 w-3.5" />} label="Overview" />
          <LegendItem icon={<Landmark className="h-3.5 w-3.5" />} label="Historical" />
          <LegendItem icon={<Waves className="h-3.5 w-3.5" />} label="Coastal" />
          <LegendItem icon={<BedDouble className="h-3.5 w-3.5" />} label="Hotels" />
        </div>
      </div>
    </div>
  );
}

function LegendItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border bg-background/70 px-2.5 py-1 text-[11px]">
      {icon}
      {label}
    </span>
  );
}
