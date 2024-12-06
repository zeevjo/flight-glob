export const gptSwitch = {
  isWriting: false,
  getIsWriting: function () {
    return this.isWriting;
  },
  setIsWriting: function (writing) {
    return (this.isWriting = writing);
  },
};