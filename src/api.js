export const geoApiOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
		'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
		'Content-Type': 'application/json'
	}
};

export const GEO_API_URL = import.meta.env.VITE_GEO_API_URL;


export const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;