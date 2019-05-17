import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

import AvatarField from "../AvatarField";

const defaultImage = process.env.PUBLIC_URL + "/assets/img/default.png";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const FILE_SIZE = 1024 * 1024 * 5;

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
    src: ""
  };

  setSrc = src => this.setState({ src });

  render() {
    const { src, onEdit, handleToggle, alt, editable } = this.props;
    const imageSrc =
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
                src={imageSrc}
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
            validationSchema={{
              avatar: Yup.mixed()
                .test(
                  "fileSize",
                  "File too large",
                  value => value && value.size <= FILE_SIZE
                )
                .test(
                  "fileFormat",
                  "Unsupported Format",
                  value => value && SUPPORTED_FORMATS.includes(value.type)
                )
                .required("You must pick an image to proceed")
            }}
            onSubmit={async values => {
              onEdit(values);
              handleToggle();
            }}
            render={({ setFieldValue, errors }) => {
              return (
                <Form className="mx-auto">
                  <AvatarField
                    onChange={this.setSrc}
                    setFieldValue={setFieldValue}
                    src={this.state.src}
                    errors={errors}
                  />

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
