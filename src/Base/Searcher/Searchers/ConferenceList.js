import React, { useState, useEffect } from 'react';
import './ConferenceList.css';
const formatConferences = (conferences) => {
    return conferences.map((conference, index) => ({
        id: index,
        title: conference.title,
        description: conference.description,
        location: conference.location || 'Brak lokalizacji',
        organizers: conference.organizers || 'Brak organizatorów',
        tags: conference.tags,
        price: conference.price,
        date: conference.date,
        link: conference.link
    }));
};

const ConferenceList = ({ conferencesData }) => {
    const [conferences, setConferences] = useState([]);
    const [expandedConference, setExpandedConference] = useState(null);

    useEffect(() => {
        const formattedConferences = formatConferences(conferencesData);
        setConferences(formattedConferences);
    }, [conferencesData]);

    const toggleConferenceDetails = (id) => {
        setExpandedConference((prevId) => (prevId === id ? null : id));
    };

    return (
        <ul className="conference-list">
            {conferences.map((conference) => (
                <li key={conference.id} className="conference-item">
                    <div className="conference-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ flex: '1' }}>{conference.title}</h3>
                        {expandedConference !== conference.id && (
                            <button
                                className="toggle-button"
                                onClick={() => toggleConferenceDetails(conference.id)}
                                style={{ marginLeft: '10px' }}
                            >
                                Rozwiń
                            </button>
                        )}
                        {expandedConference === conference.id && (
                            <div className="conference-details" style={{ marginLeft: '20px', flex: '2' }}>
                                <p><strong>Opis:</strong> {conference.description}</p>
                                <p><strong>Miejsce:</strong> {conference.location}</p>
                                <p><strong>Organizator:</strong> {conference.organizers}</p>
                                <p><strong>Tagi:</strong> {conference.tags}</p>
                                <p><strong>Cena:</strong> {conference.price}$</p>
                                <p><strong>Data:</strong> {conference.date}</p>
                                <p><strong>Odnośnik:</strong> <a href={conference.link} target="_blank" rel="noopener noreferrer">Zobacz więcej</a></p>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ConferenceList;
