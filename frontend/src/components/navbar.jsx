import React from 'react'
import { Link, useResolvedPath } from 'react-router-dom'
import { ShoppingBagIcon } from "lucide-react"

function navbar() {
  const {pathname} =  useResolvedPath()
  const isHomePage = pathname === "/"

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

          <div className="flex-items-center">
            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                  <ShoppingBagIcon className="size-5" />
                  <span className="badge badge-sm badge-primary indicator-item">100</span>

                </div>
              </div>
            )} 
          </div>
        




        </div>
      </div>
    </div>
  )
}

export default navbar
