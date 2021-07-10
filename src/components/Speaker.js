import React, {memo, useContext, useState} from "react";
import {SpeakerFilterContext} from "../context/SpeakerFilterContext";
import {SpeakerContext, SpeakerProvider} from "../context/SpeakerContext";
import SpeakerDelete from './SpeakerDelete'
import ErrorBoundary from "./ErrorBoundary";

function Session({

                     title,
                     room: {name: room}

                 }) {
    return (
        <span className="session w-100">
      {title}
            <strong>Room: {room}</strong>
    </span>
    );
}

function Sessions() {
    const {eventYear} = useContext(SpeakerFilterContext);
    const {speaker: {sessions}} = useContext(SpeakerContext);
    return (
        <div className="sessionBox card h-250">
            {sessions.filter(session => {
                return session.eventYear = eventYear;
            }).map(session => {
                return (<div className="session w-100" key={session.id}>
                    <Session {...session}/>
                </div>)
            })}

        </div>
    );
}

function ImageWithFallback({src, ...props}) {
    const [error, setError] = useState(false);
    const [imgSrc, setImgSrc] = useState(src);

    function onError() {
        if (!error) {
            setImgSrc("/images/speaker-99999.jpg");
            setError(true);
        }
    }

    return <img src={imgSrc} {...props} onError={onError}/>;
}

function SpeakerImage() {
    const {
        speaker: {id, first, last},
    } = useContext(SpeakerContext);
    return (
        <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
            <ImageWithFallback
                className="contain-fit"
                src={`/images/speaker-${id}.jpg`}
                width="300"
                alt={`${first} ${last}`}
            />
        </div>
    );
}

// function SpeakerFavorite({favorite, onFavoriteToggle}) {
function SpeakerFavorite() {
    const {speaker, updateRecord} = useContext(SpeakerContext);
    const [inTransition, setInTransition] = useState(false);

    function doneCallback() {
        setInTransition(false)
    }

    return (
        <div className="action padB1">
            <span onClick={() => {
                setInTransition(true)
                // return onFavoriteToggle(doneCallback)
                updateRecord({...speaker, favorite: !speaker.favorite}, doneCallback)
            }}>
                <i className={speaker.favorite ? "fa fa-star orange" : "fa fa-star-o orange"}/>
                {" "}Favorite{" "}
                {inTransition ? (<span className="fas fa-circle-notch fa-spin"></span>) : null}
            </span>
        </div>
    );
}

// const SpeakerDemographics = ({first, last, bio, company, twitterHandle, favorite, onFavoriteToggle}) => {
const SpeakerDemographics = () => {
    const {speaker: {first, last, bio, company, twitterHandle, favorite}} = useContext(SpeakerContext);
    return (<div className="speaker-info">
        <div className="d-flex justify-content-between mb-3">
            <h3 className="text-truncate w-200">
                {first} {last}
            </h3>
        </div>
        {/*<SpeakerFavorite favorite={favorite} onFavoriteToggle={onFavoriteToggle}/>*/}
        <SpeakerFavorite/>
        <div>
            <p className="card-description">{bio.substr(0, 70)}</p>
            <div className="social d-flex flex-row mt-4">
                <div className="company">
                    <h5 className="">Company</h5>
                    <h6 className="">{company}</h6>

                </div>
                <div className="twitter">
                    <h5 id="">
                        Twitter
                    </h5><h6 id="">
                    {twitterHandle}
                </h6>
                </div>
            </div>
        </div>
        <div>
            <p>
                {bio} {company} {twitterHandle} {favorite}
            </p>
        </div>
    </div>)
}

/* Memo is used to cache, and only re-renders when props changes,
 only first level changes are noticed, but here speaker is object
* so it can't be determined we need to create custom function*/
const SpeakerNoErrorBoundary = memo(function Speaker({
                                                         speaker,
                                                         updateRecord,
                                                         insertRecord,
                                                         deleteRecord,
                                                         showErrorCard,
                                                     }) {
        const { showSessions } = useContext(SpeakerFilterContext);
        console.log(`speaker: ${speaker.id} ${speaker.first} ${speaker.last}`);
        if (showErrorCard) {
            return (
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
                    <div className="card card-height p-4 mt-4">
                        <img src="/images/speaker-99999.jpg" />
                        <div>
                            <b>Error Showing Speaker</b>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <SpeakerProvider
                speaker={speaker}
                updateRecord={updateRecord}
                insertRecord={insertRecord}
                deleteRecord={deleteRecord}
            >
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
                    <div className="card card-height p-4 mt-4">
                        <SpeakerImage />
                        <SpeakerDemographics />
                    </div>
                    {showSessions === true ? <Sessions /> : null}
                    <SpeakerDelete />
                </div>
            </SpeakerProvider>
        );
    },
    areEqualSpeaker);

function Speaker(props) {
    return (
        <ErrorBoundary
            errorUI={
                <SpeakerNoErrorBoundary
                    {...props}
                    showErrorCard={true}
                ></SpeakerNoErrorBoundary>
            }
        >
            <SpeakerNoErrorBoundary {...props}></SpeakerNoErrorBoundary>
        </ErrorBoundary>
    );
}
function areEqualSpeaker(prevprop, newprop) {
    return (prevprop.speaker.favorite == newprop.speaker.favorite)
}

export default Speaker;