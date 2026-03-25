let isMutedGlobal = localStorage.getItem('isMuted') === 'true';

export const setMutedGlobal = (muted: boolean) => {
  isMutedGlobal = muted;
};

export const playSound = (type: 'click' | 'hover' | 'pop' | 'success') => {
  if (isMutedGlobal) return;

  const sounds = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    pop: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
    success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'
  };
  
  const audio = new Audio(sounds[type]);
  audio.volume = 0.15; // Slightly lower volume as requested
  audio.play().catch(() => {
    // Ignore errors if user hasn't interacted yet
  });
};
