export interface FormStateType {
  name: string;
  link: string;
  imageURL?: string;
  iconURL: string;
}

export interface FormActionType {
  key: keyof FormStateType;
  payload: string;
}
