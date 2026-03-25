export const playSound = (type: 'click' | 'hover' | 'pop') => {
  const sounds = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    pop: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'
  };
  
  const audio = new Audio(sounds[type]);
  audio.volume = 0.2;
  audio.play().catch(() => {
    // Ignore errors if user hasn't interacted yet
  });
};
