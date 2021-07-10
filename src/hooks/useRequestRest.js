import {useEffect, useState} from 'react';
import axios from 'axios';
/** Import this ain any file and check status accordingly */
export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
}
const restUrl="api/speakers"
function UseRequestRest() {
    const [data, setData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING)
    const [error, setError] = useState("");
    /** Delay Function*/
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    /** Delaying execution/loading of data by 2 seconds*/
    useEffect(() => {
        async function delayFunc() {
            try {
                const result=await axios.get(restUrl)
                setRequestStatus(REQUEST_STATUS.SUCCESS)
                setData(result.data);
            } catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e)
            }
        }

        delayFunc();
    }, [])

    // function onFavoriteToggle(id) {
    //     const speakersRecPrevious = speakersData.find(r => r.id == id);
    //     const speakerRecUpdated = {...speakersRecPrevious, favorite: !speakersRecPrevious.favorite}
    //     const speakersDataNew = speakersData.map(speaker => {
    //         return speaker.id == id ? speakerRecUpdated : speaker;
    //     })
    //     setSpeakersData(speakersDataNew);
    // }


    /** From onFavoriteToggle, made this as generic fucntion and introduced
     * delay to simulate real world delays
     * using a callback here so that when onfavorite toggle is called from speaker favorite
     * and it renders its icon, we can tell him to stop, when our update is done here*/

    function updateRecord(record, doneCallback) {
        /* Using orig records as if data fails then you can roll back to orig state
        * FB,Twitter way of handling*/
        const origRecords = [...data];
        const newRecords = data.map(function (rec) {
            return rec.id === recordUpdated.id ? recordUpdated : rec
        })

        async function delayFunction() {
            try {
                setData(newRecords);
                const result=await axios.put(`${restUrl}/${record.id}`,record)
                if (doneCallback) {
                    doneCallback()
                }
            } catch (e) {
                console.error("error thrown inside delay function", e);
                if (doneCallback) {
                    doneCallback()
                }
                setData(origRecords);
            }

        }

        delayFunction()
    }

    function insertRecord(record, doneCallback) {
        /* Using orig records as if data fails then you can roll back to orig state
        * FB,Twitter way of handling*/
        const origRecords = [...data];
        const newRecords = [record, ...data]

        async function delayFunction() {
            try {
                setData(newRecords);
                const result=await axios.post(`${restUrl}/99999`,record)
                if (doneCallback) {
                    doneCallback()
                }
            } catch (e) {
                console.error("error thrown inside delay function", e);
                if (doneCallback) {
                    doneCallback()
                }
                setData(origRecords);
            }

        }

        delayFunction()
    }

    function deleteRecord(record, doneCallback) {
        /* Using orig records as if data fails then you can roll back to orig state
        * FB,Twitter way of handling*/
        const origRecords = [...data];
        const newRecords = data.filter(r => r.id != record.id)

        async function delayFunction() {
            try {
                setData(newRecords);
                const result=await axios.delete(`${restUrl}/${record.id}`,record)
                if (doneCallback) {
                    doneCallback()
                }
            } catch (e) {
                console.error("error thrown inside delay function", e);
                if (doneCallback) {
                    doneCallback()
                }
                setData(origRecords);
            }

        }

        delayFunction()
    }


    return {
        data, requestStatus, error, updateRecord, insertRecord, deleteRecord
    }

}

export default UseRequestRest;