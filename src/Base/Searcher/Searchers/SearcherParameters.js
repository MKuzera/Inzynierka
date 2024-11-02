import React, { useState } from 'react';

const SearcherParameters = () => {
    const [shortDescription, setShortDescription] = useState('');
    const [tags, setTags] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Opis krótki:", shortDescription);
        console.log("Tagi:", tags);
        console.log("Zakres cenowy:", { minPrice, maxPrice });
        console.log("Zakres dat:", { startDate, endDate });
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
        </div>
    );
};

export default SearcherParameters;
