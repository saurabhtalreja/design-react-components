import React, {createContext, useState} from 'react';
import useSpeakerFilter from "../hooks/useSpeakerFilter";

const SpeakerFilterContext = createContext();

function SpeakerFilterProvider({children, startingShowSessions = false, startingEventYear = "2019"}) {
    /* Custom Hook that has our useState*/
    const {
        showSessions,
        setShowSessions,
        eventYear,
        setEventYear,
        searchQuery,
        setSearchQuery, EVENT_YEARS
    } = useSpeakerFilter(startingShowSessions, startingEventYear);


    return (
        <SpeakerFilterContext.Provider value={{
            showSessions, setShowSessions,
            eventYear,
            setEventYear,
            searchQuery,
            setSearchQuery, EVENT_YEARS
        }}>
            {children}
        </SpeakerFilterContext.Provider>
    )
}

export {SpeakerFilterProvider, SpeakerFilterContext};