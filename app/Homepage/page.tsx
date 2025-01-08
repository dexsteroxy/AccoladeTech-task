




"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";


interface Country {
  name: { common: string };
  flags: { png: string };
  capital?: string[];
  region: string;
  population: number;
  area: number;
  gdp?: number; // Add GDP if available
}

const CountriesPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [apiError, setApiError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);// Add loading state
  const countriesPerPage = 16;

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setApiError(null); // Start loading
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (e) {
        setApiError("Unable to fetch countries. Please try again later." );
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchCountries();
  }, []);

  // Search filtering and sorting by country name
  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

 // Handle search error when no countries match the query
 useEffect(() => {
  if (!loading && searchQuery && filteredCountries.length === 0) {
    setSearchError("No countries found matching your search.");
  } else {
    setSearchError(null); // Clear search error
  }
}, [searchQuery, filteredCountries, loading]);


  // Pagination logic
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Add or remove countries for comparison
  const toggleCountrySelection = (country: Country) => {
    if (selectedCountries.some((c) => c.name.common === country.name.common)) {
      setSelectedCountries(
        selectedCountries.filter((c) => c.name.common !== country.name.common)
      );
    } else if (selectedCountries.length < 2) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  return (
    <div className="p-4">
     <Navbar />
      <h1 className="text-2xl font-bold text-center mb-4">
        Countries of the World
      </h1>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500 text-lg">Loading....</p>
        </div>
      ) : apiError ? (
        // API Error Message
        <div className="flex items-center justify-center h-40">
          <p className="text-red-500 text-lg">{apiError}</p>
        </div>
      ) : (
        <>
          {/* Search Input */}
          <div className="flex items-center justify-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border border-gray-500 rounded-md p-2 w-[80%] md:w-[480px] placeholder:italic focus:outline-none"
              placeholder="Search for countries..."
            />
          </div>

            {/* Search Error Message */}
            {searchError && (
            <div className="text-center text-red-500 mb-4">
              {searchError}
            </div>
          )}

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-500">
              <thead>
                <tr>
                  <th className="border-b border-gray-500 px-4 py-2">Flag</th>
                  <th className="border-b border-gray-500 px-4 py-2">Name</th>
                  <th className="border-b border-gray-500 px-4 py-2">Capital</th>
                  <th className="border-b border-gray-500 px-4 py-2">Region</th>
                  <th className="border-b border-gray-500 px-4 py-2">
                    Population
                  </th>
                  <th className="border-b border-gray-500 px-4 py-2">Select</th>
                </tr>
              </thead>
              <tbody>
                {currentCountries.map((country, index) => (
                  <tr key={index}>
                    <td className="border-b border-gray-500 px-4 py-2">
                      {country.flags?.png && (
                        <Image
                          src={country.flags.png}
                          alt={`Flag of ${country.name.common}`}
                          width={50}
                          height={30}
                          className="rounded"
                        />
                      )}
                    </td>
                    <td className="border-b border-gray-500 px-4 py-2">
                    <Link href={`/country/${encodeURIComponent(country.name.common.toLowerCase())}`}>
  <p className="text-blue-500">{country.name.common}</p>
</Link>
                    </td>
                    <td className="border-b border-gray-500 px-4 py-2">
                      {country.capital ? country.capital[0] : "N/A"}
                    </td>
                    <td className="border-b border-gray-500 px-4 py-2">
                      {country.region}
                    </td>
                    <td className="border-b border-gray-500 px-4 py-2">
                      {country.population.toLocaleString()}
                    </td>
                    <td className="border-b border-gray-500 px-4 py-2">
                      <button
                        onClick={() => toggleCountrySelection(country)}
                        className={`px-4 py-2 rounded ${
                          selectedCountries.some(
                            (c) => c.name.common === country.name.common
                          )
                            ? "bg-red-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {selectedCountries.some(
                          (c) => c.name.common === country.name.common
                        )
                          ? "Deselect"
                          : "Select"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Comparison Section */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-center mb-4">
              Country Comparison
            </h2>
            {selectedCountries.length === 2 ? (
              <div className="grid grid-cols-2 gap-4 border p-4 rounded-md">
                {selectedCountries.map((country, index) => (
                  <div key={index} className="border rounded p-4">
                    <h3 className="text-lg font-bold">{country.name.common}</h3>
                    <Image
                      src={country.flags.png}
                      alt={`Flag of ${country.name.common}`}
                      width={100}
                      height={60}
                      className="rounded mb-2"
                    />
                    <p>
                      <strong>Population:</strong>{" "}
                      {country.population.toLocaleString()}
                    </p>
                    <p>
                      <strong>Area:</strong>{" "}
                      {country.area.toLocaleString()} km²
                    </p>
                    <p>
                      <strong>GDP:</strong>{" "}
                      {country.gdp
                        ? `$${country.gdp.toLocaleString()}`
                        : "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Select two countries to compare their details.
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {filteredCountries.length > countriesPerPage && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  Prev
                </button>
                {Array.from(
                  {
                    length: Math.ceil(
                      filteredCountries.length / countriesPerPage
                    ),
                  },
                  (_, i) => (
                    <button
                      key={i}
                      className={`px-4 py-2 hidden border rounded ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white text-blue-500"
                      }`}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  )
                )}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredCountries.length / countriesPerPage)
                  }
                  className={`px-4 py-2 border rounded ${
                    currentPage ===
                    Math.ceil(filteredCountries.length / countriesPerPage)
                      ? "bg-gray-300 text-gray-500"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}
      <p className="  text-center text-gray-500 hover:text-white mt-4 cursor-pointer">Created by: Amadi Sixtus Tochukwu</p>
    </div>
  );
};

export default CountriesPage;


















