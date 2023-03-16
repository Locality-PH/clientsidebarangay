import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Avatar, Tooltip, Empty } from 'antd'
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import CustomAvatar from '../CustomAvatar';
import utils from 'utils';

const ModalCampaign = (props) => {
    const { isModalOpen, setIsModalOpen, participants = [] } = props
    const participantLength = participants.length
    const screenWidth = window.innerWidth

    var limit = 0
    var render = 0
    var others = 0

    if (screenWidth > 470) {
        limit = 7
    }

    else if (screenWidth > 360) {
        limit = 5
    }
    else limit = 3


    if (participantLength == limit) {
        render = limit
    }

    else if (participantLength < limit) {
        render = participantLength
    }

    else if (participantLength > limit) {
        render = limit
        others = participantLength - limit
    }


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // console.log("participants", participants)
    // console.log("render", render)
    // console.log("others", others)
    // console.log("participantLength", participantLength)

    return (
        <>
            <Modal
                title={(participantLength > 1 ?
                    `Participants: ${participantLength}` :
                    `Participant: ${participantLength}`
                )}
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {(participantLength > 0) ?
                    <>
                        <Avatar.Group
                            maxCount={limit + 1}
                            size="large"
                            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer', marginBottom: 5 }}
                        >
                            {participants.map(
                                (user, i) => {
                                    if (i < render) {
                                        let fullname = user.first_name + " " + user.last_name
                                        if (fullname == " ") fullname = user.email

                                        return (
                                            <CustomAvatar
                                                key={i}
                                                icon={utils.getNameInitial(fullname)}
                                                image={user?.profileUrl?.data}
                                                color={user?.profileLogo}
                                                size={60}
                                                style={{ fontSize: 20 }}
                                            // onClick={() => toParticipant()}
                                            // className="custom-hover-pointer"
                                            />
                                        )
                                    }
                                })

                            }

                            {(participantLength - limit > 0) &&
                                <Avatar
                                    size={60}
                                    style={{ color: "white", backgroundColor: 'rgb(54 75 101)', }}>
                                    +{others}
                                </Avatar>
                            }

                        </Avatar.Group>

                        <div className='mt-2'>
                            <h3 style={{ color: 'black', margin: 0 }}>
                                {(participantLength > 1 ?
                                    `Names: ` :
                                    `Name: `
                                )}
                            </h3>
                            {participants.map(

                                (user, i) => {
                                    let fullname = user.first_name + " " + user.last_name
                                    if (fullname == " ") fullname = user.email

                                    return <h4
                                        style={{
                                            wordBreak: "break-word",
                                        }}
                                        key={i}
                                    >
                                        {`${i + 1}. ${fullname}`}
                                    </h4>
                                }
                            )}
                        </div>

                    </>

                    :

                    <Empty description="There are no participants to show." />
                }
            </Modal>
        </>
    )
}

export default ModalCampaign