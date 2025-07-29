import React, { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKRND_URL } from "../config";

type UserType = {
  _id: string;
  firstname: string;
  lastname: string;
};

export const Users = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios.get(`${BACKRND_URL}/api/v1/user/bulk?filter=${filter}`)
      .then((response) => {
        setUsers(response.data.user)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [filter])

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-2 border rounded border-slate-200"
        />
      </div>
      <div className="flex flex-col gap-2">
        {users.length === 0 ? (
          <p className="text-slate-500">No users found.</p>
        ) : (
          users.map((user) => <User key={user._id} user={user} />)
        )}
      </div>
    </>
  )
}
function User({ user }) {
  const navigate = useNavigate()
  const firstInitial = user.firstname?.[0]?.toUpperCase() || "?"

  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-200 last:border-none">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-2">
          <div className="text-xl font-medium text-slate-600">{firstInitial}</div>
        </div>
        <div>
          {user.firstname} {user.lastname}
        </div>
      </div>
      <Button
        onClick={() => navigate(`/sendmoney?id=${user._id}&name=${user.firstname}`)}
        label="Send Money"
      />
    </div>
  )
}
