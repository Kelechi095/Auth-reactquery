import React, { useState } from "react";
import { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { customFetch } from "../helpers/customFetch";

export default function About() {
  const [file, setFile] = useState("");
  const [previewFile, setPreviewFile] = useState("");
  const fileRef = useRef(null);

  const queryClient = useQueryClient();

  const getPhoto = async () => {
    const res = await customFetch.get("/user/get-photo");
    return res.data;
  };

  const uploadPhoto = async () => {
    const res = await customFetch.post("/user/create-photo", {file });
    return res.data;
  };

  const handleImageChange = (e) => {
    const newFile = e.target.files[0];
    console.log(e.target.files[0])
    setPreviewFile(URL.createObjectURL(e.target.files[0]));

    const reader = new FileReader();

    reader.readAsDataURL(newFile);
    reader.onload = () => {
      setFile(reader.result.slice(8));
    };
  };

  const { data } = useQuery("aboutPhoto", getPhoto);

  const { mutate: uploadPhotoMutation, isLoading } = useMutation(() => uploadPhoto(), {
    onSuccess: () => {
      queryClient.invalidateQueries("aboutPhoto");
    },
  });

  const handleUploadPhoto = (e) => {
    e.preventDefault();
    uploadPhotoMutation();
    //setFile("");
    //setPreviewFile("")
  };

  console.log(file)

  return (
    <div className="flex flex-col">
      <form>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </form>
      <img
        src={previewFile ? previewFile : data?.title}
        className="h-64 w-64 self-center rounded-full object-cover mt-20 cursor-pointer"
        alt=""
        onClick={() => fileRef.current.click()}
      />
      {file && (
        <button
          className="bg-slate-700 text-white w-20 rounded-sm m-3 p-1"
          onClick={handleUploadPhoto}
        >
          {isLoading ? "Uploading" : 'Upload'}
        </button>
      )}
    </div>
  );
}
