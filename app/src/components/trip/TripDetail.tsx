"use client";

import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import BackButton from "@/components/shared/BackButton";
import { TripSet } from "@/types/trip-set";
import { TicketIcon, BedIcon, ClockIcon, StarIcon } from "lucide-react";
import { useUser } from "@/infrastructure/FrontendUserAccessor";

interface TripDetailProps {
  trip: TripSet;
}

function getAirportCode(city: string): string {
  const codes: { [key: string]: string } = {
    Wrocław: "WRO",
    Bergamo: "BGY",
    Berlin: "BER",
    Barcelona: "BCN",
    Chiavenna: "CHV",
    Praga: "PRG",
    Mediolan: "MIL",
  };
  return codes[city] || "XXX";
}

function getTransportIcon(transportName: string): string {
  if (transportName.includes("Lot")) return "✈️";
  if (transportName.includes("Pociąg")) return "🚂";
  return "🚌";
}

export default function TripDetail({ trip }: TripDetailProps) {
  return (
    <main className="min-h-screen">
      <MaxWidthWrapper className="flex flex-col gap-2">
        <div className="flex items-center gap-2 justify-center">
          <BackButton />
          <h1 className="text-primary text-2xl font-bold text-center mb-1">Szczegóły podróży</h1>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-5 bottom-5 w-0.5 bg-primary" />

          {trip.destinations.map((dest: any, idx: number) => (
            <div key={idx} className="mb-6 relative">
              <div className="absolute left-[23px] top-5 w-5 h-5 rounded-full bg-primary border-[3px] border-[#f5ecd7]" />

              <div className="ml-16">
                <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{getTransportIcon(dest.transport.name)}</span>
                    <h3 className="text-primary text-xl font-semibold">{dest.transport.name.split(" ")[0]}</h3>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    {dest.transport.from.city}({getAirportCode(dest.transport.from.city)}) → {dest.transport.destination.city}({getAirportCode(dest.transport.destination.city)})
                  </div>

                  <div className="flex gap-2 mb-4">
                    <button className={cn(buttonVariants({ variant: "default", size: "sm" }), "flex items-center gap-1")}>
                      <TicketIcon className="w-4 h-4" />
                      Kup bilet
                    </button>
                    <button className={cn(buttonVariants({ variant: "default", size: "sm" }), "flex items-center gap-1")}>
                      <BedIcon className="w-4 h-4" />
                      Rezerwuj nocleg
                    </button>
                  </div>

                  {idx < trip.destinations.length - 1 && (
                    <div className="bg-primary/10 rounded-2xl p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ClockIcon className="w-5 h-5 text-primary" />
                        <h4 className="text-primary font-semibold">Czas na przesiadkę</h4>
                      </div>
                      <div className="text-sm text-gray-500">1h30m</div>
                    </div>
                  )}

                  {dest.accommodation && (
                    <div className="bg-primary/10 rounded-xl p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <StarIcon className="w-5 h-5 text-primary mt-0.5" />
                        <p className="text-sm text-gray-700">Pamiętaj o czasie na odbiór bagażu i transfer z lotniska na dworzec kolejowy w {dest.transport.destination.city}.</p>
                      </div>
                    </div>
                  )}

                  {dest.accommodation && (
                    <div className="bg-primary/10 rounded-2xl p-6 mb-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🏠</span>
                        <h3 className="text-primary text-xl font-semibold">Zakwaterowanie</h3>
                      </div>
                      <div className="text-sm font-bold text-gray-800 mb-1">{dest.accommodation.name}</div>
                      <div className="text-xs text-gray-600 mb-2">{dest.accommodation.description}</div>
                      <div className="text-xs text-gray-500 mb-4">
                        {dest.accommodation.location.city} | {dest.accommodation.price} PLN | {dest.accommodation.beds} łóżka
                      </div>
                      <div className="flex gap-2">
                        <button className={cn(buttonVariants({ variant: "default", size: "sm" }), "flex items-center gap-1")}>
                          <TicketIcon className="w-4 h-4" />
                          Kup bilet
                        </button>
                        <button className={cn(buttonVariants({ variant: "default", size: "sm" }), "flex items-center gap-1")}>
                          <BedIcon className="w-4 h-4" />
                          Rezerwuj nocleg
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {idx === trip.destinations.length - 1 && (
                  <div className="bg-[#f5f5f5] rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-2">
                      <StarIcon className="w-5 h-5 text-primary mt-0.5" />
                      <p className="text-sm text-gray-700">Jesteś na miejscu! Dobra robota. Pamiętaj, żeby w wolnej chwili odwiedzić pobliskie wodospady 💦</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
