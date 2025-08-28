import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../../components/ui/input";
import {
  UserPen,
  User,
  MapPin,
  Briefcase,
  Globe,
  Twitter,
  Linkedin,
  Github,
  AtSign,
} from "lucide-react";
import { getAuth } from "firebase/auth";
import { storage, db } from "../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  query,
  where,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";

const ProfilePage = () => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_960_720.png"
  );
  const [tempProfileImage, setTempProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    role: "",
    location: "",
    occupation: "",
  });

  const auth = getAuth();
  const user = auth.currentUser;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a local preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = profileImage;

    // Upload image if a temporary image exists
    if (tempProfileImage && user) {
      const uid = user.uid;
      const storageRef = ref(storage, `images/${uid}/profile.jpg`);

      // Convert base64/blob to file
      const response = await fetch(tempProfileImage);
      const blob = await response.blob();

      try {
        const snapshot = await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(snapshot.ref);
        setProfileImage(imageUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    const formData = {
      name: e.target.name.value,
      role: e.target.role.value,
      location: e.target.location.value,
      occupation: e.target.occupation.value,
      profileImage: imageUrl,
    };

    const userId = user.uid;
    try {
      const userDocRef = collection(db, "users");
      const q = query(userDocRef, where("uid", "==", userId));

      const querySnapshot = await getDocs(q);
      const firestoreUserId = querySnapshot.docs[0].id;
      const docRef = doc(db, "users", firestoreUserId);
      await updateDoc(docRef, formData);

      setEditingProfile(false);
      setTempProfileImage(null);
      getUserData();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const getUserData = async () => {
    const userId = user.uid;

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", userId));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        setUserData(data);
        if (data.profileImage) {
          setProfileImage(data.profileImage);
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6">
          {/* Profile Image */}
          <div className="relative w-32 rounded-full overflow-hidden mb-4 sm:mb-0">
            <img
              src={userData.profileImage || profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
              width={32}
              height={32}
            />
          </div>

          {/* User Information */}

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {userData.name || "User Name"}
            </h2>
            <p className="text-gray-600">{userData.role || "Role"}</p>
            <div className="mt-2 flex flex-wrap justify-center sm:justify-start space-x-4">
              <div className="flex items-center space-x-2 text-gray-500">
                <MapPin className="h-5 w-5" />
                <span>{userData.location || "Location"}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Briefcase className="h-5 w-5" />
                <span>{userData.occupation || "Occupation"}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <AtSign className="h-5 w-5" />
                <span>{user.email || "Email"}</span>
              </div>
            </div>
          </div>
          {/* ))}  */}
        </div>

        <AnimatePresence>
          {editingProfile && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Edit Profile
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden relative">
                    <img
                      src={
                        tempProfileImage ||
                        userData.profileImage ||
                        profileImage
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      id="image"
                      name="image"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      placeholder="Image"
                    />
                  </div>
                  {["name", "role", "location", "occupation"].map((field) => (
                    <div className="mb-4" key={field}>
                      <label
                        htmlFor={field}
                        className="block text-gray-700 font-medium mb-2"
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <Input
                        type="text"
                        id={field}
                        name={field}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        defaultValue={userData[field] || ""}
                      />
                    </div>
                  ))}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors duration-300"
                      onClick={() => setEditingProfile(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Links */}
        <div className="relative mt-6 flex justify-center space-x-4">
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="text-green-500 hover:text-green-700 transition-colors"
          >
            <Globe className="h-6 w-6" />
          </a>
          <button
            className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors"
            onClick={() => setEditingProfile(true)}
          >
            <UserPen className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white shadow-lg rounded-lg mt-8 p-6 w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activities
        </h3>
        <ul className="space-y-4">
          {[
            {
              icon: <User className="h-6 w-6 text-green-500" />,
              text: "Delivered eco-friendly packages in downtown San Francisco.",
              time: "2 hours ago",
            },
            {
              icon: <Briefcase className="h-6 w-6 text-blue-500" />,
              text: "Attended Green Startups Conference in Los Angeles.",
              time: "2 days ago",
            },
            {
              icon: <Globe className="h-6 w-6 text-yellow-500" />,
              text: "Signed a partnership deal with Sunrise Solar for sustainable energy solutions.",
              time: "1 week ago",
            },
          ].map((activity, index) => (
            <li className="flex items-start space-x-4" key={index}>
              <div className="mt-1">{activity.icon}</div>
              <div>
                <p className="text-gray-700">{activity.text}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
