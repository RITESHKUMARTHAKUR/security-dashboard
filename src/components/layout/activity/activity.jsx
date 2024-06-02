import React from "react";
import { dashboard_data } from "../../../eve";
import { IoMdGrid } from "react-icons/io";
import { FiActivity } from "react-icons/fi";
import { SiSimpleanalytics } from "react-icons/si";
import { Link } from 'react-router-dom';
import { LuMountain } from "react-icons/lu";

const Activity = () => {
    return (
        <div className="flex">
            <div className="bg-gray-900 h-[calc(100vh-3rem)] text-white flex flex-col items-start p-6 gap-6 border-r border-gray-800 w-30 shrink-0">
                <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                >
                    <LuMountain />
                </Link>
                <nav className="flex flex-col gap-2 w-full">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-sm font-medium hover:bg-gray-800 px-3 py-2 rounded-md"
                        prefetch={false}
                    >
                        <IoMdGrid className="text-xl" />
                        Overview
                    </Link>
                    <Link
                        to="/analytics"
                        className="flex items-center gap-2 text-sm font-medium hover:bg-gray-800 px-3 py-2 rounded-md"
                    >
                        <SiSimpleanalytics className="text-xl" />
                        Analytics
                    </Link>

                    <Link
                        to="/activity"
                        className="flex items-center gap-2 text-sm font-medium hover:bg-gray-800 px-3 py-2 rounded-md"
                    >
                        <FiActivity className="text-xl" />
                        Activity
                    </Link>
                </nav>
            </div>
            <div>Analytics</div>
        </div>
    );
};

export default Activity;
