
const pictureUrl = document.getElementById("pictureUrl");
const userId = document.getElementById("userId");
const displayName = document.getElementById("displayName");

async function getUserProfile() {
    const profile = await liff.getProfile();
    pictureUrl.src = profile.pictureUrl;
    displayName.innerHTML = profile.displayName;
}

async function main() {
    liff.ready.then(() => {
    });
    await liff.init({ liffId: "1655780526-AG3wEGp7" });
    getUserProfile();
}
  
main();