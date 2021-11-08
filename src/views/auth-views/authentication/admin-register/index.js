import React, { useState } from 'react';

//CSS
import './index.css';

//Components
import AdminSignUpForm from 'views/auth-views/components/admin-register/AdminRegister';

//Hooks
import { Row, Col, Steps, Button, message } from 'antd';
import QueueAnim from 'rc-queue-anim';

const { Step } = Steps;

const steps = [
    {
        title: 'First',
    },
    {
        title: 'Second',
    },
    {
        title: 'Third',
    },
    {
        title: 'Last',
    },
];

class adminSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            buttonAnim: true
        }
    }

    next = () => {
        this.setState({ current: this.state.current + 1 });
    };

    prev = () => {
        this.setState({ current: this.state.current - 1 });
    };

    render() {

        return (
            <div className=" w-100">
                <Row align="middle" justify="center" className="container">
                    <Col>
                        <h1>Admin Register</h1>

                        <Steps current={this.state.current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>

                        < AdminSignUpForm current={this.state.current} />

                        {this.state.buttonAnim == true && (

                            <div className="steps-action">
                                {this.state.current > 0 && (

                                    <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                                        Previous
                                    </Button>

                                )}
                                {this.state.current < steps.length - 1 && (
                                    <Button type="primary" onClick={() => this.next()}>
                                        Next
                                    </Button>
                                )}
                                {this.state.current === steps.length - 1 && (
                                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                        Done
                                    </Button>
                                )}
                            </div>

                        )}

                    </Col>
                </Row>

            </div >
        )
    }

}


export default adminSignUp
