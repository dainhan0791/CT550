export interface IDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}
