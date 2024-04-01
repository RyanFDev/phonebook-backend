// A troll way of generating unique IDs using emojis, sorry I thought it was funny. 😅
function generateEmojid(length = 6) {
  const emojis = [
    '😀',
    '😎',
    '🤩',
    '😊',
    '🥳',
    '😄',
    '😃',
    '😆',
    '😉',
    '😍',
    '🤗',
    '😇',
    '🙂',
    '🙃',
    '😋',
    '😜',
    '😝',
    '🤪',
    '🤓',
    '😛',
    '🤔',
    '🤨',
    '😐',
    '😑',
    '😶',
    '😏',
    '😒',
    '🙄',
    '😬',
    '🤥',
    '😌',
    '😔',
    '😪',
    '🤤',
    '😴',
    '😷',
    '🤒',
    '🤕',
    '🤢',
    '🤮',
    '🤧',
    '🥵',
    '🥶',
    '🥴',
    '😵',
    '🤯',
    '🤠',
    '🥳',
    '😎',
    '🤩',
  ];
  let emojid = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    emojid += emojis[randomIndex];
  }

  return emojid;
}

module.exports = generateEmojid;
