import React, { Component } from "react";
import AvatarImageCr from "react-avatar-image-cropper";

import "./index.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faWindowClose } from "@fortawesome/free-solid-svg-icons";

const imgStyles = {
  width: "250px",
  height: "250px",
  margin: "1em",
  border: "1px solid black"
};

const actions = [
  <button key={0} className="button close-button-icon" type="button">
    <FontAwesomeIcon icon={faWindowClose} />
  </button>,
  <button key={1} type="button" className="button apply">
    <FontAwesomeIcon icon={faCheck} />
  </button>
];

class AvatarField extends Component {
  apply = (file, func) => {
    const reader = new FileReader();
    const self = this;
    reader.onload = function(event) {
      self.props.onChange(event.target.result);
    };
    reader.readAsDataURL(file);
    const imgFile = new File([file], file.name, { type: file.type });
    this.props.setFieldValue("avatar", imgFile);
  };

  render() {
    const { errors, src } = this.props;
    return (
      <div className="d-flex">
        <div style={imgStyles}>
          <AvatarImageCr apply={this.apply} actions={actions} />
          {errors["avatar"] && (
            <small className="text-danger text-uppercase text-weight-bold">
              {errors["avatar"]}
            </small>
          )}
        </div>
        {src !== "" && (
          <div style={imgStyles}>
            <img src={src} alt="profile" />
          </div>
        )}
      </div>
    );
  }
}

export default AvatarField;
