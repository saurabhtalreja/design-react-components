import Speaker from "./Speaker";
import ReactPlaceholder from 'react-placeholder';
import useRequestRest, {REQUEST_STATUS} from '../hooks/useRequestRest'
import {data} from '../../SpeakerData'
import {useContext} from "react";
import {SpeakerFilterContext} from "../context/SpeakerFilterContext";
import SpeakerAdd from "./SpeakerAdd";

export const SpeakersList = () => {

    /* Creating Custom Hook, so that the lifecycle and state becomes easy to manage here
    * Check what all is reqd for return function, return that from your custom hook
    * Not returning setMethods as they'll work within hook only*/

    // const {
    //     data: speakersData,
    //     requestStatus,
    //     error,
    //     updateRecord,
    //     insertRecord,
    //     deleteRecord
    // } = useRequestDelay(2000, data);
    const {
        data: speakersData,
        requestStatus,
        error,
        updateRecord,
        insertRecord,
        deleteRecord
    } = useRequestRest();

    const {searchQuery, eventYear} = useContext(SpeakerFilterContext)

    if (requestStatus == REQUEST_STATUS.FAILURE) {
        return (
            <div className="text-danger">
                Error<b>loading speaker data failed</b>
            </div>
        )
    }
    // if(isLoading) return <div>Loading...</div>

    /* Using React Placheolder to show initial loading skeleton*/
    return (<div className="container speakers-list">
        <ReactPlaceholder
            type="media"
            rows={15}
            className="speakerslist-placeholder"
            ready={requestStatus == REQUEST_STATUS.SUCCESS}>
            <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord}></SpeakerAdd>
            <div className="row">
                {speakersData.filter(speaker => {
                    return (speaker.first.toLowerCase().includes(searchQuery) || speaker.last.toLowerCase().includes(searchQuery))
                }).filter(speaker => {
                    return speaker.sessions.find((session) => {
                        return session.eventYear = eventYear
                    })
                }).map(entry => {
                    return (
                        <Speaker key={entry.id}
                                 speaker={entry}
                            // onFavoriteToggle={(doneCallback) => {
                            //     updateRecord({
                            //         ...entry,
                            //         favorite: !entry.favorite
                            //     }, doneCallback)
                            // }}
                                 updateRecord={updateRecord}
                                 insertRecord={insertRecord}
                                 deleteRecord={deleteRecord}
                        />
                    )

                })}
            </div>
        </ReactPlaceholder>
    </div>)
}