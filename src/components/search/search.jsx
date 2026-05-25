import { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange, clearSearch }) => {
    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        setSearch(null);
    }, [clearSearch]);

    const loadOptions = (inputValue) => {
        setLoading(true);
        setError("");

        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch cities");
                }
                return response.json();
            })
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),
                };
            })
            .catch((err) => {
                setError("Couldn't fetch city. Please try again!");

                return {
                    options: [],
                };
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        setError("");
        onSearchChange(searchData);
    };

    return (
        <div>
            <AsyncPaginate
                placeholder="Search for city"
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
            />

            {loading && <p>Loading city...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Search;