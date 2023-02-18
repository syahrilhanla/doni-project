interface Params {
  eventType: "assignSeminar" | "assignSidang" | "assignProfOne" | "assignProfTwo" | "titleApproved" | "seminarApprovedByProfOne" | "seminarApprovedByProfTwo";

}

const setNotificationMessages = ({ eventType }: Params) => {
  let notificationObject = {
    title: "",
    bodyText: ""
  };

  switch (eventType) {
    case "assignProfOne":
      notificationObject.title = "Kamu mendapatkan Dosen Pembimbing 1.";
      notificationObject.bodyText = "Kamu mendapatkan {{ Nama Dosen 1 }} sebagai Dosen Pembimbing 1.";
    case "assignProfTwo":
      notificationObject.title = "Kamu mendapatkan Dosen Pembimbing 2.";
      notificationObject.bodyText = "Kamu mendapatkan {{ Nama Dosen 2 }} sebagai Dosen Pembimbing 2.";
    case "assignSeminar":
      notificationObject.title = "";
      notificationObject.bodyText = "";
    default:
      notificationObject.title = "";
      notificationObject.bodyText = "";
  }

}

export default setNotificationMessages;