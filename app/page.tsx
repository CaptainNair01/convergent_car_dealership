// app/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string; // <-- API returns image under "image"
}

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCars() {
      try {
        const res = await fetch(
          "https://dealership.naman.zip/cars/sort?key=price&direction=asc"
        );
        if (!res.ok) throw new Error("Failed to fetch cars");
        const data = await res.json();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getCars();
  }, []);

  // Filter by make/model/year whenever searchTerm changes
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = cars.filter((car) => {
      const make = car.make.toLowerCase();
      const model = car.model.toLowerCase();
      const year = car.year.toString();
      return make.includes(term) || model.includes(term) || year.includes(term);
    });
    setFilteredCars(results);
  }, [searchTerm, cars]);

  if (loading) {
    return <p className="text-center mt-8">Loading cars...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-indigo-800">
        Available Cars (Lowest Price First)
      </h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by make, model, or year..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-2/3 px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
          style={{ backgroundColor: "#EEF2FF" }} // Light indigo background
        />
      </div>

      {filteredCars.length === 0 && (
        <p className="text-gray-600">No cars match your search.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCars.map((car) => (
          <a
            key={car.id}
            href={`/car/${car.id}`}
            className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow transform hover:scale-[1.01]"
          >
            <div className="w-full h-48 overflow-hidden">
              {/* 
                Use the "image" property directly. 
                If your data is sometimes relative, you can check:
                  if (!car.image.startsWith('http')) { ... }
                But if it's always a valid URL, just use car.image.
              */}
              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 text-gray-800">
                {car.year} {car.make} {car.model}
              </h3>
              <p className="text-gray-700">
                Price:{" "}
                <span className="font-medium text-indigo-600">
                  ${car.price}
                </span>
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
