import React, {useState} from 'react';
import {SpeakersToolBar} from "./SpeakersToolBar";
import {SpeakersList} from "./SpeakersList";
import {data} from "../../SpeakerData";
import {SpeakerFilterProvider} from "../context/SpeakerFilterContext";

function Speakers({theme, setTheme}) {
    /* Created ShowSession here as it is used by both Speakers Toolbar
    * and SpeakersList
    * Keeping the state close to its childs. Wrapped app a level top, as show Session was not reqd there.*/
    const [showSession, setShowSessions] = useState(true);
    return (
        <>

            {/*<SpeakersToolBar theme={theme} setTheme={setTheme} showSession={showSession}*/}
            {/*setShowSessions={setShowSessions}/>*/}

            {/** Implementing with context so no prop needed here*/}
            <SpeakerFilterProvider startingShowSessions={false}>
                <SpeakersToolBar/>
                <SpeakersList/>
            </SpeakerFilterProvider>


        </>
    );
}

export default Speakers;