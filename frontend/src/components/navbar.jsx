import React from 'react'
import { Link } from 'react-router-dom'

function navbar() {
  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 stick top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-16 justify-between">

          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <span className="font-semibold font-mono tracking-widest text-4xl bg-clip-text
                      text-transparent bg-linear-to-r from-primary to-secondary">
                  Cosmo Works
                </span>
              </div>
            </Link>
          </div>
        




        </div>
      </div>
    </div>
  )
}

export default navbar
