import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

import AvatarField from "../AvatarField";
import MyModal from "../../layout/Modal";

import getBase64 from "../../utils/getBase64";

const defaultImage = process.env.PUBLIC_URL + "/assets/img/default.png";

class Avatar extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    handleToggle: PropTypes.func.isRequired,
    alt: PropTypes.string,
    editable: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired
  };

  static defaultProps = {
    alt: "profile-image"
  };

  state = {
    src: "",
    imageSrc: null,
    crop: { x: 0, y: 0 },
    showCropModal: false,
    croppedImage: null
  };

  setCroppedImage = croppedImage => {
    this.setState({ croppedImage });
  };

  toggleModal = () => {
    this.setState({ showCropModal: !this.state.showCropModal });
  };

  setImage = imageSrc => {
    this.setState({ imageSrc });
  };

  handleChange = e => {
    if (e.target.files.length > 0) {
      getBase64(e.target.files[0], this.setImage);
      this.setState({ showCropModal: true });
      // allows to use change to same image
      e.target.value = "";
    }
  };

  setSrc = src => this.setState({ src });

  render() {
    const { src, onEdit, handleToggle, alt, editable } = this.props;
    const avatarSrc =
      src === "" || src === null
        ? defaultImage
        : process.env.REACT_APP_HOST_UPLOADS + src;
    return (
      <div className="row mx-auto">
        {!editable ? (
          <div className="row mx-auto">
            <div className="position-relative">
              <button onClick={handleToggle} className="penIcon">
                <FontAwesomeIcon icon={faPen} />
              </button>
              <img
                src={avatarSrc}
                className="rounded-circle my-2"
                alt={alt}
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          </div>
        ) : (
          <Formik
            initialValues={{
              avatar: {}
            }}
            onSubmit={async values => {
              onEdit(values);
              handleToggle();
            }}
            render={({ setFieldValue, errors }) => {
              return (
                <Form className="mx-auto">
                  {this.state.croppedImage && (
                    <img
                      src={URL.createObjectURL(this.state.croppedImage)}
                      alt="example"
                      className="rounded-circle my-3"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={this.handleChange}
                  />

                  <MyModal
                    handleClose={this.toggleModal}
                    show={this.state.showCropModal}
                  >
                    <AvatarField
                      setFieldValue={setFieldValue}
                      src={this.state.imageSrc}
                      setImage={this.setImage}
                      setCroppedImage={this.setCroppedImage}
                    />
                  </MyModal>

                  <Button variant="success" type="submit" className="m-2">
                    Change image
                  </Button>

                  <Button variant="danger" onClick={handleToggle}>
                    Cancel
                  </Button>
                </Form>
              );
            }}
          />
        )}
      </div>
    );
  }
}

export default Avatar;
