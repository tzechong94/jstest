import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const profileArray = useSelector((state) => state.profileArray);

  const [activeProfile, setActiveProfile] = useState(null);

  useEffect(() => {
    setActiveProfile(document.getElementById("profile1"));
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

  return (
    <>
      <div>
        {" "}
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
            <div className="icon add" id="profileAdd"></div>
            <div className="icon edit" id="profileEdit"></div>
            <div className="icon delete" id="deleteIcon" />

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
          <div id="profileDelCfm" className="profile-del alert flex">
            <div className="title">delete eq</div>
            <div className="body-text t-center" id="delName">
              delete eq
            </div>
            <div className="thx-btn" id="cfmDelete">
              delete
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
