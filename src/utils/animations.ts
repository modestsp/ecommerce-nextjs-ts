export const fromRightToLeft = {
  hidden: {
    opacity: 0,
    x: '200px',
    transition: {
      duration: 1,
      type: 'ease',
    },
  },
  visible: {
    x: '0px',
    opacity: 1,
    transition: {
      duration: 0.4,
      type: 'ease',
    },
  },
  exit: {
    x: '200px',
    opacity: 0,
    transition: {
      duration: 0.4,
      type: 'ease',
    },
  },
};

export const dropIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};
