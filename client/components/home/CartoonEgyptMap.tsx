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
      <img src="/MAP/ee.png" className="absolute inset-0 h-full w-full object-cover" alt="Stylized Map of Egypt" />

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
