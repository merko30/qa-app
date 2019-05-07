import React, { useState, useEffect, useRef } from "react";

function FileUpload(props) {
  const [image, setImage] = useState("");
  const {
    field,
    form: { errors, touched, setTouched, setFieldValue }
  } = props;
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleChange = e => {
    if (mounted.current) {
      const file = e.currentTarget.files[0];
      const reader = new FileReader();
      reader.onload = function(event) {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setFieldValue(field.name, file);
    }
  };
  return (
    <div>
      <input
        data-testid={props["data-testid"]}
        type={"file"}
        onChange={o => handleChange(o)}
        className={"form-control"}
        style={{ minHeight: "40px" }}
      />
      {touched.avatar && errors.avatar && (
        <small className="text-danger text-uppercase text-weight-bold">
          {errors.avatar.file}
        </small>
      )}
      {image.length > 0 && (
        <img
          src={image}
          alt="preview"
          className="rounded-circle my-2"
          style={{ width: "150px", height: "150px" }}
        />
      )}
    </div>
  );
}

export default FileUpload;
