import React, { useState, useEffect } from 'react'
import { Card, Avatar } from 'antd';
import { barangayOfficialsData } from '../BarangayData';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { Link } from 'react-router-dom';
import utils from "utils";
import { COLORS } from "constants/ChartConstant";

const Officials = ({ organizationMembers }) => {
	const [officials, setOfficials] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setOfficials(barangayOfficialsData)
		setIsLoading(false)
	}, [officials])

	return (
		<>
			<Card title="Barangay Officials" loading={isLoading} extra={<Link to="/app/dashboards/barangay-list" style={{ fontSize: "1rem" }}>More</Link>}>
				{
					organizationMembers.map((result, i) => {
						return (
							<div
								key={i}
								className={`d-flex align-items-center justify-content-between mb-4`}
							>
								<div className="avatar-status d-flex align-items-center">
									<Avatar
										size={40}
										className="font-size-sm"
										style={{ backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)] }}
									>
										{utils.getNameInitial(result.email)}
									</Avatar>

									<div className="ml-2">
										<div>
											<div className="avatar-status-name">{result.email}</div>
											<span>{ }</span>
										</div>
										<div className="text-muted avatar-status-subtitle">{result.role}</div>
									</div>
								</div>
							</div>
						)
					})
				}
			</Card>
		</>
	)
}

export default Officials
