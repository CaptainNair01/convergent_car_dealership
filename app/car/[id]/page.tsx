// app/car/[id]/page.tsx
import type { Metadata } from "next";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  condition: string;
  mileage: number;
  fuel_type: string;
  transmission: string;
  color: string;
  vin: string;
  image?: string; // <-- "image" property from API
  description: string;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Car #${params.id} | Convergent Car Dealership`,
  };
}

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch data on the server
  const res = await fetch(`https://dealership.naman.zip/car/${id}`, {
    cache: "no-store", // or use defaults if you'd like caching
  });

  if (!res.ok) {
    return (
      <div className="p-4">
        <p className="text-red-500">Car not found or error fetching data.</p>
        <a href="/" className="inline-block text-indigo-600 mt-4 underline">
          Back to Home
        </a>
      </div>
    );
  }

  const data = await res.json();
  console.log("Server fetched car data:", data);

  // If "image" might be relative, fix it up
  let finalImage = data.image ?? "";
  if (finalImage && !finalImage.startsWith("http")) {
    finalImage = `https://dealership.naman.zip${finalImage}`;
  }

  // Build the "car" object with the corrected image
  const car: Car = { ...data, image: finalImage };

  return (
    <div className="bg-white border border-indigo-100 shadow-lg p-6 rounded-2xl">
      <div className="flex flex-col md:flex-row">
        {/* Car Image */}
        <div className="md:w-1/2 mb-4 md:mb-0 md:pr-6 flex justify-center items-center">
          {car.image ? (
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-auto object-cover rounded"
            />
          ) : (
            <p className="text-gray-600">No image available.</p>
          )}
        </div>

        {/* Car Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-3 text-indigo-800">
            {car.year} {car.make} {car.model}
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Price:{" "}
            <span className="font-semibold text-indigo-600">
              ${car.price}
            </span>
          </p>
          <ul className="space-y-1 text-gray-800">
            <li>
              <strong>Condition:</strong> {car.condition}
            </li>
            <li>
              <strong>Mileage:</strong> {car.mileage} miles
            </li>
            <li>
              <strong>Fuel Type:</strong> {car.fuel_type}
            </li>
            <li>
              <strong>Transmission:</strong> {car.transmission}
            </li>
            <li>
              <strong>Color:</strong> {car.color}
            </li>
            <li>
              <strong>VIN:</strong> {car.vin}
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            <strong>Description:</strong> {car.description}
          </p>

          <a
            href="/"
            className="inline-block mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
