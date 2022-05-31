import React, { useEffect } from "react";
import { BsFillPersonFill, BsSearch } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { User } from "../models/user.model";
import { useStore } from "../services/store";
import { getUserList } from "../controllers/user.controller";

const UserView = () => {
    const store = useStore();
    const { users, setUsers } = store;
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>("");
    const [activeID, setActiveID] = React.useState<number>(0);
    const [query, setQuery] = React.useState<string>('');

    const init = async () => {
        try {
            const pl = await getUserList()
            setUsers(typeof pl === 'object' ? pl : []);
        } catch (error: any) {
            setError(error.message);
        }
        setLoading(false);
    }
    const handleSelectedUser = (e: any, id?: any) => {
        e.preventDefault()
        setActiveID(activeID === id ? '' : id)
    }
    const handleOnChange = (e: any) => {
        e.preventDefault()
        setQuery(e.target.value)
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const filtered = users.filter((user: User) => {
            return user.name.toLowerCase().includes(query.toLowerCase())
        })
        setUsers(filtered)
    }
    const handleOnReset = (e: any) => {
        e.preventDefault()
        setQuery('')
        init()
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div className=' max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-8'>
            <div className=' container mb-2'>
                <div className='mb-2'>
                    <h1 className="text-sm font-bold">User Records</h1>
                    <p className="text-xs text-gray-500">Search user by name.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='relative inline-flex gap-2'>
                        {query &&
                            <span className='absolute inset-y-0 right-20 pr-3 flex items-center cursor-pointer' onClick={handleOnReset}>
                                <IoMdClose className='h-5 w-5 text-gray-400' />
                            </span>
                        }
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <div className='p-1 focus:outline-none focus:shadow-outline'>
                                <BsSearch className=' text-gray-400' />
                            </div>
                        </span>
                        <input type="text" name="qname" value={query} onChange={handleOnChange} className="py-2 text-sm rounded-md pl-10 focus:outline-none" placeholder="Name" />
                        <button type='submit' className='flex text-xs items-center justify-center bg-blue-800 rounded-md text-white px-5 py-2 cursor-pointer hover:bg-blue-900 transition'>Search</button>
                    </div>
                </form>
            </div>
            <div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {error && <div className=" text-red-700 text-sm">{error}</div>}
                    {loading && <div className='text-gray-500 text-sm'>Loading...</div>}
                    {users ? users.map((user: User) =>
                        <div key={user.id}
                            onClick={e => handleSelectedUser(e, user.id)}
                            className={`relative rounded-lg border bg-white px-6 py-5 shadow-sm flex items-center space-x-3 ${activeID === user.id ? ' border-2 border-blue-600' : 'hover:border-gray-400'}`}>
                            <div className="flex-1 min-w-0">
                                <a href="#" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <div className=' flex justify-between'>
                                        <div className=' inline-flex gap-3'>
                                            <BsFillPersonFill className=" h-5 w-5" />
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        </div>
                                        {user.deceased ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-300 text-gray-800">
                                            Deceased
                                        </span> : null}
                                    </div>
                                    <p className="text-sm text-gray-500 truncate py-1">{user.nric}</p>
                                    <p className="text-sm text-gray-500 truncate py-1">{user.email}</p>
                                    <p className="text-sm text-gray-500 truncate py-1">{user.phone}</p>
                                </a>
                            </div>
                        </div>
                    ) : <div>User not found</div>}
                </div>
                {users.length ?
                    <div className=" p-3 flex flex-row-reverse">
                        <button onClick={e => alert(JSON.stringify(users.filter((u: User) => u.id === activeID)))} disabled={activeID ? false : true} className={` flex text-xs items-center justify-center rounded-md text-white px-5 py-2 transition bg-blue-800 ${activeID ? 'cursor-pointer hover:bg-blue-900' : ' opacity-50 cursor-not-allowed'}`}>Proceed</button>
                    </div>
                    : <></>}
            </div>
        </div >
    );
}

export default UserView;