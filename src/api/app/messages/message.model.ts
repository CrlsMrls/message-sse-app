export enum MessageStatus {
  NEW = 'NEW',
  OPENED = 'OPENED',
  DELETED = 'DELETED',
}

export interface Message {
  id: string;
  text: string;
  status: MessageStatus;
}

export interface MessagesSummary {
  data: {
    total: number;
    notDeleted: number;
    unread: number;
  };
}
