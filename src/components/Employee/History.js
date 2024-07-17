import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EmpValidate from './EmpValidate';

export default function History() {

    const user = EmpValidate()
    const [punchDetails, setPunchDetails] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/PunchDetails`)
            .then(response => setPunchDetails(response.data)

            )
            .catch(err => console.error(err));
    }, []);

   


    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }
    
function formatTimeFromTimestamp(timestamp) {
    const date = new Date(timestamp);

    // Get hours, minutes, and seconds
    const hours = ('0' + date.getHours()).slice(-2); // Ensure two digits (e.g., 03 instead of 3)
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    // Construct formatted time string
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedTime;
}
    return (
        <>
            <div className="bg-gradient-to-r from-gray-950 to-gray-800 text-white">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-2">

                        <Link to="/emp/Home" className="text-lg font-semibold">
                            <svg
                                className="w-6 h-6 mr-2 inline-block"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </Link>
                        <h1 className="text-lg font-semibold">Attendance Record</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            className="text-black py-2 px-4 bg-gray-200 rounded-full font-semibold text-sm"
                            type="button"
                            data-drawer-target="drawer-bottom-example"
                            data-drawer-show="drawer-bottom-example"
                            data-drawer-placement="bottom"
                            aria-controls="drawer-bottom-example"
                        >
                            MarkDigital
                        </button>
                    </div>
                </div>
            </div>

            {punchDetails.filter(e => e.empId === user._id).map(e => (
    <>
        <div className={`w-full max-w-md p-4 border border-gray-200 rounded-lg shadow sm:p-8 ${(!e.punchedInAt && !e.punchedOutAt) ? 'bg-red-300' : (e.punchedInAt && !e.punchedOutAt) ? 'bg-yellow-300' : 'bg-green-300'} darkk:bg-gray-800`}>

            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 darkk:divide-gray-700">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center">

                            <div className="flex-1 min-w-0 ms-4">
                                <p className="text-sm font-medium text-gray-900 truncate darkk:text-white">
                                    {formatDate(e.punchedInAt)}
                                </p>
                                <p className="text-sm text-gray-500 truncate darkk:text-gray-400">
                                    Punch In
                                </p>
                                <p className="text-sm text-gray-500 truncate darkk:text-gray-400">
                                    Punch Out
                                </p>
                            </div>
                            <div className="">
                                <p className="text-sm font-medium text-gray-900 truncate darkk:text-white">
                                    Status
                                </p>
                                <p className="text-sm text-gray-500 truncate darkk:text-gray-400">
                                    {e.punchedInAt ? formatTimeFromTimestamp(e.punchedInAt) : 'N/A'}
                                </p>
                                <p className="text-sm text-gray-500 truncate darkk:text-gray-400">
                                    {e.punchedOutAt ? formatTimeFromTimestamp(e.punchedOutAt) : 'Pending'}
                                </p>
                            </div>

                        </div>
                    </li>

                </ul>
            </div>
        </div>
    </>
))}



        </>)
}
