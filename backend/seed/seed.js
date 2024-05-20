import mongoose from 'mongoose';
import axios from 'axios';
import { City, Country, State } from '../models/country.js';
import Db from '../config/db.js';

const fetchData = async () => {
    try {
        const response = await axios.get('https://countrystatecity.in/v1/countries', {
            headers: {
                'X-CSCAPI-KEY': 'your-api-key' // Replace 'your-api-key' with your actual API key
            }
        });
        const countries = response.data;
        return countries.map(country => ({ name: country.name }));
    } catch (error) {
        console.error('Error fetching country data', error);
        throw error;
    }
};

export const seedData = async () => {
    Db()
    try {
        const data = await fetchData();
        for (const countryData of data) {
            const country = new Country({ name: countryData.name });
            await country.save();

            // Assuming you have a states array for each country, modify this as per your schema
            if (!Array.isArray(countryData.states)) {
            }

            for (const stateData of countryData.states) {
                const state = new State({ name: stateData.name, country: country._id });
                await state.save();

                // Assuming you have a cities array for each state, modify this as per your schema
                if (!Array.isArray(stateData.cities)) {
                    console.warn(`Skipping state without cities array: ${stateData.name}`);
                    continue;
                }

                for (const cityName of stateData.cities) {
                    const city = new City({ name: cityName, state: state._id });
                    await city.save();
                }
            }
        }

        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error seeding data', error);
    } finally {
        mongoose.connection.close();
    }
};
