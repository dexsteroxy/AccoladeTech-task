import { FC } from "react";
import Navbar from "@/components/Navbar";

interface Country {
  name: { common: string };
  flags: { png: string };
  capital?: string[];
  region: string;
  population: number;
  languages?: { [key: string]: string };
  area: number;
}

interface CountryDetailPageProps {
  params: { name: string }; // `params` must not be optional because it's provided dynamically by Next.js
}

const CountryDetailPage: FC<CountryDetailPageProps> = async ({ params }) => {
  // Await params destructuring for dynamic routes
  const { name } = await params;

  if (!name) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Country Not Found</h1>
        <p>Missing country name in the route parameters.</p>
      </div>
    );
  }

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`);
    if (!res.ok) {
      throw new Error("Country not found");
    }

    const data = await res.json();
    const country: Country = data[0];

    return (
      <>
        <Navbar />
        <div className="p-4 flex items-center justify-center flex-col w-full h-screen">
          <h1 className="font-extrabold md:text-[48px] text-[28px] md:leading-[59px] mb-6">
            Country Details Page
          </h1>
          <div className="border border-gray-500 p-6 rounded-md">
            <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              height={90}
              className="rounded-md md:w-[350px]"
            />
            <p className="mt-2">
              <strong>Capital:</strong> {country.capital?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
            <p>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Area:</strong> {country.area.toLocaleString()} km²
            </p>
            <p>
              <strong>Languages:</strong>{" "}
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"}
            </p>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Country Not Found</h1>
        <p>We couldn't fetch details for the country "{name}".</p>
      </div>
    );
  }
};

export default CountryDetailPage;
