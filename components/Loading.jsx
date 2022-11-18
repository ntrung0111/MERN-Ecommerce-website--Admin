import { Fragment } from "react";

const Loading = () => {
  return (
    <Fragment>
      <div className="loading-overlay"></div>
      <div className="loading-wrapper">
        <div className="loading-inner">
          <div className="spinner__border--container">
            <div className="spinner__border"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Loading;
