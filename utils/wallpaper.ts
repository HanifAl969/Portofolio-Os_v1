export const macOSGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
];

export const getGradient = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('hanifos-wallpaper');
    if (saved && macOSGradients.includes(saved)) {
      return saved;
    }
  }
  const random = macOSGradients[Math.floor(Math.random() * macOSGradients.length)];
  if (typeof window !== 'undefined') {
    localStorage.setItem('hanifos-wallpaper', random);
  }
  return random;
};

export const cycleGradient = (): string => {
  const current = typeof window !== 'undefined' ? localStorage.getItem('hanifos-wallpaper') : null;
  const currentIndex = current ? macOSGradients.indexOf(current) : -1;
  const nextIndex = (currentIndex + 1) % macOSGradients.length;
  const next = macOSGradients[nextIndex];
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('hanifos-wallpaper', next);
  }
  return next;
};
