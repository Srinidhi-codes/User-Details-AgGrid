import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema({
    name: String,
    state_code: String,
    latitude: String,
    longitude: String,
    type: String,
});

const countrySchema = new mongoose.Schema({
    name: String,
    iso3: String,
    iso2: String,
    numeric_code: String,
    phone_code: String,
    capital: String,
    currency: String,
    currency_name: String,
    currency_symbol: String,
    tld: String,
    native: String,
    region: String,
    region_id: String,
    subregion: String,
    subregion_id: String,
    nationality: String,
    latitude: String,
    longitude: String,
    emoji: String,
    emojiU: String,
    states: [stateSchema],
    translations: Object,
    timezones: [Object],
});

const State = mongoose.model('State', stateSchema);
const Country = mongoose.model('Country', countrySchema);

export { Country, State };
