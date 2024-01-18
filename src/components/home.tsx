import  {  SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate()
  const [roomID, setRoomID] = useState('');
  const [name, setName] = useState('');

  const handleRoomIDChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setRoomID(e.target.value);
  };

  const makeNewRoom = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const rand = uuidv4();
    setRoomID(rand);
    toast.success('Created a new room');
  };

  const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!roomID || !name) {
      toast.error('enter the required fields')
      return
    }


    navigate(`/editor/${roomID}`, {
      state: {
        name
      }
    })
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-xl text-white font-semibold mb-4 text-center">JOIN A ROOM</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="RoomID" className="block text-gray-300">RoomID</label>
            <input
              id="RoomID"
              name="RoomID"
              placeholder="RoomID"
              className="w-full px-3 py-2 rounded-md bg-gray-600 text-white border border-gray-500 focus:outline-none focus:border-blue-500"
              value={roomID}
              onChange={handleRoomIDChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="Name" className="block text-gray-300">Name</label>
            <input
              id="Name"
              name="Name"
              placeholder="Name"
              className="w-full px-3 py-2 rounded-md bg-gray-600 text-white border border-gray-500 focus:outline-none focus:border-blue-500"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium">
            Submit
          </button>
        </form>
        <button
          onClick={makeNewRoom}
          className="mt-4 w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium"
        >
          Setup a New Room
        </button>
      </div>
    </div>
  );
};

export default Home;
