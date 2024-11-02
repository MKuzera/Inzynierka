import React, { useState } from 'react';
import './SearcherByWork.css';

const SearcherByWork = () => {
    const [selectedWork, setSelectedWork] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const works = [
        {
            title: "Praca Naukowa 1",
            author: "Jan Kowalski",
            authorId: "12345",
            description: "Opis pracy naukowej 1.",
            tags: ["biologia", "chemia"],
            dateAdded: "2024-10-01",
        },
        {
            title: "Praca Naukowa 2",
            author: "Anna Nowak",
            authorId: "67890",
            description: "Opis pracy naukowej 2.",
            tags: ["fizyka", "astronomia"],
            dateAdded: "2024-09-25",
        },
        {
            title: "Praca Naukowa 3",
            author: "Piotr Zieliński",
            authorId: "54321",
            description: "Opis pracy naukowej 3.",
            tags: ["matematyka", "informatyka"],
            dateAdded: "2024-10-15",
        }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (selectedWork) {
            console.log("Wybrana praca:", selectedWork);
            console.log("Zakres cenowy:", { minPrice, maxPrice });
            console.log("Zakres dat:", { startDate, endDate });
        }
    };

    return (
        <div className="searcher-output">
            <h3>Szukaj na podstawie twojej pracy</h3>
            {works.map((work, index) => (
                <div key={index} className="work-item">
                    <label>
                        <input
                            type="radio"
                            name="work"
                            checked={selectedWork === work.title}
                            onChange={() => setSelectedWork(work.title)}
                        />
                        {work.title} - {work.author} ({work.dateAdded})
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
        </div>
    );
};

export default SearcherByWork;
