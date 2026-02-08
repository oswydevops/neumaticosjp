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

// PASO 2: INICIALIZAR FIREBASE
// INICIO CAMBIO: Inicialización de Firebase con manejo de errores
let db: any = null;
let storage: any = null;
let isFirebaseInitialized = false;

try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
  isFirebaseInitialized = true;
  console.info("✅ Firebase inicializado correctamente");
} catch (e) {
  console.warn("⚠️ Error inicializando Firebase:", e);
  isFirebaseInitialized = false;
}

const TIRES_COLLECTION = "tires";
const LOCAL_STORAGE_KEY = "neumaticos_jp_db";

// PASO 3: ADAPTADOR DE LECTURA (SUSCRIPCIÓN)
// INICIO CAMBIO: Sincronización con Firebase y localStorage como fallback
export const subscribeToTires = (callback: (tires: Tire[]) => void) => {
  if (!isFirebaseInitialized || !db) {
    console.warn("🔄 Firebase no disponible, usando localStorage local");
    
    // Función para emitir datos actuales
    const emit = () => {
      try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        const tires = data ? JSON.parse(data) : [];
        callback(tires.sort((a: any, b: any) => a.brand.localeCompare(b.brand)));
      } catch (e) {
        console.error("Error leyendo localStorage:", e);
        callback([]);
      }
    };

    // Emitir datos iniciales
    emit();

    // Escuchar cambios en localStorage desde otras pestañas
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_KEY) {
        console.log("📤 Cambios detectados en otra pestaña");
        emit();
      }
    };

    // Verificar cambios periódicamente (fallback para cambios locales)
    const interval = setInterval(emit, 500);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }

  // ✅ Usar Firebase en tiempo real
  console.info("🔥 Conectado a Firebase Firestore en tiempo real");
  const q = query(collection(db, TIRES_COLLECTION), orderBy("brand", "asc"));
  
  return onSnapshot(q, (snapshot) => {
    const tires = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Tire[];
    console.log("📦 Datos sincronizados desde Firebase:", tires.length, "neumáticos");
    callback(tires);
  }, (error) => {
    console.error("🚨 Error en Firestore:", error);
    if (error.code === 'permission-denied') {
      console.error("❌ Permisos denegados en Firebase. Verifica las reglas de seguridad en Firestore.");
    }
  });
};

// PASO 4: OPERACIONES CRUD (CREAR, EDITAR, BORRAR)
// INICIO CAMBIO: Funciones que usan Firebase si está disponible
export const saveTire = async (tireData: Omit<Tire, 'id'>) => {
  if (!isFirebaseInitialized || !db) {
    console.warn("⚠️ Guardando en localStorage (Firebase no disponible)");
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    const tires = data ? JSON.parse(data) : [];
    const newTire = { ...tireData, id: Date.now().toString() };
    tires.push(newTire);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tires));
    return { id: newTire.id };
  }
  console.log("💾 Guardando en Firebase...");
  return await addDoc(collection(db, TIRES_COLLECTION), tireData);
};

export const updateTireData = async (id: string, tireData: Partial<Tire>) => {
  if (!isFirebaseInitialized || !db) {
    console.warn("⚠️ Actualizando en localStorage (Firebase no disponible)");
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let tires = data ? JSON.parse(data) : [];
    tires = tires.map((t: Tire) => t.id === id ? { ...t, ...tireData } : t);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tires));
    return;
  }
  console.log("✏️ Actualizando en Firebase...");
  const tireRef = doc(db, TIRES_COLLECTION, id);
  return await updateDoc(tireRef, tireData);
};

export const deleteTireFromDb = async (id: string, imageUrl: string) => {
  if (!isFirebaseInitialized || !db) {
    console.warn("⚠️ Eliminando en localStorage (Firebase no disponible)");
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let tires = data ? JSON.parse(data) : [];
    tires = tires.filter((t: Tire) => t.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tires));
    return;
  }
  
  console.log("🗑️ Eliminando de Firebase...");
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

// PASO 5: GESTIÓN DE ARCHIVOS (IMÁGENES)
export const uploadTireImage = async (file: File): Promise<string> => {
  if (!isFirebaseInitialized || !storage) {
    console.warn("⚠️ Guardando imagen como Base64 (Firebase Storage no disponible)");
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  console.log("📸 Subiendo imagen a Firebase Storage...");
  const fileName = `${Date.now()}_${file.name}`;
  const storageRef = ref(storage, `tires/${fileName}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};
