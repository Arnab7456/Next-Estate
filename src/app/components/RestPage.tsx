"use client";

import { useState,useEffect } from "react";
import { app } from "../../Firebase";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FormData } from "@/types/From.types";
import { InputField } from "@/types/type";

export default function RestPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUploadError, setImageUploadError] = useState<string | boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false); // Track drawer state
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  console.log(formData);

  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  useEffect(() => {
    if (pendingNavigation && !drawerOpen) {
      router.push(pendingNavigation);
      setPendingNavigation(null);
    }
  }, [drawerOpen, pendingNavigation, router]);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = files.map((file) => storeImage(file));

      Promise.all(promises)
        .then((urls) => {
          setFormData((prev) => ({
            ...prev,
            imageUrls: prev.imageUrls.concat(urls),
          }));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError("Image upload failed (2 MB max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target instanceof HTMLInputElement) {
      const { id, value, type, checked } = e.target;

      if (id === "sale" || id === "rent") {
        setFormData((prev) => ({
          ...prev,
          type: id as "rent" | "sale",
        }));
      } else if (["parking", "furnished", "offer"].includes(id)) {
        setFormData((prev) => ({
          ...prev,
          [id]: checked,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [id]: type === "number" ? Number(value) : value,
        }));
      }
    } else {
      const { id, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (formData.regularPrice < formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      
      setLoading(true);
      setError(false);
  
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userMongoId: user?.publicMetadata.userMongoId,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setLoading(false);
        return setError(data.message || "Something went wrong");
      }
  
      // Close the drawer after successful listing creation
      setDrawerOpen(false);
  
      setLoading(false);
      router.push(`/listing/${data._id}`);
    } catch (error) {
      setError(error + " Something went wrong");
      setLoading(false);
    }
  };
  

  if (!isLoaded) {
    return (
      <h1 className="text-center text-xl my-7 font-semibold">Loading...</h1>
    );
  }

  if (!isSignedIn) {
    return (
      <h1 className="text-center text-xl my-7 font-semibold">
        You are not authorized to view this page
      </h1>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger>
        <button
          className="px-6 py-2 bg-slate-700 dark:bg-blue-500 text-white rounded-md"
          onClick={() => setDrawerOpen(true)} // Open drawer
        >
          Dashboard
        </button>
      </DrawerTrigger>
      <DrawerContent
        className={`bg-transparent ${drawerOpen ? "backdrop-blur-sm" : ""}`} // Apply blur effect when drawer is open
      >
        <DrawerHeader>
          <DrawerTitle className="text-center text-blue-700 text-2xl">Create a Listing</DrawerTitle>
          <DrawerDescription className=" text-center text-white dark:text-white">
            Fill out the form below to create a listing for your property.
          </DrawerDescription>
          <DrawerClose onClick={() => setDrawerOpen(false)} />
        </DrawerHeader>
        <main className="p-3 max-w-4xl mx-auto">
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 flex-1">
              <input
                type="text"
                placeholder="Name"
                className="border p-3 rounded-lg bg-inherit"
                id="name"
                maxLength={62}
                minLength={10}
                required
                onChange={handleChange}
                value={formData.name}
              />
              <textarea
                placeholder="Description"
                className="border p-3 rounded-lg bg-inherit"
                id="description"
                required
                onChange={handleChange}
                value={formData.description}
              />
              <input
                type="text"
                placeholder="Address"
                className="border p-3 rounded-lg bg-inherit"
                id="address"
                required
                onChange={handleChange}
                value={formData.address}
              />
              <div className="flex gap-6 flex-wrap text-white">
                {["sale", "rent", "parking", "furnished", "offer"].map((option) => (
                  <div className="flex gap-2" key={option}>
                    <input
                      type="checkbox"
                      id={option}
                      className="w-5"
                      onChange={handleChange}
                      checked={formData[option as keyof FormData] as boolean}
                    />
                    <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-6">
                {[
                  { id: "bedrooms", label: "Beds", min: 1, max: 10 },
                  { id: "bathrooms", label: "Baths", min: 1, max: 10 },
                  {
                    id: "regularPrice",
                    label: "Regular price (rupees /month)",
                    min: 50,
                    max: 10000000,
                  },
                  formData.offer && {
                    id: "discountPrice",
                    label: "Discounted price (rupees /month)",
                    min: 0,
                    max: 10000000,
                  },
                ]
                  .filter((field): field is InputField => Boolean(field))
                  .map(({ id, label, min, max }) => (
                    <div className="flex items-center gap-2 py-2 " key={id}>
                      <input
                        type="number"
                        id={id}
                        min={min}
                        max={max}
                        required
                        className="p-3 border border-gray-300 rounded-lg bg-inherit text-white"
                        onChange={handleChange}
                        value={formData[id as keyof FormData] as number}
                      />
                      <label htmlFor={id} className="text-sm font-medium text-white ">
                        {label}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <p className="font-semibold text-teal-500">
                Images:
                <span className="font-normal text-white ml-2">
                  The first image will be the cover (max 6)
                </span>
              </p>
              <div className="flex gap-4">
                <input
                  className="p-3 border border-gray-300 rounded w-full bg-inherit"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                />
                <button
                  disabled={uploading}

                  onClick={handleImageSubmit}
                  className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
              {formData.imageUrls.map((url, index) => (
                <div key={url} className="flex justify-between p-3 border items-center">
                  <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                className="p-3 bg-blue-500/75 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                disabled={loading || uploading}
              >
                {loading ? "Creating..." : "Create Listing"}
              </button>
              {error && <p className="text-red-700 text-sm">{error}</p>}
            </div>
          </form>
        </main>
      </DrawerContent>
    </Drawer>
  );
}
