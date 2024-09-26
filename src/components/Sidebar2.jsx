import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProfile,
  deleteProfile,
  editProfile,
} from "../reducers/profileReducer";
import MainScreen from "./MainScreen";

const Sidebar = () => {
  const profileArray = useSelector((state) => state.profileArray);
  const dispatch = useDispatch();
  const [selectedProfileName, setSelectedProfileName] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteProfileId, setDeleteProfileId] = useState(null);
  const [previousSibling, setPreviousSibling] = useState(null);
  const [activeProfile, setActiveProfile] = useState(
    document.getElementById("profile1")
  );
  const [editProfileId, setEditProfileId] = useState(null);

  useEffect(() => {
    const newProfile = document.getElementById(
      profileArray[profileArray.length - 1].id
    );
    // setActiveProfile(newProfile);
    setSelectedProfileName(newProfile.innerText);
    newProfile.scrollIntoView({ behavior: "smooth" });
    console.log(profileArray, profileArray);
  }, [profileArray]);

  useEffect(() => {
    setActiveProfile(document.getElementById("profile1"));
  }, []);

  useEffect(() => {
    setSelectedProfileName(document.getElementById("profile1").innerText);
  }, []);

  // getting array from redux slice

  function checkUpDown() {
    if (!activeProfile.nextElementSibling) {
      document.getElementById("profileDown").classList.add("disabled");
    } else if (!activeProfile.previousElementSibling) {
      document.getElementById("profileUp").classList.add("disabled");
    } else {
      document.getElementById("profileUp").classList.remove("disabled");
      document.getElementById("profileDown").classList.remove("disabled");
    }
  }
  const handleDown = function () {
    const profileList = document.getElementById("profileList");

    const next = activeProfile.nextElementSibling;
    if (next == null) {
      return false;
    }
    profileList.insertBefore(activeProfile.nextElementSibling, activeProfile);
    checkUpDown();
  };

  const handleUp = function () {
    const profileList = document.getElementById("profileList");

    const prev = activeProfile.previousElementSibling;
    if (prev == null) {
      return false;
    }
    profileList.insertBefore(activeProfile, prev);
    checkUpDown();
  };

  const handleActive = (e) => {
    // console.log("handleActive called");

    const profileItems = document.querySelectorAll(".profile-item");
    // console.log("profileItems:", profileItems);

    profileItems.forEach((item) => {
      item.classList.remove("active");
    });
    const profileItem = e.target;
    setActiveProfile(profileItem);
    setSelectedProfileName(profileItem.innerText);
    const nextSibling = profileItem.nextElementSibling;
    const prevSibling = profileItem.previousElementSibling;
    setPreviousSibling(prevSibling);

    if (!nextSibling) {
      console.log(prevSibling, "prevSibling");
      document.getElementById("profileUp").classList.remove("disabled");

      document.getElementById("profileDown").classList.add("disabled");
    } else if (!prevSibling) {
      console.log(nextSibling, "nextSibling");
      document.getElementById("profileDown").classList.remove("disabled");
      document.getElementById("profileUp").classList.add("disabled");
    } else {
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

  const handleAdd = async () => {
    const id = Math.floor(Math.random() * 1000);
    console.log("new id, ", id);
    await dispatch(addProfile(id));
    handleActive({ target: document.getElementById(id) });
  };

  const handleDelete = (id) => {
    console.log(id, " delete id");
    setDeleteProfileId(id);
    setShowDeleteConfirm(true);
    console.log(showDeleteConfirm, "show delete confirm");
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProfile(deleteProfileId));
    setShowDeleteConfirm(false);
    setActiveProfile(previousSibling);
    handleActive({ target: document.getElementById(previousSibling.id) });
    setSelectedProfileName(previousSibling.innerText);
    checkUpDown();
  };

  const handleEditClick = (profileId) => {
    console.log(profileId, "edit profile id");
    setEditProfileId(profileId);
  };

  const handleProfileNameChange = (e) => {
    const newProfileName = e.target.value;
    setSelectedProfileName(newProfileName);
  };

  const handleSaveChanges = (profileId) => {
    dispatch(editProfile({ id: profileId, name: selectedProfileName }));
    setEditProfileId(null);
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
          {/* {editProfileId?.toString() === profile?.id.toString() ? (
            <input
              type="profileRename"
              className="show"
              defaultValue={profile.name}
              placeholder="Enter Profile Name"
              onChange={(e) => handleProfileNameChange(e, profile.id)}
              onBlur={() => handleSaveChanges(profile.id)}
              maxLength={25}
            />
          ) : (
            <span>{profile.name}</span>
          )} */}

          <div className="toolbar flex">
            <div className="icon add" id="profileAdd" onClick={handleAdd}></div>
            <div
              className="icon edit"
              id="profileEdit"
              onClick={() => handleEditClick(activeProfile.id)}
            ></div>
            <div
              className="icon delete"
              id="deleteIcon"
              onClick={() => handleDelete(activeProfile.id)}
            />

            <div
              className="icon down"
              id="profileDown"
              onClick={handleDown}
            ></div>
            <div
              className="icon up disabled"
              id="profileUp"
              onClick={handleUp}
            ></div>
          </div>
          <div
            id="profileDelCfm"
            className={`profile-del alert flex ${
              showDeleteConfirm ? "show" : ""
            } `}
          >
            <div className="title">delete eq</div>
            <div className="body-text t-center" id="delName">
              {selectedProfileName}
            </div>
            <div
              className="thx-btn"
              id="cfmDelete"
              onClick={handleConfirmDelete}
            >
              delete
            </div>
          </div>
        </div>
      </div>
      <MainScreen name={selectedProfileName} />
    </>
  );
};

export default Sidebar;
