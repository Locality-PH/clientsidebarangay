import React, { Component } from 'react'

import ChangePassword from './ChangePassword'
import EmailVerification from './EmailVerification'


export class Security extends Component {
    render() {
        return (
            <div>
                <ChangePassword />
                <EmailVerification />
            </div>
        )
    }
}

export default Security
