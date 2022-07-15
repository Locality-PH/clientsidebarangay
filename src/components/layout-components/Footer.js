import React from "react";
import { APP_NAME } from "configs/AppConfig";

export default function Footer() {
  console.log(window.location.hostname);

  return (
    <footer className="footer">
      <span>
        Copyright &copy; {`${new Date().getFullYear()}`}{" "}
        <span className="font-weight-semibold">{`${APP_NAME}`}</span> All rights
        reserved.
      </span>
      <div>
        <a
          className="text-gray"
          href={`http://${window.location.hostname}:${window.location.port}/support/term-condition`}
        >
          Term & Conditions
        </a>
        <span className="mx-2 text-muted"> | </span>
        <a
          className="text-gray"
          href={`http://${window.location.hostname}:${window.location.port}/support/privacy-policy`}
        >
          Privacy & Policy
        </a>
      </div>
    </footer>
  );
}
