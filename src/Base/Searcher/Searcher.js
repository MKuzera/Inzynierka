import React, { useState } from 'react';
import SearcherParameters from './Searchers/SearcherParameters';
import SearcherByWork from './Searchers/SearcherByWork';
import './Searcher.css';

const Searcher = () => {
    const [isParameters, setIsParameters] = useState(true);

    const handleToggle = () => {
        setIsParameters(!isParameters);
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div className="searcher-container">
            <form onSubmit={handleSearch} className="searcher-form">
                <div className="searcher-columns">
                    <div className="searcher-input">
                        <button type="button" onClick={handleToggle}>
                            {isParameters ? 'Przełącz na wyszukiwanie według pracy' : 'Przełącz na wyszukiwanie według parametrów'}
                        </button>
                        {isParameters ? <SearcherParameters /> : <SearcherByWork />}

                    </div>
                </div>
            </form>
        </div>
    );
};

export default Searcher;
