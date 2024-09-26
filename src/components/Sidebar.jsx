import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProfile,
  deleteProfile,
  editProfile,
  setActiveProfile,
  setProfileArray,
} from "../reducers/profileReducer";
import MainScreen from "./MainScreen";

const Sidebar = () => {
  const profileArray = useSelector((state) => state.profileArray);
  const dispatch = useDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(profileArray[0]);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [deleteProfileId, setDeleteProfileId] = useState(null);
  const [deleteProfileIndex, setDeleteProfileIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [selectedProfileName, setSelectedProfileName] = useState("");

  // getting array from redux slice

  useEffect(() => {
    if (selectedProfileIndex === profileArray.length - 1) {
      setIsLast(true);
    } else {
      setIsLast(false);
    }
    if (selectedProfileIndex === 0) {
      setIsFirst(true);
    } else {
      setIsFirst(false);
    }
    console.log(isFirst, "isFirst");
    console.log(isLast, "isLast");
  }, [
    dispatch,
    isFirst,
    isLast,
    profileArray.length,
    selectedProfile,
    selectedProfileIndex,
  ]);

  useEffect(() => {
    dispatch(setActiveProfile(selectedProfile.id));
  }, [dispatch, selectedProfile]);

  const handleDown = (id) => {
    console.log("clicking down for id: ", id);
    let tempArray = [...profileArray];

    const selectedItemIndex = tempArray.findIndex(
      (profile) => profile.id.toString() === id.toString()
    );
    const tempItem = tempArray[selectedItemIndex];
    if (
      selectedItemIndex !== -1 &&
      selectedItemIndex !== tempArray.length - 1
    ) {
      tempArray[selectedItemIndex] = tempArray[selectedItemIndex + 1];
      tempArray[selectedItemIndex + 1] = tempItem;
      console.log(tempArray, "updated array");
      setSelectedProfileIndex(selectedItemIndex + 1);
      dispatch(setProfileArray(tempArray));
    }
  };

  const handleUp = (id) => {
    console.log("clicking up for id: ", id);
    console.log(id, "id");
    let tempArray = [...profileArray];

    const selectedItemIndex = tempArray.findIndex(
      (profile) => profile.id.toString() === id.toString()
    );
    const tempItem = tempArray[selectedItemIndex];
    if (selectedItemIndex !== -1 && selectedItemIndex !== 0) {
      tempArray[selectedItemIndex] = tempArray[selectedItemIndex - 1];
      tempArray[selectedItemIndex - 1] = tempItem;
      console.log(tempArray, "updated array");
      setSelectedProfileIndex(selectedItemIndex - 1);
      dispatch(setProfileArray(tempArray));
    }
  };

  const handleActive = (id) => {
    console.log("id that is clicked, ", id);
    const tempArray = [...profileArray];
    const testItem = tempArray.find(
      (profile) => profile.id.toString() === id.toString()
    );
    console.log(testItem, "test item");
    setSelectedProfile(
      tempArray.find((profile) => profile.id.toString() === id.toString())
    );
    setSelectedProfileIndex(
      tempArray.findIndex((profile) => profile.id.toString() === id.toString())
    );
    dispatch(setActiveProfile(id));
    console.log("this is run");
    setSelectedProfileName(testItem.name);
    console.log(selectedProfileName, "selected profile name");
  };

  const handleAdd = () => {
    const id = Math.floor(Math.random() * 1000);
    // local copy first
    const newProfile = {
      name: "New profile",
      id,
      className: "custom",
      isActive: true,
      isEditable: true,
    };
    const tempArray = [...profileArray, newProfile];
    console.log("new id, ", id);
    dispatch(setProfileArray(tempArray));
    setSelectedProfile(newProfile);
    setSelectedProfileIndex(tempArray.length - 1);
  };

  const handleDelete = (id) => {
    console.log(id, " delete id");
    setDeleteProfileId(id);
    setDeleteProfileIndex(
      profileArray.findIndex((profile) => profile.id === id)
    );
    setShowDeleteConfirm(true);
    console.log(showDeleteConfirm, "show delete confirm");
  };

  const handleConfirmDelete = () => {
    console.log(deleteProfileIndex, "delete profile index");
    console.log(deleteProfileId, "delete profile id");
    const previousId = profileArray[deleteProfileIndex - 1].id;

    dispatch(deleteProfile(deleteProfileId));
    setShowDeleteConfirm(false);
    handleActive(previousId);
  };

  const handleDoneEdit = (id, updatedName) => {
    setIsEditing(false);
    const updatedProfile = {
      ...profileArray.find((profile) => profile.id === id),
      name: updatedName,
    };
    dispatch(editProfile(updatedProfile));
    setEditInput("");
  };

  const handleEditClick = (id) => {
    setIsEditing(true);
    console.log(id, "edit id");
  };

  const handleProfileNameChange = (e) => {
    setSelectedProfileName(e.target.value);
    setEditInput(e.target.value);
  };
  // const handleEditClick = (profileId) => {};

  // const isSelectedLast = () => {};

  // const handleProfileNameChange = (e) => {};

  // const handleSaveChanges = (profileId) => {};

  return (
    <>
      <div className="thx-drawer flex">
        <div className="main-title">Profile List</div>
        <div id="profileWrapper" className="drawer-select flex">
          <div id="profileList" className="scrollable">
            {profileArray.map((profile) => (
              <>
                <div
                  id={profile.id}
                  className={`profile-item ${profile.className} ${
                    profile.isActive ? "active" : ""
                  }`}
                  key={profile.id}
                  onClick={() => handleActive(profile.id)}
                >
                  {profile.name}
                </div>
              </>
            ))}

            <input
              id="profileRename"
              className={`profile-item ${isEditing ? "show" : ""}`}
              placeholder="Enter Profile Name"
              value={selectedProfileName}
              maxLength="25"
              onChange={handleProfileNameChange}
              onBlur={() => handleDoneEdit(selectedProfile.id, editInput)}
            />
          </div>

          <div className="toolbar flex">
            <div className="icon add" id="profileAdd" onClick={handleAdd}></div>
            <div
              className={`icon edit ${
                selectedProfile.isEditable ? "show" : ""
              } `}
              id="profileEdit"
              onClick={() => handleEditClick(selectedProfile.id)}
            ></div>
            <div
              className={`icon delete ${
                selectedProfile.isEditable ? "show" : ""
              } `}
              id="deleteIcon"
              onClick={() => handleDelete(selectedProfile.id)}
            />

            <div
              className={`icon down ${isLast ? "disabled" : ""}`}
              id="profileDown"
              onClick={() => handleDown(selectedProfile.id)}
            ></div>
            <div
              className={`icon up ${isFirst ? "disabled" : ""} `}
              id="profileUp"
              onClick={() => handleUp(selectedProfile.id)}
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
              {selectedProfile.name}
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
      <MainScreen name={selectedProfile.name} />
    </>
  );
};

export default Sidebar;
