import React, { Component } from "react";
import AvatarImageCr from "react-avatar-image-cropper";

const imgStyles = {
  width: "250px",
  height: "250px",
  margin: "1em",
  border: "1px solid black"
};

class AvatarField extends Component {
  apply = (file, func) => {
    const reader = new FileReader();
    const self = this;
    reader.onload = function(event) {
      self.props.onChange(event.target.result);
    };
    reader.readAsDataURL(file);
    const imgFile = new File([file], file.name, { type: file.type });
    func("avatar", imgFile);
  };

  render() {
    const { setFieldValue, errors, src } = this.props;
    console.log(this.props);
    return (
      <div className="d-flex">
        <div style={imgStyles}>
          <AvatarImageCr apply={file => this.apply(file, setFieldValue)} />
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
