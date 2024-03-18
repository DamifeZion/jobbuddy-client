export const countUnreadMessages = (notifications: Array<{}>) => {
   return notifications.filter((notification: any) => !notification.viewed)
      .length;
};

export const markAsRead = (isViewed: boolean, updateFunction: () => void) => {
   if (isViewed === true) return;

   updateFunction();
};
