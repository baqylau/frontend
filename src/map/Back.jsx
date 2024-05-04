import React from 'react';
import { Link } from 'react-router-dom'

function Back(props) {
    return (
        <div className='fixed z-10 top-10 left-10'>
                <Link
        to="/organization"
        type="button"
        className="mt-10 rounded-md bg-indigo-500 px-5 py-2 text-xl text-end right-0 font-semibold text-white shadow-sm hover:bg-indigo-400 "
       
        >
        Назад
      </Link>
        </div>
    );
}

export default Back;