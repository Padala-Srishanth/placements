// Test Firebase connection
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';

export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Try to read from placements collection
    const placementsRef = collection(db, 'placements');
    const snapshot = await getDocs(placementsRef);
    
    console.log('✅ Firebase connection successful!');
    console.log(`Found ${snapshot.size} placements in database`);
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
};

// Run test immediately when imported
testFirebaseConnection();
