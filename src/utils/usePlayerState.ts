import { ref } from 'vue';

const data = localStorage.getItem('pepino-data');

const playerName = ref('');

if (data) {
  const { player = '' } = JSON.parse(data);
  playerName.value = player;
}

function setPlayerName(name: string) {
  localStorage.setItem('pepino-data', JSON.stringify({ player: name }));
  playerName.value = name;
}

export default function usePlayerState() {
  return {
    playerName,
    setPlayerName,
  }; 
}