import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import profile from "../../../public/assets/tushar.jpg";
import { useSelector } from "react-redux";

const Suggestion = () => {
  const [userList, setUserList] = useState([]);
  const [friendRequestInfo, setFriendRequestInfo] = useState([]);
  const [friendsInfo, setFriendsInfo] = useState([]);
  const [blockInfo, setBlockInfo] = useState([]);

  const [cancelReq, setCancelReq] = useState([]);
  const db = getDatabase();
  const userTotalInfo = useSelector((state) => state.userData.userInfo);

  // set user start
  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // akhon je login ache tar sathe jodi user list er uid mile jai taile take user list a dekhabena.
        if (userTotalInfo.uid !== item.key) {
          arr.push({ ...item.val(), userId: item.key });
        }
      });
      setUserList(arr);
      // console.log(userList);
    });
  }, []);
  // set user end

  // set friend request start
  const handleFriendRequest = (friendRequest) => {
    set(push(ref(db, "friendRequest")), {
      senderName: userTotalInfo.displayName,
      senderId: userTotalInfo.uid,
      receiverName: friendRequest.username,
      receiverId: friendRequest.userId,
    }).then(() => {
      console.log("send request");
    });
  };

  // const handleFriendRequestCancel = (cancelRequest) => {
  //   console.log("asf", cancelRequest);
  //   remove(ref(db, 'friendRequest'+ cancelRequest.userId))
  //   .then(()=>{
  //     console.log("cancel");
  //   })
  //   // remove(ref(db, "friendRequest/")).then(() => {
  //   //   console.log("cancel friend request", cancelReq.userId);
  //   //   // toast("Friend Request Cancel Successfully!");
  //   // });
  // };

  useEffect(() => {
    const friendsRef = ref(db, "friendRequest");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // if (
        //   userTotalInfo.uid === item.val().senderId ||
        //   userTotalInfo.uid === item.val().receiverId
        // ) {
        arr.push({ ...item.val(), cancelId: item.key });
        // }
      });
      setCancelReq(arr);
    });
    console.log(cancelReq);
  }, []);

  const handleFriendRequestCancel = (user) => {
    console.log(user.cancelId);
    remove(ref(db, "friendRequest/")).then(() => {
      console.log("cancel");
    });
  };

  // set friend request end

  // friend request send or not info start
  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest/");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverId + item.val().senderId);
      });
      setFriendRequestInfo(arr);
    });
  }, [db]);
  // friend request send or not info end

  // friend request send or not info start
  useEffect(() => {
    const friendRequestInfoRef = ref(db, "friends");
    onValue(friendRequestInfoRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().recevederId + item.val().senderId);
      });
      setFriendsInfo(arr);
    });
  }, []);
  // friend request send or not info end

  // block send or not info start
  useEffect(() => {
    const friendRequestInfoRef = ref(db, "block");
    onValue(friendRequestInfoRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().blockReceivedId + item.val().blockSenderId);
      });
      setBlockInfo(arr);
    });
  }, []);
  // block send or not info end

  return (
    <div>
      <form>
        <input className="p-2 rounded-3xl" type="search" name="" id="" />
        <button
          className="px-4 py-2 ml-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100"
          type="submit"
        >
          Search
        </button>
      </form>

      {userList.length > 0 ? (
        userList.map((user, index) => (
          <div key={index} className="flex lg:ml-2 lg:mt-2 gap-4">
            <div>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 lg:w-20 rounded-full">
                  <img src={profile} />
                </div>
              </label>
            </div>

            <div>
              <h3 className="text-md font-pop text-lg font-semibold">
                {user.username}
              </h3>
              <p className="font-pop text-sm">{user.email}</p>
              <div className="mt-2 flex gap-2">
                {friendRequestInfo.includes(userTotalInfo.uid + user.userId) ? (
                  <button className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 ">
                    Pending
                  </button>
                ) : friendRequestInfo.includes(
                    user.userId + userTotalInfo.uid
                  ) ? (
                  <button
                    onClick={() => handleFriendRequestCancel(user)}
                    className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 "
                  >
                    Cancel
                  </button>
                ) : friendsInfo.includes(user.userId + userTotalInfo.uid) ||
                  friendsInfo.includes(userTotalInfo.uid + user.userId) ? (
                  <button className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 ">
                    Friend
                  </button>
                ) : (
                  <button
                    onClick={() => handleFriendRequest(user)}
                    className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 "
                  >
                    Add Request
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>No user available.</span>
        </div>
      )}
    </div>
  );
};

export default Suggestion;
