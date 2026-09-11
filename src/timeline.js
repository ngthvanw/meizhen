export const TIMELINE = [
  {
    from: 0,
    to: 3.5,
    scene: "intro",

    left: "idle",
    right: "walk-in",

    leftTalk: "",
    rightTalk: "Ủa... cậu cũng ở đây hả? 👀",

    camera: "slow-zoom",
    effect: "stars",
  },

  {
    from: 3.5,
    to: 7,
    scene: "meet",

    left: "shy",
    right: "wave",

    leftTalk: "Ừm... chào cậu 🫣",
    rightTalk: "Hê lôoo~ ✨",

    camera: "close",
    effect: "fireflies",
  },

  {
    from: 7,
    to: 10,
    scene: "cute",

    left: "look-right",
    right: "poke",

    leftTalk: "Nè...",
    rightTalk: "Chọt một cái 👉",

    camera: "close",
    effect: "sparkle",
  },

  {
    from: 10,
    to: 13,
    scene: "cute",

    left: "angry-cute",
    right: "laugh",

    leftTalk: "Ê!!! 😤",
    rightTalk: "Hihi 🤭",

    camera: "close",
    effect: "laugh",
  },

  {
    from: 13,
    to: 16,
    scene: "cute",

    left: "turn-away",
    right: "sorry",

    leftTalk: "Hông chơi nữa...",
    rightTalk: "Ơ... tui xin lỗi mà 🥺",

    camera: "slow-zoom",
    effect: "tiny-heart",
  },

  {
    from: 16,
    to: 20,
    scene: "cute",

    left: "still-angry",
    right: "head-pat",

    leftTalk: "...",
    rightTalk: "Đừng giận nữa nha 🥹",

    camera: "close",
    effect: "sparkle",
  },

  {
    from: 20,
    to: 23,
    scene: "cute",

    left: "blush",
    right: "smile",

    leftTalk: "Ai cho xoa đầu... 😳",
    rightTalk: "Tại dễ thương quá đó~",

    camera: "close",
    effect: "heart",
  },

  {
    from: 23,
    to: 27,
    scene: "walk",

    left: "walk-right",
    right: "walk-left",

    leftTalk: "Đi đâu vậy?",
    rightTalk: "Đi với tui nè ✨",

    camera: "slow-zoom",
    effect: "fireflies",
  },

  {
    from: 27,
    to: 31,
    scene: "together",

    left: "hold-hand",
    right: "hold-hand",

    leftTalk: "Nắm tay chi vậy... 😳",
    rightTalk: "Sợ cậu đi lạc thôi 😌",

    camera: "close",
    effect: "heart-burst",
  },

  {
    from: 31,
    to: 35,
    scene: "together",

    left: "pull-hand",
    right: "surprised",

    leftTalk: "Nhanh lênnn!",
    rightTalk: "Khoan khoannn 😭",

    camera: "shake-soft",
    effect: "speed-lines",
  },

  {
    from: 35,
    to: 39,
    scene: "quiet",

    left: "sit",
    right: "sit",

    leftTalk: "Mệt chưa?",
    rightTalk: "Một chút 👉👈",

    camera: "wide",
    effect: "fireflies",
  },

  {
    from: 39,
    to: 43,
    scene: "quiet",

    left: "lean",
    right: "freeze",

    leftTalk: "Cho dựa xíu nha...",
    rightTalk: "!!! 😳",

    camera: "close",
    effect: "blush",
  },

  {
    from: 43,
    to: 47,
    scene: "quiet",

    left: "sleep",
    right: "head-pat",

    leftTalk: "zzz...",
    rightTalk: "Ngủ thiệt luôn hả...",

    camera: "slow-zoom",
    effect: "tiny-heart",
  },

  {
    from: 47,
    to: 51,
    scene: "ending",

    left: "wake-up",
    right: "smile",

    leftTalk: "Cậu còn ở đây hả?",
    rightTalk: "Ừ. Tui có đi đâu đâu ❤️",

    camera: "close",
    effect: "heart-burst",
  },

  {
    from: 51,
    to: 9999,
    scene: "sunrise",

    left: "hug",
    right: "hug",

    leftTalk: "Vậy ở đây luôn nha",
    rightTalk: "Ừm ❤️",

    camera: "ending",
    effect: "sunrise",
  },
];

export function getScene(time) {
  return (
    TIMELINE.find(
      (item) => time >= item.from && time < item.to
    ) || TIMELINE[0]
  );
}