import React, { useState } from 'react'


const InputRange = ({ inputName, playerPower, disabled, method }) => {
    // const [val, setVaule] = useState(playerPower);
    const handleChange = (e) => {
        const { value } = e.target;
        // console.log([name, value]);
        if (disabled) {
            method(playerPower)
        } else if (value === "") {
            method(0)
        } else if (value > 100) {
            method(100)
        } else {
            method(parseInt(value))
        }
    }
    return (

        <div className="flex flex-col space-y-2 p-2 w-full">
            <label className="font-bold text-gray-600">{inputName}</label>
            <div className="inline-flex space-x-2">

                <input type="range" className="w-11/12"
                    name={inputName} value={playerPower}
                    min="1" max="100" step="1"
                    onChange={(e) => handleChange(e)} />
                <input type="text" name={inputName + "-label"} className="w-1/12 text-center" value={playerPower} onChange={(e) => handleChange(e)} />

            </div>
        </div>
    )
}

export default InputRange