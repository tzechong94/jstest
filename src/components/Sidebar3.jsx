import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProfile, updateProfileArray } from "../reducers/profileReducer";
import MainScreen from "./MainScreen";

const Sidebar = () => {
  let profileArray = useSelector((state) => state.profileArray);
  const dispatch = useDispatch();

  const [selectedProfileName, setSelectedProfileName] = useState("");
  const [activeProfileId, setActiveProfileId] = useState("profile1");

  useEffect(() => {
    setSelectedProfileName(document.getElementById("profile1").innerText);
    checkUpDown();
  }, []);

  function checkUpDown() {
    const activeProfile = document.getElementById(activeProfileId);
    console.log(activeProfile, "active profile");
    if (!activeProfile.nextElementSibling) {
      document.getElementById("profileDown").classList.add("disabled");
    } else if (!activeProfile.previousElementSibling) {
      document.getElementById("profileUp").classList.add("disabled");
    } else {
      document.getElementById("profileUp").classList.remove("disabled");
      document.getElementById("profileDown").classList.remove("disabled");
    }
  }

  const moveUp = async (id) => {
    let index = profileArray.findIndex((profile) => profile.id === id);
    if (index > 0) {
      let newArray = [...profileArray];
      let el = newArray[index];
      newArray[index] = newArray[index - 1];
      newArray[index - 1] = el;
      console.log(newArray);
      await dispatch(updateProfileArray(newArray));
    }

    checkUpDown();
  };

  const moveDown = async (id) => {
    let index = profileArray.findIndex((profile) => profile.id == id);
    if (index !== -1 && index < profileArray.length - 1) {
      let newArray = [...profileArray];
      let el = newArray[index];
      newArray[index] = newArray[index + 1];
      newArray[index + 1] = el;
      console.log(newArray, "profile array");

      await dispatch(updateProfileArray(newArray));
    }
    checkUpDown();
  };

  const handleActive = (e) => {
    const profileItems = document.querySelectorAll(".profile-item");

    profileItems.forEach((item) => {
      item.classList.remove("active");
    });
    const profileItem = e.target;
    setActiveProfileId(profileItem.id);
    // console.log(activeProfile, " active profile");
    console.log(activeProfileId, "active profile id");
    setSelectedProfileName(profileItem.innerText);
    const nextSibling = profileItem.nextElementSibling;
    const prevSibling = profileItem.previousElementSibling;

    if (!nextSibling) {
      console.log(prevSibling, "prevSibling");
      document.getElementById("profileUp").classList.remove("disabled");

      document.getElementById("profileDown").classList.add("disabled");
    } else if (!prevSibling) {
      console.log(nextSibling, "nextSibling");
      document.getElementById("profileDown").classList.remove("disabled");
      document.getElementById("profileUp").classList.add("disabled");
    } else {
      console.log("both", nextSibling, prevSibling);
      document.getElementById("profileUp").classList.remove("disabled");
      document.getElementById("profileDown").classList.remove("disabled");
    }
    profileItem.classList.add("active");

    if (profileItem.classList.contains("custom")) {
      document.getElementById("profileEdit").classList.add("show");
      document.getElementById("deleteIcon").classList.add("show");
    } else {
      document.getElementById("profileEdit").classList.remove("show");
      document.getElementById("deleteIcon").classList.remove("show");
    }
    // checkUpDown();
  };

  const handleAdd = () => {
    const id = Math.floor(Math.random() * 1000);
    console.log("new id, ", id);
    dispatch(addProfile(id));
    handleActive({ target: document.getElementById(id) });
  };

  return (
    <>
      <div className="thx-drawer flex">
        <div className="main-title">Profile List</div>
        <div id="profileWrapper" className="drawer-select flex">
          <div id="profileList" className="scrollable">
            {profileArray.map((profile) => (
              <div
                id={profile.id}
                className={`profile-item ${profile.className}`}
                key={profile.id}
                onClick={handleActive}
              >
                {profile.name}
              </div>
            ))}
          </div>
          <input
            id="profileRename"
            className="profile-item"
            placeholder="Enter Profile Name"
            max="25"
          />
          <div className="toolbar flex">
            <div className="icon add" id="profileAdd" onClick={handleAdd}></div>
            <div className="icon edit" id="profileEdit"></div>
            <div
              className="icon delete"
              id="deleteIcon"
              //   onClick={() => handlePopup(activeProfileId)}
            />

            <div
              className="icon down"
              id="profileDown"
              onClick={() => moveDown(activeProfileId)}
            ></div>
            <div
              className="icon up disabled"
              id="profileUp"
              onClick={() => moveUp(activeProfileId)}
            ></div>
          </div>
          {/* {showDeleteConfirmation && ( */}
          {/* <div id="profileDelCfm" className="profile-del alert flex">
            <div className="title">delete eq</div>
            <div className="body-text t-center" id="delName">
              test
            </div>
            <div className="thx-btn" id="cfmDelete">
              delete
            </div>
          </div>
          )} */}
        </div>
      </div>
      <MainScreen name={selectedProfileName} />
    </>
  );
};

export default Sidebar;
