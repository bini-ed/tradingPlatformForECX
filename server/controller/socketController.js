function clearTimer(interval) {
  clearInterval(interval);
}

class startInterval {
  constructor(timer, room, io, socket) {
    this.timer = timer;
    const interval = setInterval(() => {
      decrementClock(this.timer, room, interval, io, socket);
    }, 1000);
  }
}

function decrementClock(timer, rooms, io, socket) {
  if (timer === 0) {
    timer = 60;
    clearTimer(interval);
  }
  const time = timer;
  const room = rooms;

  //   socket.to(room).emit("countdown", { countdown: time });
  timer--;
  console.log(timer);
}

module.exports = { startInterval };
