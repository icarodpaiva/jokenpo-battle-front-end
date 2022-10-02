import imgHeader from "../../assets/images/image-logo-header.png"
import imgHeaderDesktop from "../../assets/images/image-logo-header-desktop.png"
import "./header.scss"

export const Header = () => {
  return (
    <header>
      <img
        src={imgHeader}
        className="image-header-mobile"
        alt="header"
        width="100%"
      />
      <img
        src={imgHeaderDesktop}
        className="image-header-desktop"
        alt="header"
      />
    </header>
  )
}
