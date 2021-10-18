import React from 'react'

const index = ({match}) => {
    return (
        <div>
            <h1>Barangay {match.params.name}</h1>
        </div>
    )
}

export default index
