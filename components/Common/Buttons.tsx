import { RiCloseLine } from "react-icons/ri";

export const CloseButton = ({ handleClick }: Props) => {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="absolute top-3 right-2.5 hover:bg-[#ef4e4e] hover:text-[#f3fef3] p-2 rounded-md duration-200"
    >
      <RiCloseLine />
    </button>)
}

export const SendButton = ({ handleClick, buttonText = "Kirim" }: Props) => {
  return (
    <button
      onClick={handleClick}
      className="purple-button"
    >
      {buttonText}
    </button>
  )
}


export const ErrorButton = ({ handleClick, buttonText }: Props) => {
  return (
    <button
      onClick={handleClick}
      className="red-button"
    >
      {buttonText}
    </button>
  )
}
interface Props {
  handleClick: () => void;
  buttonText?: string;
}