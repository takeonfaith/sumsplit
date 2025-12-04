import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Event, EventParticipant } from '../types';

export async function createEvent(
  name: string,
  description: string,
  currency: string,
  ownerId: string,
  participantIds: string[]
): Promise<string> {
  const eventData: Omit<Event, 'id'> = {
    name,
    description,
    currency,
    ownerId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const eventRef = await addDoc(collection(db, 'events'), {
    ...eventData,
    createdAt: Timestamp.fromDate(eventData.createdAt),
    updatedAt: Timestamp.fromDate(eventData.updatedAt),
  });

  // Создание участников события
  for (const participantId of participantIds) {
    await addEventParticipant(eventRef.id, participantId);
  }

  return eventRef.id;
}

export async function getEvent(eventId: string): Promise<Event | null> {
  const eventDoc = await getDoc(doc(db, 'events', eventId));
  if (!eventDoc.exists()) return null;

  const data = eventDoc.data();
  return {
    id: eventDoc.id,
    ...data,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  } as Event;
}

export async function getUserEvents(userId: string): Promise<Event[]> {
  // Получаем события, где пользователь владелец
  const ownerQuery = query(collection(db, 'events'), where('ownerId', '==', userId));
  const ownerSnapshot = await getDocs(ownerQuery);

  // Получаем события, где пользователь участник
  const participantQuery = query(
    collection(db, 'eventParticipants'),
    where('userId', '==', userId),
    where('type', '==', 'user')
  );
  const participantSnapshot = await getDocs(participantQuery);

  const eventIds = new Set<string>();
  ownerSnapshot.docs.forEach((doc) => eventIds.add(doc.id));
  participantSnapshot.docs.forEach((doc) => eventIds.add(doc.data().eventId));

  const events: Event[] = [];
  for (const eventId of eventIds) {
    const event = await getEvent(eventId);
    if (event) events.push(event);
  }

  return events;
}

export async function updateEvent(
  eventId: string,
  updates: Partial<Pick<Event, 'name' | 'description' | 'currency'>>
): Promise<void> {
  await updateDoc(doc(db, 'events', eventId), {
    ...updates,
    updatedAt: Timestamp.fromDate(new Date()),
  });
}

export async function deleteEvent(eventId: string): Promise<void> {
  // Удаление всех участников
  const participantsQuery = query(
    collection(db, 'eventParticipants'),
    where('eventId', '==', eventId)
  );
  const participantsSnapshot = await getDocs(participantsQuery);
  for (const participantDoc of participantsSnapshot.docs) {
    await deleteDoc(participantDoc.ref);
  }

  // Удаление всех трат
  const expensesQuery = query(
    collection(db, 'expenses'),
    where('eventId', '==', eventId)
  );
  const expensesSnapshot = await getDocs(expensesQuery);
  for (const expenseDoc of expensesSnapshot.docs) {
    await deleteDoc(expenseDoc.ref);
  }

  // Удаление события
  await deleteDoc(doc(db, 'events', eventId));
}

export async function addEventParticipant(
  eventId: string,
  participantId: string,
  type: 'user' | 'local' = 'local',
  name?: string,
  nickname?: string
): Promise<string> {
  const participantData: Omit<EventParticipant, 'id'> = {
    eventId,
    type,
    ...(type === 'user' ? { userId: participantId } : { localId: participantId }),
    name: name || '',
    nickname: nickname || '',
  };

  const participantRef = await addDoc(collection(db, 'eventParticipants'), participantData);
  return participantRef.id;
}

export async function getEventParticipants(eventId: string): Promise<EventParticipant[]> {
  const participantsQuery = query(
    collection(db, 'eventParticipants'),
    where('eventId', '==', eventId)
  );
  const snapshot = await getDocs(participantsQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as EventParticipant[];
}

export async function removeEventParticipant(participantId: string): Promise<void> {
  await deleteDoc(doc(db, 'eventParticipants', participantId));
}

