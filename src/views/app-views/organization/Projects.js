import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import { barangayProjectsData } from "./BarangayData";
import AvatarStatus from "components/shared-components/AvatarStatus";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProjects(barangayProjectsData);
    setIsLoading(false);
  }, [projects]);

  return (
    <>
      <Card title="Projects" loading={isLoading}>
        <div className="mb-3">
          <Row>
            <Col sm={24} md={22}>
              {projects.map((result, i) => {
                return (
                  <div
                    className={`${i === projects.length - 1 ? "" : "mb-4"}`}
                    key={`eduction-${i}`}
                  >
                    <AvatarStatus
                      src={result.img}
                      name={result.title}
                      subTitle={result.duration}
                    />
                    <p className="pl-5 mt-2 mb-0">{result.desc}</p>
                  </div>
                );
              })}
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
};

export default Projects;
