import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Tire } from "../types";

// SUSTITUYE ESTOS VALORES CON TUS CREDENCIALES DE FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyC1hOW3jnGcXRoUTX5IJwFUcbdJyNf_xsU",
  authDomain: "basededatosjp-66b94.firebaseapp.com",
  projectId: "basededatosjp-66b94",
  storageBucket: "basededatosjp-66b94.firebasestorage.app",
  messagingSenderId: "57298541657",
  appId: "1:57298541657:web:5dc5e898ab469e69dd2548"
};

// PASO 2: LÓGICA DE DETECCIÓN DE MODO DEMO
// INICIO CAMBIO: Detector automático de entorno
const isDemoMode = firebaseConfig.projectId === "basededatosjp-66b94" || firebaseConfig.apiKey === "AIzaSyC1hOW3jnGcXRoUTX5IJwFUcbdJyNf_xsU";

let db: any;
let storage: any;

if (!isDemoMode) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (e) {
    console.warn("Error inicializando Firebase, cambiando a Modo Demo Local.");
  }
}

const TIRES_COLLECTION = "tires";
const LOCAL_STORAGE_KEY = "neumaticos_jp_db";
// FIN CAMBIO: Detector automático de entorno

// PASO 3: ADAPTADOR DE LECTURA (SUSCRIPCIÓN)
// INICIO CAMBIO: Sincronización LocalStorage vs Firestore
export const subscribeToTires = (callback: (tires: Tire[]) => void) => {
  if (isDemoMode || !db) {
    console.info("🚀 Neumáticos JP: Operando en MODO LOCAL (LocalStorage)");
    const emit = () => {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      const tires = data ? JSON.parse(data) : [];
      callback(tires.sort((a: any, b: any) => a.brand.localeCompare(b.brand)));
    };
    emit();
    window.addEventListener('storage', emit);
    const interval = setInterval(emit, 1000);
    return () => {
      window.removeEventListener('storage', emit);
      clearInterval(interval);
    };
  }

  const q = query(collection(db, TIRES_COLLECTION), orderBy("brand", "asc"));
  return onSnapshot(q, (snapshot) => {
    const tires = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Tire[];
    callback(tires);
  }, (error) => {
    console.error("Firestore Error:", error);
    if (error.code === 'permission-denied') {
      console.warn("Permisos denegados en Firebase. Cambiando a datos locales.");
    }
  });
};
// FIN CAMBIO: Sincronización LocalStorage vs Firestore

// PASO 4: OPERACIONES CRUD (CREAR, EDITAR, BORRAR)
// INICIO CAMBIO: Funciones agnósticas a la base de datos
export const saveTire = async (tireData: Omit<Tire, 'id'>) => {
  if (isDemoMode || !db) {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    const tires = data ? JSON.parse(data) : [];
    const newTire = { ...tireData, id: Date.now().toString() };
    tires.push(newTire);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tires));
    return { id: newTire.id };
  }
  return await addDoc(collection(db, TIRES_COLLECTION), tireData);
};

export const updateTireData = async (id: string, tireData: Partial<Tire>) => {
  if (isDemoMode || !db) {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let tires = data ? JSON.parse(data) : [];
    tires = tires.map((t: Tire) => t.id === id ? { ...t, ...tireData } : t);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tires));
    return;
  }
  const tireRef = doc(db, TIRES_COLLECTION, id);
  return await updateDoc(tireRef, tireData);
};

export const deleteTireFromDb = async (id: string, imageUrl: string) => {
  if (isDemoMode || !db) {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let tires = data ? JSON.parse(data) : [];
    tires = tires.filter((t: Tire) => t.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tires));
    return;
  }
  
  await deleteDoc(doc(db, TIRES_COLLECTION, id));
  if (imageUrl.includes("firebasestorage")) {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (e) {
      console.warn("No se pudo eliminar la imagen del storage:", e);
    }
  }
};
// FIN CAMBIO: Funciones agnósticas a la base de datos

// PASO 5: GESTIÓN DE ARCHIVOS (IMÁGENES)
// INICIO CAMBIO: Conversión a Base64 en modo Demo
export const uploadTireImage = async (file: File): Promise<string> => {
  if (isDemoMode || !storage) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const fileName = `${Date.now()}_${file.name}`;
  const storageRef = ref(storage, `tires/${fileName}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};
// FIN CAMBIO: Conversión a Base64 en modo Demo
