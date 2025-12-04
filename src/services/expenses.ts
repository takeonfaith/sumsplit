import type { Expense, ExpenseItem } from '@/types';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from './firebase';

export async function createExpense(
    eventId: string,
    paidBy: string,
    currency: string,
    items: ExpenseItem[]
): Promise<string> {
    const expenseData: Omit<Expense, 'id'> = {
        eventId,
        paidBy,
        currency,
        items,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const expenseRef = await addDoc(collection(db, 'expenses'), {
        ...expenseData,
        items: expenseData.items.map((item) => ({
            ...item,
            id: item.id || doc(collection(db, 'temp')).id,
        })),
        createdAt: Timestamp.fromDate(expenseData.createdAt),
        updatedAt: Timestamp.fromDate(expenseData.updatedAt),
    });

    return expenseRef.id;
}

export async function getExpense(expenseId: string): Promise<Expense | null> {
    const expenseDoc = await getDoc(doc(db, 'expenses', expenseId));
    if (!expenseDoc.exists()) return null;

    const data = expenseDoc.data();
    return {
        id: expenseDoc.id,
        ...data,
        items: data.items.map((item: any) => ({
            ...item,
        })),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
    } as Expense;
}

export async function getEventExpenses(
    eventId: string
): Promise<Expense[]> {
    const expensesQuery = query(
        collection(db, 'expenses'),
        where('eventId', '==', eventId)
    );
    const snapshot = await getDocs(expensesQuery);

    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            items: data.items || [],
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
        } as Expense;
    });
}

export async function updateExpense(
    expenseId: string,
    updates: Partial<Pick<Expense, 'paidBy' | 'currency' | 'items'>>
): Promise<void> {
    await updateDoc(doc(db, 'expenses', expenseId), {
        ...updates,
        updatedAt: Timestamp.fromDate(new Date()),
    });
}

export async function deleteExpense(expenseId: string): Promise<void> {
    await deleteDoc(doc(db, 'expenses', expenseId));
}
