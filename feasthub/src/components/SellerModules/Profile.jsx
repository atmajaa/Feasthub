import React, { useState, useEffect } from "react";
import { signOut } from 'firebase/auth';
import { useLocation } from 'react-router-dom';
import { db } from '../../firebaseSeller';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';

const Profile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get('email');

  const businessNameCollectionRef = collection(db, "SellerInfo");
  const [sellerData, setSellerData] = useState({
    fname: "",
    lname: "",
    businessName: "",
    gstNo: "",
    phone: "",
    address: "",
    price: "",
  });

  // Fetch seller data if it exists
  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const sellerRef = doc(db, "SellerInfo", userEmail);
        const sellerSnapshot = await getDoc(sellerRef);
        if (sellerSnapshot.exists()) {
          const sellerData = sellerSnapshot.data();
          console.log("Seller data:", sellerData);
          setSellerData(sellerData);
        }
      } catch (error) {
        console.error('Error fetching seller info:', error);
      }
    };

    if (userEmail) {
      fetchSellerInfo();
    }
  }, [userEmail]);

  const createSeller = async () => {
    try {
      await setDoc(doc(db, "SellerInfo", userEmail), {
        fname: sellerData.fname,
        lname: sellerData.lname,
        businessName: sellerData.businessName,
        gstNo: sellerData.gstNo,
        phone: sellerData.phone,
        address: sellerData.address,
        price: sellerData.price,
      });
      alert("Seller information updated successfully!");
    } catch (error) {
      console.error('Error updating seller info:', error);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSellerData({ ...sellerData, [name]: value });
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <div className="h-auto flex flex-col justify-center items-center bg-slate-200 rounded-2xl px-6 py-6">
          <div className="flex">
            <label className="form-control w-full max-w-xs mx-3">
              <div className="label">
                <span className="label-text">First Name</span>
                <span className="label-text-al text-red-600 text-xl font-bold">*</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                name="fname"
                value={sellerData.fname}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-control w-full max-w-xs mx-3">
              <div className="label">
                <span className="label-text">Last Name</span>
                <span className="label-text-al text-red-600 text-xl font-bold">*</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                name="lname"
                value={sellerData.lname}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="w-full px-3">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email Address</span>
                <span className="label-text-al text-red-600 text-xl font-bold">*</span>
              </div>
              <input
                type="email"
                value={userEmail}
                className="input input-bordered w-full"
                readOnly
              />
            </label>
          </div>
          <div className="w-full px-3">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Business Name</span>
                <span className="label-text-al text-red-600 text-xl font-bold">*</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                name="businessName"
                value={sellerData.businessName}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">GST No.</span>
                <span className="label-text-al text-red-600 text-xl font-bold">*</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                name="gstNo"
                value={sellerData.gstNo}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Phone No.</span>
                <span className="label-text-al text-red-600 text-xl font-bold">*</span>
              </div>
              <input
                type="number"
                placeholder=""
                className="input input-bordered w-full"
                name="phone"
                value={sellerData.phone}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Address</span>
                <span className="label-text-al text-red-600 text-xl font-bold">*</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                name="address"
                value={sellerData.address}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Set Price per day</span>
              <input
                type="text"
                placeholder="Set price per day"
                className="input input-bordered w-full"
                name="price"
                value={sellerData.price}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={createSeller} className="w-full bg-red-600 py-3 rounded-xl text-white font-bold mt-6">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
