import React from 'react'

export default function Footer(){
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
    <aside>
        <p>Copyright © {new Date().getFullYear()} - Made with ❤️ by <a className="link link-hover link-info" href="https://github.com/1WINgFIRE1">this guy!</a></p>
    </aside>
    </footer>
  )
}
