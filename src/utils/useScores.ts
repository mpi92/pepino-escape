import { ref } from 'vue';
import { decode, encode } from './encoding';
import { doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/firebase';

const scores: any = ref([]);

async function getScores() {
  const scoresRef = doc(db, 'app', 'scores');
  const socresSnapshot = await getDoc(scoresRef);
  const { list: scoreList } = socresSnapshot.data();

  scores.value = scoreList
    .map(decode)
    .sort((a, b) => b.score - a.score);
}

async function setScore(player: string, data: any) {
  const scoresRef = doc(db, 'app', 'scores');

  await updateDoc(scoresRef, { list: arrayUnion(encode({ player, ...data })) });
}

export default function useScores() {
  return {
    scores,
    getScores,
    setScore,
  };
};