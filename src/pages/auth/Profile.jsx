export default function ProfilePage() {
  return (
    <>
      <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div class="card p-4">
          <div class=" image d-flex flex-column justify-content-center align-items-center">
            {" "}
            <button class="btn btn-secondary">
              <img
                src="data:image/png;base64,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"
                height="100"
                width="100"
              />
            </button>{" "}
            <span class="name mt-3">User Name</span>{" "}
            <span class="idd">email</span>
            <div class="d-flex flex-row justify-content-center align-items-center mt-3">
              {" "}
              <span class="number">
                1069 <span class="follow">Followers</span>
              </span>{" "}
            </div>
            <div class=" d-flex mt-2">
              {" "}
              <button class="btn1 btn-dark">Edit Profile</button>{" "}
            </div>
            <div class="text mt-3">
              <span>
                Eleanor Pena is a creator of minimalistic x bold graphics and
                digital artwork.
                <br />
                <br /> Artist/ Creative Director by Day #NFT minting@ with FND
                night.{" "}
              </span>
            </div>
            <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              {" "}
              <span>
                <i class="fa fa-twitter"></i>
              </span>{" "}
              <span>
                <i class="fa fa-facebook-f"></i>
              </span>{" "}
              <span>
                <i class="fa fa-instagram"></i>
              </span>{" "}
              <span>
                <i class="fa fa-linkedin"></i>
              </span>{" "}
            </div>
            <div class=" px-2 rounded mt-4 date ">
              {" "}
              <span class="join">Joined May,2021</span>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
