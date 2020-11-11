const imgSlugForCard = ({ rank, color }) => {
  if (rank === 'hidden') return 'back';

  const rankToPath = {
    A: '1',
    J: 'jack',
    Q: 'queen',
    K: 'king',
  };

  return `${color}_${rankToPath[rank] || rank}`;
};

const staticUrl = (path) => `/re-poker/${path}`;

export { imgSlugForCard, staticUrl };
