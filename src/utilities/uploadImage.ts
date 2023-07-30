import bcrypt from 'bcrypt';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { FirebaseConfig } from '../config';

initializeApp(FirebaseConfig);

const firebaseStorage = getStorage();

export const uploadAvatarImage = async (file: Express.Multer.File): Promise<string> => {
  const hashImage = await bcrypt.hashSync(file.originalname, 0.1);
  const storageRef = ref(firebaseStorage, `avatars/${hashImage}`);
  const metadata = { contentType: file.mimetype };
  const snapShot = await uploadBytesResumable(storageRef, file.buffer, metadata);
  const imageUrl = await getDownloadURL(snapShot.ref);
  return imageUrl;
};

export const uploadThumbnailImage = async (file: Express.Multer.File): Promise<string> => {
  const hashImage = await bcrypt.hashSync(file.originalname, 0.1);
  const storageRef = ref(firebaseStorage, `thumbnails/${hashImage}`);
  const metadata = { contentType: file.mimetype };
  const snapShot = await uploadBytesResumable(storageRef, file.buffer, metadata);
  const imageUrl = await getDownloadURL(snapShot.ref);
  return imageUrl;
};
