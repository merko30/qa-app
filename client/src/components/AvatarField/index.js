import React, { Component } from "react";
// import PropTypes from "prop-types";
import Cropper from "react-easy-crop";

import "./index.css";
import Button from "react-bootstrap/Button";

import getCroppedImg from "../../utils/cropImage";
import blobToFile from "../../utils/blobToFile";

class AvatarField extends Component {
  // static propTypes = {
  //   onChange: PropTypes.func.isRequired,
  //   setFieldValue: PropTypes.func.isRequired,
  //   errors: PropTypes.object.isRequired,
  //   src: PropTypes.any,
  // };

  state = {
    crop: { x: 0, y: 0 },
    showCropModal: false,
    croppedAreaPixels: null,
    cropSize: { width: 200, height: 200 },
    zoom: 1
  };

  showCroppedImage = async () => {
    const { src, setCroppedImage, handleClose, setFieldValue } = this.props;
    const croppedImage = await getCroppedImg(src, this.state.croppedAreaPixels);
    setFieldValue(
      "avatar",
      blobToFile(croppedImage, `avatar-${Date.now()}.jpeg`, "image/jpeg")
    );
    setCroppedImage(croppedImage);
    handleClose();
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    this.setState({ croppedAreaPixels });
  };

  onZoomChange = e => {
    this.setState({ zoom: e.target.value });
  };

  render() {
    const { crop, zoom, aspect, cropSize } = this.state;
    const { src } = this.props;
    return (
      <div>
        <div
          style={{
            minWidth: "400px",
            minHeight: "400px",
            position: "relative"
          }}
        >
          <div className="crop-container">
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              cropSize={cropSize}
              cropShape="round"
              showGrid={false}
              onCropChange={this.onCropChange}
              onCropComplete={this.onCropComplete}
              onZoomChange={this.onZoomChange}
            />
            <div className="controls">
              <input
                type="range"
                className="custom-range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={this.onZoomChange}
              />
            </div>
          </div>
        </div>
        <Button
          onClick={this.showCroppedImage}
          variant={"outline-success"}
          className="my-2"
        >
          Crop image
        </Button>
      </div>
    );
  }
}

export default AvatarField;
