import React from 'react'
import imgHeader from '../../assets/images/image-logo-header.png'
import imgHeaderDesktop from '../../assets/images/image-logo-header-desktop.png'
import './header.scss'

export const Header = () => {
  return (
    <div className="header-container">
      <img src={imgHeader} className="image-header-mobile" alt="header" />
      <img
        src={imgHeaderDesktop}
        className="image-header-desktop"
        alt="header"
      />
    </div>
  )
}
