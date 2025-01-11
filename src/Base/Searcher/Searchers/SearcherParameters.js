import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext/AuthContext';
import { CallChatGptAsync } from '../../ChatGptService/ChatGpt';
import { GetConferences } from '../../ApiServices/ConferenceService';
import ConferenceList from "./ConferenceList";

const SearcherParameters = () => {
    const [shortDescription, setShortDescription] = useState('');
    const [tags, setTags] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { authState } = useAuth();
    const [output, setOutput] = useState('');
    const [outputArray, setOutputArray] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (output) {
            try {
                const parsedData = JSON.parse(output);
                setOutputArray(parsedData);
            } catch (error) {
                console.error("Błąd podczas parsowania JSON:", error);
            }
        }
    }, [output]);

    const handleSearch = async (e) => {
        e.preventDefault();

        console.log("Opis krótki:", shortDescription);
        console.log("Tagi:", tags);
        console.log("Zakres cenowy:", { minPrice, maxPrice });
        console.log("Zakres dat:", { startDate, endDate });

        try {
            const conferences = await GetConferences(authState.token);
            const formattedConferences = conferences.map((conference) => ({
                ...conference,
                tags: conference.tags,
                date: new Date(conference.date).toLocaleDateString(),
            }));
            const prompt = `
            Wyszukaj mi najbardziej dopasowane  konferecje (maksymalnie 5, bez powtarzania) do podanych parametrów
            Parametry:
            Opis krótki: ${shortDescription}
            Tagi: ${tags} 
            Zakres cenowy: ${minPrice} - ${maxPrice}
            Zakres dat: ${startDate} - ${endDate}

            Spośród tych:
            ${formattedConferences.map(conference => `
            Tytuł: ${conference.title}
            Data: ${conference.date}
            Opis: ${conference.description}
            Organizatorzy: ${conference.organizers}
            Miejsce: ${conference.location}
            Tagi: ${conference.tags}
            link: ${conference.link}
            Cena: ${conference.price}`).join("\n")}
            ZWRÓC TYLKO WYNIKI W FORMACIE JSON bez {"conferences":} [{},{}], title, date, description, tags(jako string z przecinkami), price, link, organizers, location `;

            setLoading(true);
            const response = await CallChatGptAsync(prompt);

            setOutput(response || "Brak odpowiedzi");

        } catch (err) {
            setError('Wystąpił błąd podczas wyszukiwania konferencji');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="searcher-column">
            <h3>Szukaj po Parametrach</h3>
            <label>Opis krótki:</label>
            <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
            />
            <label>Wybierz Tagi:</label>
            <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <label>Zakres ceny:</label>
            <div className="price-range">
                <div>
                    <label>OD:</label>
                    <input
                        type="number"
                        placeholder="Minimalna cena w PLN"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>DO:</label>
                    <input
                        type="number"
                        placeholder="Maksymalna cena w PLN"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>
            <label>Zakres dat:</label>
            <div className="date-range">
                <div>
                    <label>OD:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>DO:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={handleSearch}>Szukaj</button>

            {loading && <p>Ładowanie...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {outputArray && Array.isArray(outputArray) && outputArray.length > 0 ? (
                <ConferenceList conferencesData={outputArray} />
            ) : (
                output && <p>{output}</p>
            )}
        </div>
    );
};

export default SearcherParameters;
