import React from 'react'

const User = () => {
  return (
    <div className="flex items-center gap-4 hover:bg-slate-700 hover:rounded-lg hover:ease-in-out duration-300">
        <div >
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 lg:w-10 rounded-full">
              <img src="/public/assets/tushar.jpg" />
            </div>
          </label>
        </div>

        <div>
          <h3 className="text-md font-pop font-semibold">Tushar Imran</h3>
        </div>
      </div>
  )
}

export default User