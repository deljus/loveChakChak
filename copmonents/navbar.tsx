import React from 'react'
import NextLink from 'next/link'

export function NavBar() {
    return (
        <div className="prose lg:prose-xl container mx-auto navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">I Love Chak Chak</a>
            </div>
        </div>
    )
}