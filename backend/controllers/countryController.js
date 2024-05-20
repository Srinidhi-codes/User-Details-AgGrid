import { Country } from '../models/country.js';

export const countryController = async (req, res) => {
    try {
        const countries = await Country.find().populate('states');
        res.send(countries);
    } catch (error) {
        console.error('Error fetching countries data', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};