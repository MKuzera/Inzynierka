import React, {useEffect, useState} from 'react';
import './SearcherByWork.css';
import {useAuth} from "../../AuthContext/AuthContext";
import {GetDocumentsByAuthorID} from "../../ApiServices/DocumentService";
import {GetConferences} from "../../ApiServices/ConferenceService";
import {CallChatGptAsync} from "../../ChatGptService/ChatGpt";
import  {GetDocument} from "../../ApiServices/DocumentService";
import ConferenceList from "./ConferenceList";

const SearcherByWork = () => {
    const [selectedWork, setSelectedWork] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { authState } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [output, setOutput] = useState('');
    const [outputArray, setOutputArray] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (authState.userID) {
            GetDocumentsByAuthorID(authState.userID, authState.token)
                .then((data) => {
                    const formattedData = data.map(doc => ({
                        ...doc,
                        tags: doc.tags.split(',').map(tag => tag.trim()),
                        dateAdded: new Date(doc.dateAdded).toLocaleDateString(),
                    }));
                    setDocuments(formattedData);
                })
                .catch((error) => {
                    console.error('Błąd podczas pobierania dokumentów:', error);
                });
        }
    }, [authState.userID]);

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
        if (selectedWork) {
            console.log("Wybrana praca:", selectedWork);
            console.log("Zakres cenowy:", { minPrice, maxPrice });
            console.log("Zakres dat:", { startDate, endDate });
        }

        try {
            const conferences = await GetConferences(authState.token);

            const formattedConferences = conferences.map((conference) => ({
                ...conference,
                tags: conference.tags,
                date: new Date(conference.date).toLocaleDateString(),
            }));

            const document = await GetDocument(selectedWork,authState.token);

            const prompt = `
            Wyszukaj mi najbardziej dopasowane  konferecje (maksymalnie 5, bez powtarzania) do podanych parametrów
            Parametry:
            Zakres cenowy: ${minPrice} - ${maxPrice}
            Zakres dat: ${startDate} - ${endDate}
            
            Temat pracy: ${document.title}
            Opis: ${document.description}
            Tagi: ${document.tags}
            
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
            ZWRÓC TYLKO WYNIKI W FORMACIE JSON bez {"conferences":} [{},{}], title, date, description, tags(jako string z przecinkami), price, link, organizers, location
            `;

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
        <div className="searcher-output">
            <h3>Szukaj na podstawie twojej pracy</h3>
            {documents.map((work, index) => (
                <div key={index} className="work-item">
                    <label>
                        <input
                            type="radio"
                            name="work"
                            checked={selectedWork === work.id}
                            onChange={() => setSelectedWork(work.id)}
                        />
                        {work.title} - {work.author} ID: {work.id} ({work.dateAdded})
                    </label>
                </div>
            ))}
            <div className="price-range">
                <label>Zakres ceny:</label>
                <div className="price-range-inputs">
                    <div>
                        <label>OD:</label>
                        <input
                            type="number"
                            placeholder="Minimalna cena"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>DO:</label>
                        <input
                            type="number"
                            placeholder="Maksymalna cena"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="date-range">
                <label>Zakres dat:</label>
                <div className="date-range-inputs">
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
            </div>
            <button type="submit" onClick={handleSearch}>Szukaj</button>
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

export default SearcherByWork;
