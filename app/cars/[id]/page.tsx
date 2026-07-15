import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cars } from "@/lib/data";
import CarDetailClient from "./CarDetailClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const car = cars.find((c) => c.id === id);
  if (!car) return {};

  return {
    title: `MG ${car.name} Price, Specifications & Features - MG Motor Mumbai`,
    description: `Explore the new MG ${car.name} at MG Motor Mumbai. Get pricing starts from ₹${car.price} Lakh, mileage ${car.mileage}, seating, dimensions, highlights, and book a test drive.`,
    alternates: { canonical: `/cars/${car.id}` },
    keywords: [
      `MG ${car.name} price Mumbai`,
      `MG ${car.name} features`,
      `MG ${car.name} specifications`,
      `MG ${car.name} mileage`,
      `MG ${car.name} color options`,
    ],
  };
}

export async function generateStaticParams() {
  return cars.map((c) => ({
    id: c.id,
  }));
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const car = cars.find((c) => c.id === id);
  if (!car) {
    notFound();
  }

  return <CarDetailClient car={car} />;
}
