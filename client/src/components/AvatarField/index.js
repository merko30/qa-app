import React, { Component } from "react";
import PropTypes from "prop-types";
import AvatarImageCr from "react-avatar-image-cropper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faWindowClose } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

const actions = [
  <button key={0} className="button close-button-icon" type="button">
    <FontAwesomeIcon icon={faWindowClose} />
  </button>,
  <button key={1} type="button" className="button apply">
    <FontAwesomeIcon icon={faCheck} />
  </button>
];

class AvatarField extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    src: PropTypes.string.isRequired
  };

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
        <div className="image">
          <AvatarImageCr apply={this.apply} actions={actions} />
          {errors["avatar"] && (
            <small className="text-danger text-uppercase text-weight-bold">
              {errors["avatar"]}
            </small>
          )}
        </div>
        {src !== "" && (
          <div className="image">
            <img src={src} alt="profile" />
          </div>
        )}
      </div>
    );
  }
}

export default AvatarField;
