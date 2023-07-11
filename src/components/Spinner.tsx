import Image from "next/image"
import spinner from "../../public/spinner.svg";

export const Spinner = ()=>{
  return (
    <Image
    className="h-7 w-7 animate-spin stroke-gray-500"
    style={{
      filter: "grayscale(1) brightness(0) invert(1)",
    }}
    priority
    src={spinner}
    alt="logo"
  />
  )
}