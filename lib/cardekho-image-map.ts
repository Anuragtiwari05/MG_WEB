/**
 * Local, provenance-backed image choices from the CarDekho gallery fetch.
 * Full galleries and their source URLs are stored beside each model under
 * public/images/models/<model>/manifest.json.
 */
type ModelImages = {
  hero: string;
  exterior: string;
  safety: string;
  technology: string;
  colours?: Record<string, string>;
};

export const carDekhoImages: Record<string, ModelImages> = {
  astor: {
    hero: "/images/models/astor/01-front-left-side-47.jpg",
    exterior: "/images/models/astor/01-front-left-side-47.jpg",
    safety: "/images/models/astor/01-front-left-side-47.jpg",
    technology: "/images/models/astor/10-dashboard-59.jpg",
  },
  hector: {
    hero: "/images/models/hector/01-front-left-side-47.jpg",
    exterior: "/images/models/hector/01-front-left-side-47.jpg",
    safety: "/images/models/hector/17-parking-camera-display-136.jpg",
    technology: "/images/models/hector/08-dashboard-59.jpg",
  },
  "zs-ev": {
    hero: "/images/models/zs-ev/01-front-left-side-47.jpg",
    exterior: "/images/models/zs-ev/01-front-left-side-47.jpg",
    safety: "/images/models/zs-ev/28-airbags-94.jpg",
    technology: "/images/models/zs-ev/15-dashboard-59.jpg",
  },
  "windsor-ev": {
    hero: "/images/models/windsor-ev/01-front-left-side-47.jpg",
    exterior: "/images/models/windsor-ev/01-front-left-side-47.jpg",
    safety: "/images/models/windsor-ev/32-top-brake-lamp-high-mount-stop-lamp-244.jpg",
    technology: "/images/models/windsor-ev/40-dashboard-59.jpg",
  },
  "comet-ev": {
    hero: "/images/models/comet-ev/01-front-left-side-47.jpg",
    exterior: "/images/models/comet-ev/01-front-left-side-47.jpg",
    safety: "/images/models/comet-ev/01-front-left-side-47.jpg",
    technology: "/images/models/comet-ev/21-dashboard-59.jpg",
  },
  majestor: {
    hero: "/images/models/majestor/01-front-left-side-47.jpg",
    exterior: "/images/models/majestor/01-front-left-side-47.jpg",
    safety: "/images/models/majestor/37-top-brake-lamp-high-mount-stop-lamp-244.jpg",
    technology: "/images/models/majestor/52-dashboard-59.jpg",
  },
  m9: {
    hero: "/images/models/m9/01-front-left-side-47.jpg",
    exterior: "/images/models/m9/01-front-left-side-47.jpg",
    safety: "/images/models/m9/37-top-brake-lamp-high-mount-stop-lamp-244.jpg",
    technology: "/images/models/m9/49-dashboard-59.jpg",
  },
  cyberster: {
    hero: "/images/models/cyberster/01-front-left-side-47.jpg",
    exterior: "/images/models/cyberster/01-front-left-side-47.jpg",
    safety: "/images/models/cyberster/41-360-camera-front-249.jpg",
    technology: "/images/models/cyberster/48-dashboard-59.jpg",
  },
};

export function getCarDekhoImage(modelId: string, slot: "hero" | "exterior" | "safety" | "technology", colour?: string) {
  const model = carDekhoImages[modelId];
  if (!model) return undefined;
  if (colour) {
    return model.colours?.[colour];
  }
  return model[slot];
}
