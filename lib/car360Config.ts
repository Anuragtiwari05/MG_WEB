import type { Car360Config } from "@/components/Car360Viewer";

export const car360Configs: Record<string, Car360Config> = {
  hector: {
    id: "hector",
    exteriorFrameCount: 72,
    template: "/images/models/hector/360/ext_{n}.jpg",
  },
  "zs-ev": {
    id: "zs-ev",
    exteriorFrameCount: 27,
    template: "/images/models/zs-ev/360/ext_{n}.jpg",
    reversed: true,
  },
  "windsor-ev": {
    id: "windsor-ev",
    exteriorFrameCount: 30,
    template: "/images/models/windsor-ev/360/ext_{n}.jpg",
    reversed: true,
  },
  "comet-ev": {
    id: "comet-ev",
    exteriorFrameCount: 23,
    template: "/images/models/comet-ev/360/ext_{n}.jpg",
    reversed: true,
  },
  majestor: {
    id: "majestor",
    exteriorFrameCount: 40,
    template: "/images/models/majestor/360/ext_{n}.jpg",
  },
  astor: {
    id: "astor",
    exteriorFrameCount: 19,
    template: "/images/models/astor/360/ext_{n}.jpg",
    reversed: true,
  },
  m9: {
    id: "m9",
    exteriorFrameCount: 72,
    template: "/images/models/m9/360/ext_{n}.jpg",
  },
  cyberster: {
    id: "cyberster",
    exteriorFrameCount: 72,
    template: "/images/models/cyberster/360/ext_{n}.jpg",
  },
};

export function has360Config(carId: string): boolean {
  return carId in car360Configs;
}

export function get360Config(carId: string): Car360Config | null {
  return car360Configs[carId] ?? null;
}
