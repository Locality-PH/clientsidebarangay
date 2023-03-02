import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const About = ({ about, width }) => {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setIsLoading(false);
  }, [about]);

  return (
    <>
      <Card
        className={`${width > 991 ? null : `borderless`}`}
        title="About"
        loading={isLoading}
      >
        <h4 className="text-muted">{about}</h4>
        <div className="mt-3">
          <Link to={`${location.pathname}/about`}>
            <Button
              type="primary"
              shape="round"
              style={{ width: "100%", height: "3rem" }}
            >
              Learn More
            </Button>
          </Link>
        </div>
      </Card>
    </>
  );
};

export default About;
