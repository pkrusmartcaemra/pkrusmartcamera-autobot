

const cameraId = document.getElementById("cameraId");
const pictureUrl = document.getElementById("pictureUrl");
const userId = document.getElementById("userId");
const displayName = document.getElementById("displayName");

const btnFull = document.getElementById("btnFull");
const btnSend = document.getElementById("btnSend");
const btnShare = document.getElementById("btnShare");

let photo = 'https://linecamera.herokuapp.com/camera/' + cameraId.value +'/photo';

async function getUserProfile() {
    const profile = await liff.getProfile();
    pictureUrl.src = profile.pictureUrl;
    displayName.innerHTML = profile.displayName;
  }
  
  async function sendMsg() {
    if (
      liff.getContext().type !== "none" &&
      liff.getContext().type !== "external"
    ) {
      await liff.sendMessages([
        {
          type: "image",
          originalContentUrl: photo,
          previewImageUrl: photo
        }
      ]);
      alert("Photo sent");
    }
  }
  async function shareMsg() {
    await liff.shareTargetPicker([
      {
        type: "image",
        originalContentUrl: photo,
        previewImageUrl: photo
      }
    ]);
    alert("Photo shared");
  }
  
  btnSend.onclick = () => {
    sendMsg();
  };
  
  btnShare.onclick = () => {
    shareMsg();
  };
  
  btnFull.onclick = () => {
    location.href += '?full=';
  };

  async function main() {
    liff.ready.then(() => {
    });
    await liff.init({ liffId: "1655780526-AG3wEGp7" });
    getUserProfile();
  }
  
  main();