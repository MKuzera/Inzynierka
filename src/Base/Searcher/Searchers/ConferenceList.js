import React, { useState, useEffect } from 'react';
const formatConferences = (conferences) => {
    console.log("do mapowania" + conferences)
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


    useEffect(() => {
        const formattedConferences = formatConferences(conferencesData);
        setConferences(formattedConferences);
    }, [conferencesData]);

    return (
        <ul>
            {conferences.map((conference) => (
                <li key={conference.id} className="conference-item">
                    <h3>{conference.title}</h3>
                    <p><strong>Opis:</strong> {conference.description}</p>
                    <p><strong>Miejsce:</strong> {conference.location}</p>
                    <p><strong>Organizator:</strong> {conference.organizers}</p>
                    <p><strong>Tagi:</strong> {conference.tags}</p>
                    <p><strong>Cena:</strong> ${conference.price}</p>
                    <p><strong>Data:</strong> {conference.date}</p>
                    <p><strong>Odnośnik:</strong> <a href={conference.link} target="_blank" rel="noopener noreferrer">Zobacz więcej</a></p>
                </li>
            ))}
        </ul>
    );
};

export default ConferenceList;
