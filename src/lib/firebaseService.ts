import { 
  collection, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp,
  setDoc
} from "firebase/firestore";
import { db } from "./firebase";

export const FirebaseService = {
  // Generic collection operations
  async getAll(collectionName: string) {
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getById(collectionName: string, id: string) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  },

  async add(collectionName: string, data: any) {
    return await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now()
    });
  },

  async update(collectionName: string, id: string, data: any) {
    const docRef = doc(db, collectionName, id);
    return await updateDoc(docRef, data);
  },

  async set(collectionName: string, id: string, data: any) {
    const docRef = doc(db, collectionName, id);
    return await setDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    }, { merge: true });
  },

  async delete(collectionName: string, id: string) {
    const docRef = doc(db, collectionName, id);
    return await deleteDoc(docRef);
  }
};
