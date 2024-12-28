import { Button, Image, Upload } from "antd";
import { useState } from "react";
import "./UploadAvatar.scss";
import showMessage from "../Message";
import UserIcon from "resources/svg/UserIcon";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadAvatar = ({ form, initValue }) => {
  const [file, setFile] = useState(initValue);
  const handleChange = async (e) => {
    const fileInfo = e.target.files[0];
    if (fileInfo) {
      if (!(fileInfo.type == "image/jpeg" || fileInfo.type == "image/png")) {
        showMessage("error", "You can only upload JPG/PNG file!");
        return;
      }
      if (fileInfo.size / 1024 / 1024 > 1) {
        showMessage("error", "Image must smaller than 1MB!");
        return;
      }

      const data64 = await getBase64(fileInfo);
      form.setFieldValue("avatar", data64);
      setFile(URL.createObjectURL(fileInfo));
    }
  };

  return (
    <div className="upload-avatar">
      <label htmlFor="avatar" className="preview-avatar">
        {file ? (
          <img src={file} alt="avatar" />
        ) : (
          <div className="empty-avatar"></div>
        )}
      </label>

      <input type="file" onChange={handleChange} name="avatar" id="avatar" />
      <label htmlFor="avatar" className="select-btn">
        Select Image
      </label>
      <div className="avatar-requirement">
        <p>File size: maximum 1 MB</p>
        <p>File extension: .JPEG, .PNG</p>
      </div>
    </div>
  );
};
export default UploadAvatar;
