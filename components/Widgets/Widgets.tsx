import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

function Widgets() {
  return (
    <div className="col-span-2 mt-2 px-2 hidden lg:inline">
      <div className="mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        {/*Search bar */}
        <SearchIcon className="h-5 w-5 text-gray-400" />
        {/*flex-1 allows item to shrink/grow as much as needed */}
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Twitter"
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="nasa"
        options={{ height: 1000 }}
      />
    </div>
  )
}

export default Widgets
