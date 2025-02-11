export const getGreeting = () => {
  const hours = new Date().getHours();
  let message = "";

  switch (true) {
    case hours <= 6:
      message = "凌晨";
      break;
    case hours <= 9:
      message = "早上";
      break;
    case hours <= 12:
      message = "上午";
      break;
    case hours <= 18:
      message = "下午";
      break;
    default:
      message = "晚上";
  }

  return message;
};
