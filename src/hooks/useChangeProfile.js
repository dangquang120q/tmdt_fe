import { Form, message } from "antd";
import { useAuthentication } from "store/useAuthentication";
import dayjs from "dayjs";
import { DATE_FORMAT } from "constant";
import { userService } from "services/user";
import showMessage from "components/Message";

export const useChangeProfile = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { changeInfo, id } = useAuthentication();
  const onHandleChangeInfo = async (value) => {
    value.dob = value.dob ? dayjs(value.dob).format(DATE_FORMAT) : "";
    showMessage("loading", "Loading...", "loading");
    const { fullName, ...restData } = value;
    const res = await userService.changeInfo({
      ...restData,
      name: value.fullName,
      id,
    });
    message.destroy("loading");
    try {
      if (res.status == 200) {
        showMessage("success", "Save profile successful!");
        changeInfo(value);
      } else {
        showMessage("error", "Save profile failed!");
      }
    } catch (error) {
      showMessage("error", "Save profile failed!");
    }
  };
  return {
    form,
    contextHolder,
    onHandleChangeInfo,
  };
};
