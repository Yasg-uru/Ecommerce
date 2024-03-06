// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { changerole, getalluser } from "../../slices/authSlice";
// import 'bootstrap/dist/css/bootstrap.min.css';

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import toast from "react-hot-toast";

// const Getalluser = () => {
//   const [show, setShow] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null); // To store the user data for the modal
// const [updaterole,setupdaterole]=useState({
//   role:selectedUser?.role || "",
//   id:selectedUser?._id || ""
// })
//   const handleClose = () => {
//     setShow(false);
//     setSelectedUser(null); // Clear the selected user data when closing the modal
//   };

//   const handleShow = (user) => {
//     setSelectedUser(user);
//     setupdaterole({
//       role: user.role,
//       id: user._id
//     });
//     setShow(true);
//   };

//   const handleRoleChange = () => {
//     // Implement your logic to change the user's role here
//     // For now, let's just log the selected user's data
//     console.log('Changing role for user:', selectedUser);
//     console.log("this is a update rolle object:"+updaterole)
//     dispatch(changerole(updaterole))
//     dispatch(getalluser())
//     toast.success("role is updated successfully")

//     handleClose(); // Close the modal after handling the role change
//   };

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getalluser());
//   }, []);

//   const users = useSelector((state) => state.auth.users);

//   return (
//     <div className="h-[100vh] w-full bg-black overflow-y-auto p-4">
//       <h1 className="text-white text-center text-2xl font-bold">User List</h1>
//       <div className="flex flex-col gap-6">
//         {users?.map((user, index) => (
//           <div key={index} className="h-[20vh] relative w-full border-[0.5px] shadow-lg shadow-cyan-500 rounded-md border-cyan-500  flex items-center gap-4 p-5">
//             <div>
//               <img src={user.profile} alt="" className="rounded-full w-24 h-24" />
//             </div>
//             <div className="flex flex-col gap-2">
//               <p className="text-white">Name: {user.name}</p>
//               <p className="text-white">Email: {user.email}</p>
//               <p className="text-white">Role: {user.role}</p>
//             </div>
//             <div className="flex gap-6 absolute top-2 right-2">
//               <button
//                 className="bg-cyan-500 hover:bg-cyan-600 shadow-lg shadow-cyan-500 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-110 ease-in-out duration-300"
//                 onClick={() => handleShow(user)}
//               >
//                 Change Role
//               </button>
//               <button className="bg-cyan-500 hover:bg-cyan-600 shadow-lg shadow-cyan-500 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-110 ease-in-out duration-300">Delete User</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Render the Modal for changing the user's role */}
//       <Modal show={show} onHide={handleClose} className="text-white">
//   <Modal.Header closeButton className="bg-black">
//     <Modal.Title>Change User Role</Modal.Title>
//   </Modal.Header>
//   <Modal.Body className="bg-black">

//     <p>User: {selectedUser && selectedUser.name}</p>
// <form  className="h-[200px] flex flex-col gap-3">
// <div className="flex flex-col gap-2">
//   <label htmlFor="role">Role</label>
//   <input type="text" value={updaterole.role} name="role" onChange={(e)=>setupdaterole({ ...updaterole, role: e.target.value })} className="text-white border-[0.5px] border-cyan-500 bg-black" />

// </div>
// <Button type="submit" onClick={handleRoleChange} className="bg-cyan-500 hover:bg-cyan-600 shadow-lg shadow-cyan-500 text-white font-bold py-2 px-4 " >
//       Save Changes
//     </Button>
// </form>

//   </Modal.Body>
//   <Modal.Footer className="bg-black">
//     <Button variant="secondary" onClick={handleClose}>
//       Close
//     </Button>

//   </Modal.Footer>
// </Modal>

//     </div>
//   );
// };

// export default Getalluser;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changerole, deleteuser, getalluser } from "../../slices/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";

const Getalluser = () => {
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // To store the user data for the modal
  const [updaterole, setupdaterole] = useState({
    role: "",
    id: "",
  });
  const handleClose = () => {
    setShow(false);
    setSelectedUser(null); // Clear the selected user data when closing the modal
  };

  const handleShow = (user) => {
    setSelectedUser(user);
    setupdaterole({
      role: user.role,
      id: user._id,
    });
    setShow(true);
  };

  const handleRoleChange = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Implement your logic to change the user's role here
    console.log("Changing role for user:", selectedUser);
    console.log("this is an update role object:", updaterole);

    dispatch(changerole(updaterole));
    dispatch(getalluser());
    toast.success("Role is updated successfully");

    handleClose(); // Close the modal after handling the role change
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getalluser());
  }, [dispatch]);

  const users = useSelector((state) => state.auth.users);

  return (
    <div className="h-[100vh] w-full bg-black overflow-y-auto p-4">
      <h1 className="text-white text-center text-2xl font-bold">User List</h1>
      <div className="flex flex-col gap-6">
        {users?.map((user, index) => (
          <div
            key={index}
            className="h-[20vh] relative w-full border-[0.5px] shadow-lg shadow-cyan-500 rounded-md border-cyan-500  flex items-center gap-4 p-5"
          >
            <div>
              <img
                src={user.profile}
                alt=""
                className="rounded-full w-24 h-24"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white">Name: {user.name}</p>
              <p className="text-white">Email: {user.email}</p>
              <p className="text-white">Role: {user.role}</p>
            </div>
            <div className="flex gap-6 absolute top-2 right-2">
              <button
                className="bg-cyan-500 hover:bg-cyan-600 shadow-lg shadow-cyan-500 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-110 ease-in-out duration-300"
                onClick={() => handleShow(user)}
              >
                Change Role
              </button>
              <button
                onClick={() => dispatch(deleteuser(user._id))}
                className="bg-cyan-500 hover:bg-cyan-600 shadow-lg shadow-cyan-500 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-110 ease-in-out duration-300"
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Render the Modal for changing the user's role */}
      <Modal show={show} onHide={handleClose} className="text-white">
        <Modal.Header closeButton className="bg-black">
          <Modal.Title>Change User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black">
          <p>User: {selectedUser && selectedUser.name}</p>
          <form
            onSubmit={handleRoleChange}
            className="h-[200px] flex flex-col gap-3"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                value={updaterole.role}
                name="role"
                onChange={(e) =>
                  setupdaterole({ ...updaterole, role: e.target.value })
                }
                className="text-white border-[0.5px] border-cyan-500 bg-black"
              />
            </div>
            <Button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 shadow-lg shadow-cyan-500 text-white font-bold py-2 px-4"
            >
              Save Changes
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-black">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Getalluser;
