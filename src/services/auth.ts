import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { User } from '@/types';

export async function registerUser(
  email: string,
  password: string,
  name: string,
  nickname: string
): Promise<FirebaseUser> {
  // Проверка уникальности nickname
  const nicknameQuery = query(collection(db, 'users'), where('nickname', '==', nickname));
  const nicknameSnapshot = await getDocs(nicknameQuery);
  if (!nicknameSnapshot.empty) {
    throw new Error('Nickname уже занят');
  }

  // Создание пользователя в Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Создание документа пользователя в Firestore
  const userData: Omit<User, 'id'> = {
    email,
    name,
    nickname,
    createdAt: new Date(),
  };

  await setDoc(doc(db, 'users', user.uid), userData);

  return user;
}

export async function loginByNickname(nickname: string, password: string): Promise<FirebaseUser> {
  // Поиск пользователя по nickname
  const nicknameQuery = query(collection(db, 'users'), where('nickname', '==', nickname));
  const nicknameSnapshot = await getDocs(nicknameQuery);

  if (nicknameSnapshot.empty) {
    throw new Error('Пользователь не найден');
  }

  const userDoc = nicknameSnapshot.docs[0];
  const userData = userDoc.data() as User;
  const email = userData.email;

  // Вход через email и пароль
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function getCurrentUser(): Promise<User | null> {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;

  const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
  if (!userDoc.exists()) return null;

  return { id: userDoc.id, ...userDoc.data() } as User;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export async function sendVerificationCode(email: string): Promise<string> {
  // Генерация 6-значного кода
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Сохранение кода в localStorage (в реальном приложении это должно быть на сервере)
  // Для production нужно использовать Cloud Functions для отправки email
  localStorage.setItem(`verification_code_${email}`, JSON.stringify({
    code,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 минут
  }));

  // В реальном приложении здесь должен быть вызов Cloud Function для отправки email
  console.log(`Verification code for ${email}: ${code}`);

  return code;
}

export async function verifyCode(email: string, code: string): Promise<boolean> {
  const stored = localStorage.getItem(`verification_code_${email}`);
  if (!stored) return false;

  const { code: storedCode, expiresAt } = JSON.parse(stored);
  if (Date.now() > expiresAt) {
    localStorage.removeItem(`verification_code_${email}`);
    return false;
  }

  return storedCode === code;
}

