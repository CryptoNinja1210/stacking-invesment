import { notification} from 'antd';
import { FcOk,FcCancel } from "react-icons/fc";
const openNotification = (time, title,message,ok,go) => {
    const args = {
      message: title,
      description:message,
      icon: ok?<FcOk />:<FcCancel />,
      duration:time,
      onClose:go
    };
    notification.open(args);
  }

  export default openNotification;