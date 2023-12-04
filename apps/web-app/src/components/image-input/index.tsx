export const ImageInput = ({ onChange, onSubmit }) => {
  //   const onFileUpload = async () => {
  //     const formData = new FormData();
  //     formData.append("profile-image", selectedFile);
  //     const response = await uploadProfileImage.apiCall(formData);
  //     if (response.error) errorToast(response.error.message);
  //     else {
  //       setTimeout(() => successToast("Profile picture successfully changed"), 0);
  //       refreshUser();
  //     }
  //   };

  return (
    // <form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
    <input
      type="file"
      onChange={(e) => onChange(e.target.files[0])}
      accept="image/png, image/jpeg"
    />
    // </form>
  );
};
