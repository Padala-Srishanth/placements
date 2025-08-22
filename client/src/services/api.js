import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';

// Helper function to apply filters to Firestore query
const applyFilters = (baseQuery, filters) => {
  let filteredQuery = baseQuery;

  if (filters.company) {
    filteredQuery = query(filteredQuery, where('companyName', '>=', filters.company), where('companyName', '<=', filters.company + '\uf8ff'));
  }
  if (filters.role) {
    filteredQuery = query(filteredQuery, where('role', '>=', filters.role), where('role', '<=', filters.role + '\uf8ff'));
  }
  if (filters.location) {
    filteredQuery = query(filteredQuery, where('location', '>=', filters.location), where('location', '<=', filters.location + '\uf8ff'));
  }
  if (filters.batchYear) {
    filteredQuery = query(filteredQuery, where('batchYear', '==', parseInt(filters.batchYear)));
  }
  if (filters.difficulty) {
    filteredQuery = query(filteredQuery, where('difficulty', '==', filters.difficulty));
  }

  return filteredQuery;
};

// API functions for placements
export const placementsAPI = {
  getAll: async (filters = {}) => {
    try {
      let placementsQuery = query(collection(db, 'placements'), orderBy('createdAt', 'desc'));
      placementsQuery = applyFilters(placementsQuery, filters);

      const querySnapshot = await getDocs(placementsQuery);
      const placements = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return { data: placements };
    } catch (error) {
      console.error('Error fetching placements:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const docRef = doc(db, 'placements', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { data: { id: docSnap.id, ...docSnap.data() } };
      } else {
        throw new Error('Placement not found');
      }
    } catch (error) {
      console.error('Error fetching placement:', error);
      throw error;
    }
  },

  getFilterOptions: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'placements'));
      const companies = new Set();
      const roles = new Set();
      const locations = new Set();
      const batchYears = new Set();
      const difficulties = new Set();

      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.companyName) companies.add(data.companyName);
        if (data.role) roles.add(data.role);
        if (data.location) locations.add(data.location);
        if (data.batchYear) batchYears.add(data.batchYear);
        if (data.difficulty) difficulties.add(data.difficulty);
      });

      return {
        data: {
          companies: Array.from(companies).sort(),
          roles: Array.from(roles).sort(),
          locations: Array.from(locations).sort(),
          batchYears: Array.from(batchYears).sort((a, b) => b - a),
          difficulties: Array.from(difficulties).sort()
        }
      };
    } catch (error) {
      console.error('Error fetching filter options:', error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const docRef = await addDoc(collection(db, 'placements'), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { data: { id: docRef.id, ...data } };
    } catch (error) {
      console.error('Error creating placement:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const docRef = doc(db, 'placements', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      return { data: { id, ...data } };
    } catch (error) {
      console.error('Error updating placement:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await deleteDoc(doc(db, 'placements', id));
      return { data: { id } };
    } catch (error) {
      console.error('Error deleting placement:', error);
      throw error;
    }
  },
};

// API functions for higher education
export const higherEducationAPI = {
  getAll: async (filters = {}) => {
    try {
      let higherEducationQuery = query(collection(db, 'higherEducation'), orderBy('createdAt', 'desc'));
      higherEducationQuery = applyFilters(higherEducationQuery, filters);

      const querySnapshot = await getDocs(higherEducationQuery);
      const higherEducation = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return { data: higherEducation };
    } catch (error) {
      console.error('Error fetching higher education:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const docRef = doc(db, 'higherEducation', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { data: { id: docSnap.id, ...docSnap.data() } };
      } else {
        throw new Error('Higher education entry not found');
      }
    } catch (error) {
      console.error('Error fetching higher education:', error);
      throw error;
    }
  },

  getFilterOptions: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'higherEducation'));
      const universities = new Set();
      const programs = new Set();
      const locations = new Set();
      const batchYears = new Set();
      const difficulties = new Set();

      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.universityName) universities.add(data.universityName);
        if (data.program) programs.add(data.program);
        if (data.location) locations.add(data.location);
        if (data.batchYear) batchYears.add(data.batchYear);
        if (data.difficulty) difficulties.add(data.difficulty);
      });

      return {
        data: {
          universities: Array.from(universities).sort(),
          programs: Array.from(programs).sort(),
          locations: Array.from(locations).sort(),
          batchYears: Array.from(batchYears).sort((a, b) => b - a),
          difficulties: Array.from(difficulties).sort()
        }
      };
    } catch (error) {
      console.error('Error fetching filter options:', error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const docRef = await addDoc(collection(db, 'higherEducation'), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { data: { id: docRef.id, ...data } };
    } catch (error) {
      console.error('Error creating higher education:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const docRef = doc(db, 'higherEducation', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      return { data: { id, ...data } };
    } catch (error) {
      console.error('Error updating higher education:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await deleteDoc(doc(db, 'higherEducation', id));
      return { data: { id } };
    } catch (error) {
      console.error('Error deleting higher education:', error);
      throw error;
    }
  },
};

// API functions for admin
export const adminAPI = {
  login: async (credentials) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      return {
        data: {
          user: {
            uid: user.uid,
            email: user.email,
            token: token
          }
        }
      };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
};

// Default export for backward compatibility
const api = {
  placements: placementsAPI,
  higherEducation: higherEducationAPI,
  admin: adminAPI
};

export default api;
