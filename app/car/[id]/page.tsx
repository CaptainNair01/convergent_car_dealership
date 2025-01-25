import type { Metadata } from "next";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

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
  image?: string;
  description: string;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Car #${params.id} | Convergent Car Dealership`,
  };
}

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await fetch(`https://dealership.naman.zip/car/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="p-4">
        <p className="text-red-500">Car not found or error fetching data.</p>
        <Link href="/" className="inline-block text-indigo-600 mt-4 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const data = await res.json();
  let finalImage = data.image ?? "";
  
  if (finalImage && !finalImage.startsWith("http")) {
    finalImage = `https://dealership.naman.zip${finalImage}`;
  }

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

          {/* Buttons row with spacing */}
          <div className="mt-6 flex items-center gap-4">
            <AddToCartButton car={car} />
            <Link
              href="/"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
