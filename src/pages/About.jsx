import React, { useState } from "react";
import { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { customFetch } from "../helpers/customFetch";

export default function About() {
  const [file, setFile] = useState("");
  const [previewFile, setPreviewFile] = useState("");
  const [isUploaded, setIsUploaded] = useState("");
  const [isDone, setIsDone] = useState(true)
  const fileRef = useRef(null);

  const queryClient = useQueryClient();

  const getPhoto = async () => {
    const res = await customFetch.get("/user/get-photo");
    return res.data;
  };

  const uploadPhoto = async () => {
    const res = await customFetch.post("/user/create-photo", { file });
    return res.data;
  };

  const handleImageChange = (e) => {
    const newFile = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(newFile);
    setPreviewFile(URL.createObjectURL(e.target.files[0]));
    setIsDone(false)
    reader.onload = () => {
      console.log(reader.result);
      setFile(reader.result);
    };
  };

  const { data } = useQuery("aboutPhoto", getPhoto);

  const { mutate: uploadPhotoMutation, isLoading } = useMutation(
    () => uploadPhoto(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("aboutPhoto");
        setIsUploaded("Upload successful");
        setTimeout(() => {
          setIsUploaded("");
        }, 3000);
        setIsDone(true)
      },
      onError: () => {
        setIsUploaded("Upload failed");
        setTimeout(() => {
          setIsUploaded("");
        }, 3000);
      },
    }
  );

  const handleUploadPhoto = (e) => {
    e.preventDefault();
    uploadPhotoMutation();
  };

  console.log(previewFile);

  return (
    <div className="flex flex-col">
      <p>{isUploaded}</p>
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
      {!isDone && (
        <button
          className="bg-slate-700 text-white w-20 rounded-sm m-3 p-1"
          onClick={handleUploadPhoto}
        >
          {isLoading ? "Uploading" : "Upload"}
        </button>
      )}
    </div>
  );
}
