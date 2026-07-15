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
  colours: Record<string, string>;
};

export const carDekhoImages: Record<string, ModelImages> = {
  astor: {
    hero: "/images/models/astor/01-front-left-side-47.jpg",
    exterior: "/images/models/astor/01-front-left-side-47.jpg",
    safety: "/images/models/astor/01-front-left-side-47.jpg",
    technology: "/images/models/astor/10-dashboard-59.jpg",
    colours: { "Candy White": "/images/models/astor/24-223-candy-white-dddce1.jpg", "Aurora Silver": "/images/models/astor/21-224-aurora-silver-6a6d7a.jpg", "Glaze Red": "/images/models/astor/23-225-glaze-red-8c2e30.jpg", "Havana Grey": "/images/models/astor/19-221-havana-grey-82838c.jpg", "Starry Black": "/images/models/astor/20-222-starry-black-141414.jpg" },
  },
  hector: {
    hero: "/images/models/hector/01-front-left-side-47.jpg",
    exterior: "/images/models/hector/01-front-left-side-47.jpg",
    safety: "/images/models/hector/17-parking-camera-display-136.jpg",
    technology: "/images/models/hector/08-dashboard-59.jpg",
    colours: { "Celadon Blue": "/images/models/hector/25-celadon-blue-1b2a44.jpg", "Pearl White": "/images/models/hector/21-pearl-white-bdbdbd.jpg", "Glaze Red": "/images/models/hector/24-glaze-red-e0001b.jpg", "Aurora Silver": "/images/models/hector/23-aurora-silver-9192a0.jpg", "Starry Black": "/images/models/hector/22-starry-black-101012.jpg" },
  },
  "zs-ev": {
    hero: "/images/models/zs-ev/01-front-left-side-47.jpg",
    exterior: "/images/models/zs-ev/01-front-left-side-47.jpg",
    safety: "/images/models/zs-ev/28-airbags-94.jpg",
    technology: "/images/models/zs-ev/15-dashboard-59.jpg",
    colours: { "Candy White": "/images/models/zs-ev/32-224-white-d7d7d7.jpg", "Aurora Silver": "/images/models/zs-ev/31-222-gray-313642.jpg", "Glaze Red": "/images/models/zs-ev/33-221-red-850208.jpg", "Starry Black": "/images/models/zs-ev/30-223-black-1c1b20.jpg" },
  },
  "windsor-ev": {
    hero: "/images/models/windsor-ev/01-front-left-side-47.jpg",
    exterior: "/images/models/windsor-ev/01-front-left-side-47.jpg",
    safety: "/images/models/windsor-ev/32-top-brake-lamp-high-mount-stop-lamp-244.jpg",
    technology: "/images/models/windsor-ev/40-dashboard-59.jpg",
    colours: { "Turquoise Green": "/images/models/windsor-ev/99-turquoise-green-2d4047.jpg", "Pearl White": "/images/models/windsor-ev/97-223-pearl-white-c0c0c0.jpg", "Starry Black": "/images/models/windsor-ev/98-starburst-black-000000.jpg" },
  },
  "comet-ev": {
    hero: "/images/models/comet-ev/01-front-left-side-47.jpg",
    exterior: "/images/models/comet-ev/01-front-left-side-47.jpg",
    safety: "/images/models/comet-ev/01-front-left-side-47.jpg",
    technology: "/images/models/comet-ev/21-dashboard-59.jpg",
    colours: { "Apple Green / Black": "/images/models/comet-ev/38-green-with-black-sunroof-98ca31.jpg", "Candy White": "/images/models/comet-ev/42-candy-white-e0dfe4.jpg", "Aurora Silver": "/images/models/comet-ev/40-aurora-silver-8e929a.jpg", "Starry Black": "/images/models/comet-ev/39-starry-black-292929.jpg" },
  },
  majestor: {
    hero: "/images/models/majestor/01-front-left-side-47.jpg",
    exterior: "/images/models/majestor/01-front-left-side-47.jpg",
    safety: "/images/models/majestor/37-top-brake-lamp-high-mount-stop-lamp-244.jpg",
    technology: "/images/models/majestor/52-dashboard-59.jpg",
    colours: { "Pearl White": "/images/models/majestor/140-pearl-white-edefef.jpg", "Concrete Grey": "/images/models/majestor/141-concrete-grey-5c616a.jpg", "Metal Black": "/images/models/majestor/139-black-metal-0b0c0c.jpg", "Metal Ash": "/images/models/majestor/142-black-ash-2a2a2a.jpg" },
  },
  m9: {
    hero: "/images/models/m9/01-front-left-side-47.jpg",
    exterior: "/images/models/m9/01-front-left-side-47.jpg",
    safety: "/images/models/m9/37-top-brake-lamp-high-mount-stop-lamp-244.jpg",
    technology: "/images/models/m9/49-dashboard-59.jpg",
    colours: { "Pearl White": "/images/models/m9/121-pearl-white-with-black-roof-c0c0c0.jpg", "Aurora Silver": "/images/models/m9/122-concrete-grey-with-black-roof-74787b.jpg", "Starry Black": "/images/models/m9/123-metal-black-010101.jpg" },
  },
  cyberster: {
    hero: "/images/models/cyberster/01-front-left-side-47.jpg",
    exterior: "/images/models/cyberster/01-front-left-side-47.jpg",
    safety: "/images/models/cyberster/41-360-camera-front-249.jpg",
    technology: "/images/models/cyberster/48-dashboard-59.jpg",
    colours: { "Dynamic Red": "/images/models/cyberster/108-flare-red-ba0116.jpg", "Electric Yellow": "/images/models/cyberster/107-nuclear-yellow-eeac37.jpg", "Bullet Silver": "/images/models/cyberster/106-andes-grey-3b3b3b.jpg" },
  },
};

export function getCarDekhoImage(modelId: string, slot: "hero" | "exterior" | "safety" | "technology", colour?: string) {
  const model = carDekhoImages[modelId];
  if (!model) return undefined;
  return colour ? model.colours[colour] ?? model[slot] : model[slot];
}
