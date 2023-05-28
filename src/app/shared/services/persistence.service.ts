import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PersistenceService {
   set(key: string, data: unknown): void {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.log('Error saving to local storage ', e)
    }
   } 

   get(key: string): unknown {
        try {
            const localStorageItem = localStorage.getItem(key);
            return localStorageItem ? JSON.parse(localStorageItem) : null;
        } catch (error) {
            console.log('Error getting from local storage', error);
            return null;
        }
   }

   delete(key: string): void {
    try {
        localStorage.removeItem(key);
        return null;
    } catch (error) {
        console.log('Error removing from local storage', error);
        return null;
    }
   }
}