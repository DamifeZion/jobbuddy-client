export const countUnreadMessages = (notifications: Array<{}>) => {
   return notifications.filter((notification: any) => !notification.viewed)
      .length;
};
