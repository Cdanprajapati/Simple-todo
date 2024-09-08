import React from 'react'

const Input = ({key, type, name, value, onChange, placeholder, Label}) => {

    const sty = 'px-2 font-medium focus:outline-none rounded-md my-1 border border-slate-200 w-full';
    const labelsty = 'ml-1';

    return (
        <div key={key} className='my-2 w-full'>
            <label className={labelsty}>{Label}</label>
            <input
                type={type}
                name={name}
                value={value}
                className={sty}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input